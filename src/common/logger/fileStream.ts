import { dirname } from 'path'
import { createWriteStream, stat, rename } from 'fs'

const assert = require('assert')
const mkdirp = require('mkdirp')

import { LogStream } from './logStream'

const defaultOptions = {
  maxBufferLength: 4096, // 日志写入缓存队列最大长度
  flushInterval: 1000, // flush间隔
  logRotator: {
    byHour: true,
    byDay: false,
    hourDelimiter: '_'
  }
}

const onError = err => {
  console.error(
    '%s ERROR %s [chair-logger:buffer_write_stream] %s: %s\n%s',
    new Date().toString(),
    process.pid,
    err.name,
    err.message,
    err.stack
  )
}
const fileExists = async srcPath => {
  return new Promise(resolve => {
    stat(srcPath, (err, stats) => {
      if (!err && stats.isFile()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
const fileRname = async (oldPath, newPath) => {
  return new Promise(resolve => {
    rename(oldPath, newPath, e => {
      resolve(e ? true : false)
    })
  })
}
export class FileStream extends LogStream {
  private opts: any = {}
  private _stream = null
  private _timer = null
  private _bufSize = 0
  private _buf = []
  private lastPlusName = ''
  private _RotateTimer = null
  constructor(opts) {
    super(opts)
    assert(opts.fileName, 'should pass opts.fileName')
    this.opts = Object.assign({}, defaultOptions, opts)
    this._stream = null
    this._timer = null
    this._bufSize = 0
    this._buf = []
    this.lastPlusName = this._getPlusName()
    this.reload()
    this._RotateTimer = this._createRotateInterval()
  }

  log(data) {
    data = this.format(this.jsonParse(data))
    if (data) this._write(data + '\n')
  }

  /**
   * 重新载入日志文件
   */
  private reload() {
    this.close()
    this._stream = this._createStream()
    this._timer = this._createInterval()
  }

  /**
   *
   * @private
   */
  private reloadStream() {
    this._closeStream()
    this._stream = this._createStream()
  }

  /**
   * 关闭stream
   * @private
   */
  private close() {
    this._closeInterval()
    if (this._buf && this._buf.length > 0) {
      this.flush()
    }
    this._closeStream() // 关闭流
  }

  /**
   * 覆盖父类，写入内容
   * @param buf - 日志内容
   * @private
   */
  private _write(buf) {
    this._bufSize += buf.length
    this._buf.push(buf)
    if (this._buf.length > this.opts.maxBufferLength) {
      this.flush()
    }
  }

  /**
   * 创建一个stream
   * @return {Stream} 返回一个 writeSream
   * @private
   */
  private _createStream() {
    mkdirp.sync(dirname(this.opts.fileName))
    const stream = createWriteStream(this.opts.fileName, { flags: 'a' })
    stream.on('error', onError)
    return stream
  }

  /**
   * 关闭stream
   * @private
   */
  private _closeStream() {
    if (this._stream) {
      this._stream.end()
      this._stream.removeListener('error', onError)
      this._stream = null
    }
  }

  /**
   * 将内存中的字符写入文件中
   * @private
   */
  private flush() {
    if (this._buf.length > 0) {
      this._stream.write(this._buf.join(''))
      this._buf = []
      this._bufSize = 0
    }
  }

  /**
   * 创建定时器,一定时间内写入文件
   * @private
   * @return {Interval} 定时器
   */
  private _createInterval() {
    return setInterval(() => {
      this.flush()
    }, this.opts.flushInterval)
  }

  /**
   * 关闭定时器
   * @private
   */
  private _closeInterval() {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  /**
   *分割定时器
   * @private
   */
  private _createRotateInterval() {
    return setInterval(() => {
      this._checkRotate()
    }, 1000)
  }

  /**
   * 检测日志分割
   * @private
   */
  private _checkRotate() {
    const plusName = this._getPlusName()
    if (plusName === this.lastPlusName) {
      return
    }
    this.lastPlusName = plusName
    this.renameOrDelete(this.opts.fileName, this.opts.fileName + plusName)
      .then(() => {
        this.reloadStream()
      })
      .catch(e => {
        console.log(e)
        this.reloadStream()
      })
  }

  private _getPlusName() {
    let plusName
    const date = new Date()
    if (this.opts.logRotator.byHour) {
      plusName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}${
        this.opts.logRotator.hourDelimiter
      }${date.getHours()}`
    } else {
      plusName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    return `.${plusName}`
  }

  /**
   * 重命名文件
   * @param srcPath
   * @param targetPath
   */
  private async renameOrDelete(srcPath, targetPath) {
    if (srcPath == targetPath) {
      return
    }
    const srcExists = await fileExists(srcPath)
    if (!srcExists) {
      return
    }
    const targetExists = await fileExists(targetPath)
    if (targetExists) {
      console.log(`targetFile ${targetPath} exists!!!`)
      return
    }
    await fileRname(srcPath, targetPath)
  }
}
