/**
 * 开发异常捕获
 */

export const catchError = () => {
  process.on('unhandledRejection', (reason, promise) => {
    console.log('Promise', promise, 'Reason', reason)
  })
}
