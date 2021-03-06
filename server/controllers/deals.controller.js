const deal  = require("../models/deals.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

    //adding the new deal
    const newDeal = new deal({
      Title: req.body.Title,
      state: req.body.state,
      price: req.body.price,
      hotelName: req.body.hotelName,
      categoryID: req.body.categoryID,
      Description : req.body.Description,
      img_src: req.body.img_src,
      city: req.body.city,
      dates: req.body.dates
    });
    // Save deal in the database
    deal.create(newDeal, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the deal.",
        });
      else res.send(data);
    });

};


// Retrieve all deals from the database.
exports.findAll = (req, res) => {
    deal.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving deals.",
        }); 
      else res.send(data);
    });
  };

  exports.orderByLowerPrice = (req, res) => {
    deal.orderByLowerPrice((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving deals.",
        }); 
      else res.send(data);
    });
  };

  exports.orderByHigherPrice = (req, res) => {
    deal.orderByHigherPrice((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving deals.",
        }); 
      else res.send(data);
    });
  };
  

// Delete a deal with the specified dealId in the request
exports.delete = (req, res) => {
  deal.remove(req.params.dealId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deal with id ${req.params.dealId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete deal with id " + req.params.dealId,
        });
      }
    } else res.send({ message: `deal was deleted successfully!` ,data});
  });
};

// Update a deal identified by the dealId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }


  deal.updateById(req.params.dealId, new deal(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deal with id ${req.params.dealId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating deal with id " + req.params.dealId,
        });
      }
    } else res.send(data);
  });
};

exports.addFollower = (req, res) => {
deal.addFollower(req.params.dealId, new deal(req.body), (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found deal with id ${req.params.dealId}.`,
      });
    } else {
      res.status(500).send({
        message: "Error updating deal with id " + req.params.dealId,
      });
    }
  } else res.send(data);
});
};


exports.removeFollower = (req, res) => {
  deal.removeFollower(req.params.dealId, new deal(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deal with id ${req.params.dealId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating deal with id " + req.params.dealId,
        });
      }
    } else res.send(data);
  });
  };
  

exports.findeByCategoryID = (req, res) => {
  deal.findeByCategoryID(req.params.categoryID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deal with categoryID ${req.params.categoryID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving deal with categoryID" + req.params.categoryID,
        });
      }
    } else res.send(data);
  });
};