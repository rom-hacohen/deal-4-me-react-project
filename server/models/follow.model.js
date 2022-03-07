const sql = require("./db");

const FollowDeal = function(follow){
    this.userID = follow.userID;
    this.dealID= follow.dealID;
}

FollowDeal.getAll = (result) => {
  sql.query("SELECT * FROM followdeals",(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return; 
    }
    console.log("followdeals: ", res);
    result(null, res);
  });
}; 

FollowDeal.getByUserID =(userID, result)=>{
sql.query(`SELECT * FROM followdeals WHERE userID= ${userID}`, (err, res) => {
    if (err) {
        console.log(userID);
        console.log("error: ", err);
        result(null, err);
        return;
      } else {
        console.log("user: ", res);
        result(null, res);
      }
    });
}




FollowDeal.getByDealID =(dealID, result)=>{
    sql.query("SELECT * FROM followdeals WHERE dealID= ?", dealID, (err, res) => {
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
  })
}

FollowDeal.comperByUserID =(userID, result)=>{
  sql.query(`SELECT * FROM deals join followdeals on followdeals.dealID = deals.dealID where userID = ${userID}`, (err, res) => {
      if (err) {
          console.log(userID);
          console.log("error: ", err);
          result(null, err);
          return;
        } else {
          console.log("user: ", res);
          result(null, res);
        }
      });
  }

    FollowDeal.create = (newFollow, result) => {
        sql.query(
          "INSERT INTO followdeals SET ?",
          newFollow,
          (err, dataRes) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("created user: ", { FollowID: dataRes.insertId, ...newFollow });
            result(null, { FollowID: dataRes.insertId, ...newFollow });
          }
        );
      };


      FollowDeal.remove = (id, result) => {
        sql.query("DELETE FROM followdeals WHERE followID =   ?", id, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
        });
    }

    module.exports = FollowDeal;