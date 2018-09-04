// const Logger = require('../src/index.js')
// let loggerWarn = Logger.createLogger('SEC-warn.log')
// let loggerError = Logger.createLogger('SEC-error.log')
// let loggerFatal = Logger.createLogger('SEC-fatal.log')

// create and logs to a file
const logger = require('../src/index.js').createLogger('SEC-out.log')

// set allowing log level, default is info
logger.setLevel('debug')
logger.debug('this will be logged now')
logger.info('this will be logged now')
logger.error('this will be logged now')
logger.warn('this will be logged now')
logger.fatal('this will be logged now')

// format back to information containing timestamp and message
logger.format()
logger.debug('message')
