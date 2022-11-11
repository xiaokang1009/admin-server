/*
 * @Author: xiaokang1009
 * @Date: 2022-11-14 18:10:47
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-14 19:28:32
 * @Description: sql自定义日志
 */
import { Logger as Log4js } from '@/utils/log4js'
import { Logger, QueryRunner } from 'typeorm'

export class DatabaseLogger implements Logger {
  private options?
  constructor(options) {
    this.options = options
  }
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (Array.isArray(this.options) && this.options.indexOf('query') !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
          : '')
      Log4js.info('query: ' + sql)
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    Log4js.log(message)
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    if (
      this.options === 'all' ||
      this.options === true ||
      (Array.isArray(this.options) && this.options.indexOf('error') !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
          : '')
      Log4js.error(`query fail: ${sql}`)
      Log4js.error(`error:`, error)
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const sql =
      query +
      (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '')
    Log4js.log(`query is slow: ${sql}`).log(`execute time: ${time}`)
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (
      this.options === 'all' ||
      (Array.isArray(this.options) && this.options.indexOf('schema') !== -1)
    ) {
      Log4js.log(message)
    }
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'info':
        if (
          this.options === 'all' ||
          (Array.isArray(this.options) && this.options.indexOf('info') !== -1)
        ) {
          Log4js.info(message)
        }
        break
      case 'log':
        if (
          this.options === 'all' ||
          (Array.isArray(this.options) && this.options.indexOf('log') !== -1)
        )
          Log4js.log(message)
        break
      case 'warn':
        if (
          this.options === 'all' ||
          (Array.isArray(this.options) && this.options.indexOf('warn') !== -1)
        )
          Log4js.warning(message)
        break
    }
  }
  stringifyParams(parameters) {
    try {
      return JSON.stringify(parameters)
    } catch (error) {
      // most probably circular objects in parameters
      return parameters
    }
  }
}
