// enables interaction with the file system
const fs = require('fs');

// Tom's Obvious Minimal Language Parser
// toml - minimal config file format - easy to parse and map unambiguously to a hash table
const toml = require('toml');

// universal logger that allows file transports
const winston = require('winston');

// turning our toml file into a javascript object
let Cfg = {};
{
  const fp = fs.readFileSync('./config.toml').toString();
  Cfg = toml.parse(fp);
}

// init logger
{
  const transports = [];
  transports.push(new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize({ level: true }), winston.format.prettyPrint(), winston.format.simple()),
    level: 'info'
  }))

  const lineFmt = winston.format.combine(winston.format.timestamp(), winston.format.json());

  // file transports
  if (process.env.ISR_ENABLE_FILE_LOGGING === 'yes') {
    transports.push(new winston.transports.File({ filename: 'data/debug.log', level: 'debug' }), new winston.transports.File({ filename: 'data/error.log', level: 'error' }))
  }

  winston.configure({
    level: 'debug',
    format: lineFmt,
    defaultMeta: { service: 'isr' },
    transports
  })
}

module.exports = Cfg;
