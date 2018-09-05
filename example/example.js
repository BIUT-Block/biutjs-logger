// create and logs to a file
const logger = require('../src/index.js').createLogger('SEC-out.log')

// set allowing log level, default is info
logger.debug('this will be logged now')
logger.info('this will be logged now')
logger.error('this will be logged now')
logger.warn('this will be logged now')
logger.fatal('this will be logged now')

// Information of levels which are over debugs wil appear
logger.setLevel('debug')

// format back to information containing timestamp and message
logger.format()
logger.debug('message')
