#secjs-logger
https://github.com/SEC-Block/secjs-logger

###SUMMARY
A simple logging library for SEC-Block

###USAGE
A logger has 5 different levels of logging in a specific order:

'fatal', 'error', 'warn', 'info', 'debug'
Each of these log levels has its own method on the logging instance. You can set the maximum log level on a logger at runtime.

By default, a logger writes to STDOUT, but given a writeable file path, it will log directly to a file.

###Instantiation:
```js
// standardjs style
const logger = require('./logger').createLogger() // logs to STDOUT
const logger = require('./logger').createLogger('development.log') // logs to a file
```

###Logging:
Any of the logging methods take n arguments, which are each joined by ' '. If an argument is not a string, it is string-ified by util.inspect()
```js
logger.info('loading an array', [1,2,3], 'now!')
// info [Sat Jun 12 2018 01:12:05 GMT-0400 (EDT)]  loading an array [ 1, 2, 3, [length]: 3 ] now!
logger.debug('this wont be logged')
// false
logger.setLevel('debug')
logger.debug('this will be logged now')
// debug [Sat Jun 12 2018 01:12:54 GMT-0400 (EDT)]  this will be logged now
```

###Customization:
You can completely customize the look of the log by overriding the format() method on a logger.
```js
logger.format = function(level, date, message) {
  return date.getTime().toString() + '; ' + message
};
logger.debug('message')
// 1276365362167;  message
```

###LICENSE
MIT, see the source.