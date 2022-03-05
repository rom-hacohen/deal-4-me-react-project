module.exports = (app) => {
  const deals = require("../controllers/deals.controller");

  // Retrieve all deals
  app.get("/deals", deals.findAll); //get => controller.findAll =>model.deals.getAll => ("select * ..")

  // order all deal from the most expensive  to most cheap  - "/http://127.0.0.1:3009/deals/orderByLowerPrice"
  app.get("/deals/orderByLowerPrice", deals.orderByLowerPrice); //controller.method


    // order all deal from the most cheap  to most expensive  - "/http://127.0.0.1:3009/deals/orderByHigherPrice"
    app.get("/deals/orderByHigherPrice", deals.orderByHigherPrice); //controller.method


  // adding followers to deals
  app.put("/deals/addFollower/:dealId", deals.addFollower);
  
  // removing followers to deals
  app.put("/deals/removeFollower/:dealId", deals.removeFollower);


  //Retrieve all deals from the same category "http://127.0.0.1:3009/deals/categoryID:
  app.get("/deals/:categoryID", deals.findeByCategoryID);
};
