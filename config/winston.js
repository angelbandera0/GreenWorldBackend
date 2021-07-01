const winston = require("winston");
require("winston-mongodb");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

//definir transports
const transports = [
  new winston.transports.Console(),//muestra los mensajes en la consola
  new winston.transports.MongoDB({
    collection:"logs",
    db: process.env.MONDODB_ATLAS_URL,
    decolorize: true,
    expireAfterSeconds: 3600 * 24 * 45,
  }),//se encarga de almacenarlos en la BD
];

//crea la instancia del logger
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});
//permite escuchar cuando hay nuevos mensajes
Logger.stream = {
  write: function (message, encoding) {
    let status = message.split(" ")[2];
    status = status.substring(status.length - 3, status.length);
    let log;
    switch (status[0]) {
      case "4":
        log = "warn";
        break;
      case "5":
        log = "error";
        break;
      default:
        log = "http";
        break;
    }
    Logger.log(log, message);
  },
};

module.exports = {
  Logger,
};
