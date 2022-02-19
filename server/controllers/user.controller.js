const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config")

const token = jwt.sign({ id: user.id }, config.secret, {
  expiresIn: 86400, // 24 hours 
});

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const duplicate = user.findByEmail(
    (person) => person.req.body === user.email
  );

  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //store the new user
    const newuser = new user({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email, 
      password: req.body.password,
      state: req.body.state,
    });

    // Save user in the database
    user.create(newuser, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      else res.send({data,Token:token}); 
    });
  } catch (err) {  
    res.status(500).send({ message: err.message }); 
  }
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  user.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send({data});
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  user.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  user.updateById(req.params.userId, new user(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  user.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.userId,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

exports.findOneByName = (req, res) => {
  user.findByName(req.params.first_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with first_name ${req.params.first_name}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving user with first_name " + req.params.first_name,
        });
      }
    } else res.send(data);
  });
};

exports.signin = (req, res) => {
  user.signin(req.body.email, req.body.password, (err, data) => {
    console.log(data); 
      if (data == null) { 
        res.status(404).send({
          message: "email or password are incorrect",
        });
      }
      else {
      // if (data.admin == 0){console.log('admin');}
      // else console.log('user');
      res.status(200).send({data,Token:token});
    }

  });
};

exports.findByEmail = (req, res) => {
  user.findByEmail(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with first_name ${req.body.email}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving user with first_name " + req.body.email,
        });
      }
    } else res.send(data);
  });
};