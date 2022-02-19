module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  port: "3306",
  DB: "deal_4_me",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
