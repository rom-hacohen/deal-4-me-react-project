module.exports = (app) => {
  const users = require("../controllers/user.controller");

  // Create a new Customer - "/http://127.0.0.1:3009/auth/"
  app.post("/login/signup", users.create); //post => controller.create =>model.users.create =>("insert into...")

  app.post("/login/signin", users.signin)
  
  

};
