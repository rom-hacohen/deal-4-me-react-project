module.exports = (app) => {
    const users = require("../controllers/user.controller");
    const deals = require("../controllers/deals.controller");

    //ALL USERS CRUD FOR ADMIN

    // Create a new Customer - "/http://127.0.0.1:3005/users/"
  app.get("/users", users.findAll); //get => controller.findAll =>model.users.getAll => ("select * ..")

  // Retrieve a single user with userId - "/http://127.0.0.1:3009/users/id"
  app.get("/users/:userId", users.findOne); //controller.method

  // Update a user with userId -"/http://127.0.0.1:3009/users/id"
  app.put("/users/:userId", users.update); //controller.method

  // Delete a user with userId -"/http://127.0.0.1:3009/users/id "
  app.delete("/users/:userId", users.delete); //controller.method

// Retrieve a single user with userId - "/http://127.0.0.1:3009/users/name"
  app.get("/users/findByName/:name", users.findOneByName)

// ALL DEALS CRUD FOR ADMIN

// adding new deal to the DB- "/http://127.0.0.1:3009/deals_manage"
  app.post("/deals_manage",deals.create);

  // dealteing deal -"/http://127.0.0.1:3009/deals_manage/id"
  app.delete("/deals_manage/:dealId", deals.delete);

  // update deal with dealID -"/http://127.0.0.1:3009/deals_manage/id"
  app.put("/deals_manage/:dealId", deals.update)

  };
  