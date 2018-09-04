const path = require('path')
const util = require('util')
const fs = require('fs')

let makeArray = nonarray => {
  return Array.prototype.slice.call(nonarray)
}

// Create a new instance of Logger, logging to the file at `logFilePath`
// if `logFilePath` is null, log to STDOUT.
let Logger = function (logFilePath) {
  // default write is STDOUT
  this.write = console.log
  this.LogLevelIndex = 3

  // if a path is given, try to write to it
  if (logFilePath) {
    // Write to a file
    logFilePath = path.normalize(logFilePath)
    this.stream = fs.createWriteStream(logFilePath, { flags: 'a', encoding: 'utf8', mode: 666 })
    this.stream.write('\n')
    this.write = function (text) { this.stream.write(text) }
  }
}

Logger.levels = ['fatal', 'error', 'warn', 'info', 'debug']

/**
 * @param  {string} level logging level
 * @param  {date} date timestamp
 * @param  {string} message message to print out
 */
Logger.prototype.format = (level, date, message) => {
  return [level, ' [', date, '] ', message].join('')
}

// Set the maximum log level. The default level is 'info'.
Logger.prototype.setLevel = newLevel => {
  let index = Logger.levels.indexOf(newLevel)
  let _index = (index !== -1) ? this.LogLevelIndex = index : false
  return _index
}

// The base logging method. If the first argument is one of the levels, it logs
// to that level, otherwise, logs to the default level. Can take `n` arguments
// and joins them by ' '. If the argument is not a string, it runs `util.inspect()`
// to print a string representation of the object.
Logger.prototype.log = () => {
  let args = makeArray(arguments)
  let logIndex = Logger.levels.indexOf(args[0])
  let message = ''

  // if you're just default logging
  if (logIndex === -1) {
    logIndex = this.LogLevelIndex
  } else {
    // the first arguement actually was the log level
    args.shift()
  }
  if (logIndex <= this.LogLevelIndex) {
    // join the arguments into a loggable string
    args.forEach(function (arg) {
      if (typeof arg === 'string') {
        message += ' ' + arg
      } else {
        message += ' ' + util.inspect(arg, false, null)
      }
    })
    message = this.format(Logger.levels[logIndex], new Date(), message)
    this.write(message + '\n')
    return message
  }
  return false
}

Logger.levels.forEach(level => {
  Logger.prototype[level] = function () {
    var args = makeArray(arguments)
    args.unshift(level)
    return this.log.apply(this, args)
  }
})

exports.Logger = Logger
exports.createLogger = function (logFilePath) {
  return new Logger(logFilePath)
}
