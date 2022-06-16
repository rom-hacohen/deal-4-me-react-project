const FollowDeal = require("../models/follow.model")


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const newFollow =  new FollowDeal({
        userID: req.body.userID,
        dealID: req.body.dealID,
    })
    FollowDeal.create(newFollow,(err,data)=>{
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the deal.",
    });
  else res.send(data);
});
}

exports.findAll = (req, res) => {
  FollowDeal.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};



exports.getByDealID = (req, res) => {
    FollowDeal.getByDealID(req.body.dealID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found deal with categoryID ${req.body.dealID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving deal with dealID" + req.params.dealID,
          });
        }
      } else res.send(data);
    });
  };

  exports.getByUserID = (req, res) => {
    FollowDeal.getByUserID(req.params.userID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found deal with userID ${req.params.userID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving deal with userID" + req.params.userID,
          });
        }
      } else res.send(data);
    });
  };


  exports.delete = (req, res) => {
    FollowDeal.remove(req.params.followID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found deal with id ${req.params.followID}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete deal with id " + req.params.followID,
          });
        }
      } else res.send({ message: `deal was deleted successfully!` ,data});
    });
  };  
  
  exports.comperByUserID = (req, res) => {
    FollowDeal.comperByUserID(req.params.userID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found deal with userID ${req.params.userID}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving deal with userID" + req.params.userID,
          });
        }
      } else res.send(data);
    });
  };