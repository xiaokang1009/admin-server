import * as Path from 'path'
import * as Log4js from 'log4js'
import * as Util from 'util'
import * as Dayjs from 'dayjs'
import * as StackTrace from 'stacktrace-js'
import Chalk from 'chalk'
import config from '../../config/log4js'

export enum LoggerLevel {
  All = 'All',
  MARK = 'Mark',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF'
}

export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number
  ) {}
}
Log4js.addLayout('Awesome-nest', (log4jsConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '',
      position = ''

    const messageList: string[] = []
    logEvent.data.forEach(val => {
      if (val instanceof ContextTrace) {
        moduleName = val.context
        if (val.lineNumber && val.columnNumber) {
          position = `${val.lineNumber} ${val.columnNumber}`
        }
        return
      }
      if (typeof val !== 'string') {
        val = Util.inspect(val, false, 3, true)
      }
      messageList.push(val)
    })
    const messageOutput = messageList.join('')
    const positionOutput = position ? `[${position}]` : ''
    const typeOutput = `[${log4jsConfig.type}] ${logEvent.pid.toString()} -`
    const dateOutput = `${Dayjs(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`
    const moduleOutput = moduleName ? `[${moduleName}]` : '[LoggerService]'
    let levelOutput = `[${logEvent.level}] ${messageOutput}`

    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput)
        break
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput)
        break
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput)
        break
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput)
        break
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput)
        break
      default:
        levelOutput = Chalk.gray(levelOutput)
        break
    }
    return `${Chalk.green(typeOutput)}${dateOutput} ${Chalk.yellow(
      moduleOutput
    )}${levelOutput}${positionOutput}`
  }
})

Log4js.configure(config)

const logger = Log4js.getLogger()

logger.level = LoggerLevel.TRACE

export class Logger {
  static trance(...args) {
    logger.trace(Logger.getStackTrace(), ...args)
    return Logger
  }

  static info(...args) {
    logger.info(Logger.getStackTrace(), ...args)
    return Logger
  }

  static debug(...args) {
    logger.debug(Logger.getStackTrace(), ...args)
    return Logger
  }

  static log(...args) {
    logger.log(Logger.getStackTrace(), ...args)
    return Logger
  }

  static warn(...args) {
    logger.warn(Logger.getStackTrace(), ...args)
    return Logger
  }

  static warning(...args) {
    logger.warn(Logger.getStackTrace(), ...args)
    return Logger
  }

  static error(...args) {
    logger.error(Logger.getStackTrace(), ...args)
    return Logger
  }

  static fatal(...args) {
    logger.fatal(Logger.getStackTrace(), ...args)
    return Logger
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http')
    loggerCustom.info(Logger.getStackTrace(), ...args)
    return Logger
  }

  static getStackTrace(deep = 2): string {
    const stackList = StackTrace.getSync()
    const stackInfo = stackList[deep]

    const lineNumber = stackInfo.lineNumber
    const columnNumber = stackInfo.columnNumber
    const fileName = stackInfo.fileName
    const basename = Path.basename(fileName)

    return `${basename}(line: ${lineNumber},column: ${columnNumber}): \n`
  }
}
