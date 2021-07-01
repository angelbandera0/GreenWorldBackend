const redis = require("redis");
const { Logger } = require("./logger");

//establecer conexion con redis
const redisClient = redis.createClient({
  host: process.env.REDIS_DB_HOST,
  port: process.env.REDIS_DB_PORT,
  user: process.env.REDIS_DB_USER,
  password: process.env.REDIS_DB_PASS,
});
//manejo de error en la conexión
redisClient.on("error", (error) => {
  //regitra el error en el logger
  Logger.log(
    "error",
    `Ocurrió un error al conectar con REDIS: `,
    new Error(error)
  );
  console.error(error);
});

module.exports = {
  redisClient,
};
