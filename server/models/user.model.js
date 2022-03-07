const sql = require("./db");
const bcrypt = require("bcrypt");

// const hashedPwd = bcrypt.hash(password, 8);

// constructor
const user = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password = bcrypt.hashSync(user.password, 8)
  this.state = user.state;
};

user.create = (newuser, result) => {
  sql.query(
    "INSERT INTO users SET ?",
    newuser,
    (err, dataRes) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }  
      else{
      console.log("created user: ", { userID: dataRes.insertId, ...newuser });
      result(null, { userID: dataRes.insertId, ...newuser });
      }
      // result(null, { id: 1,first_name:"...",last_name:"...",email:"em@ail.com",password:"...",staet:"israel"});
    }
  );
};
//finding one user identified by the id in the request
user.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE userID = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  }); 
};
// selecting all users that exsist
user.getAll = (result) => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};
//updating one user identified by the userId in the request
user.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET `first_name`=? ,`last_name`= ?,`email`= ?,`password`= ?,`state`= ? WHERE userID =  ?",
    [
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.state,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
      // update sucsses
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
//delete one  user identified by the userId in the request
user.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE userID =  ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }
    
    //delete sucsess
    console.log("deleted user with id: ", id);
    result(null, res);
  });
};



user.signin =  (email,password, result) => {
  sql.query(
    "SELECT * FROM users WHERE email = ?",
    email, 
      (err, res) => { 
      if (res.length === 0) {
        console.log("error: ", err); 
        return result( err, null);
      }
      else {
        const match = bcrypt.compareSync(password, res[0].password);
      if(match){
       console.log('sucsses');
       result(null, res)
      }
      else{
        result({ kind: "not_found" }, null);
        return;
      }
    }
    });
};

user.findByEmail = (email, result) => {
  sql.query(
    `SELECT * FROM users WHERE email = "${email}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err); 
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
    }
  );
};

module.exports = user;
