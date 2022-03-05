const category = require("../models/category.model");

// Retrieve all deals from the database.
exports.getAll = (req, res) => {
    category.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving deals.",
        }); 
      else res.send(data);
    });
  };
