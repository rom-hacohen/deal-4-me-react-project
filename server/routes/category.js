module.exports = (app) => {
    const category = require("../controllers/category.controller");
    // Retrieve all category
  app.get("/category", category.getAll); //get => controller.getAll =>model.category.getAll => ("select * ..")
}