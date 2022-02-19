module.exports = (app) => {
  const deals = require("../controllers/deals.controller");

  // Retrieve all deals
  app.get("/deals", deals.findAll); //get => controller.findAll =>model.deals.getAll => ("select * ..")

  // order all deal from the most cheap  to most expensive  - "/http://127.0.0.1:3009/deals/orderByPrice"
  app.get("/deals/orderByPrice", deals.orderByPrice); //controller.method

  // adding followers to deals
  app.put("/deals/addFollower/:dealId", deals.updateFollowers);

  // Retrieve all deals from the same states - "/http://127.0.0.1:3009/deals/state"
  app.get("/deals/state", deals.findeByState);

  // Retrieve all deals from the same mainland - "/http://127.0.0.1:3009/deals/mainland"
  app.get("/deals/mainland", deals.findeBymainland);


};
