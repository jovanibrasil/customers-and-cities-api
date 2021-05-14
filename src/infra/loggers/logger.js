const winston = require('winston');
const { ENV } = process.env

const logger = winston.createLogger({
  level: ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;