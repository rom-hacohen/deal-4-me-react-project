module.exports = {
  HOST: "us-cdbr-east-05.cleardb.net",
  USER: "b05a88c4f3bdca",
  PASSWORD: "12bed069",
  port: "3306",
  DB: "heroku_519686ffea7cac5",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
