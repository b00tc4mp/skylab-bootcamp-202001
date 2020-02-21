module.exports = {
  logger: require('./logger'), 
  loggerMidWare: require('./logger-mid-ware'), 
  cookieParserMidWare: require("./logger-mid-ware"), 
  acceptCookiesMidWare : require('./cookies')
}