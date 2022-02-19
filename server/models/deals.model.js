const sql = require("./db");
  
// constructor
const deal = function (deal) {
  this.Title = deal.Title;
  this.state = deal.state;
  this.price = deal.price;
  this.hotelName = deal.hotelName;
  this.Rating = deal.Rating;
  this.categoryID = deal.categoryID;
  this.Description = deal.Description;
  this.img_src = deal.img_src;
  this.city = deal.city;
  this.mainland = deal.mainland;
  this.dates = deal.dates
  this.followers = deal.followers
};

deal.create = (newDeal, result) => {
  sql.query(
    "INSERT INTO `deal_4_me`.`deals` SET ?",
    newDeal,
    (err, dataRes) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: dataRes.insertId, ...newDeal });
      result(null, { id: dataRes.insertId, ...newDeal });
    }
  );
};

deal.getAll = (result) => {
  sql.query("SELECT * FROM deals", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deals: ", res);
    result(null, res);
  });
};

deal.orderByPrice = (result) => {
  sql.query(
    "select * from deal_4_me.deals order by CAST(price AS Float)  asc",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("deals: ", res);
      result(null, res);
    }
  );
};

deal.findeBymainland = (manland, result) => {
  sql.query("SELECT * FROM deals WHERE mainland = ?", manland, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deals: ", res);
    result(null, res);
  });
};

deal.findeByState = (state, result) => {
  sql.query("SELECT * FROM deals WHERE state = ?", state, (err, res) => {
    if (err) {
      console.log(state);
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      console.log("deals: ", res);
      result(null, res);
    }
  });
};

deal.remove = (id, result) => {
  sql.query("DELETE FROM deals WHERE dealID =  ?", id, (err, res) => {
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
    console.log("deleted deal with id: ", id);
    result(null, res);
  });
};

//updating one user identified by the userId in the request
deal.updateById = (id, deal, result) => {
  sql.query(
    "UPDATE deals SET Title = ? ,  price =? , hotelName = ? , Rating = ? , categoryID = ? , Description = ? , img_src = ? , city = ?, mainkand = ?, dates = ?, followers = ? WHERE dealID = ?",
    [
      deal.Title,
      deal.price,
      deal.hotelName,
      deal.Rating,
      deal.categoryID,
      deal.Description,
      deal.img_src,
      deal.city,
      deal.mainland,
      deal.dates,
      deal.followers,
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
      console.log("updated deal: ", { id: id, ...deal });
      result(null, { id: id, ...deal });
    }
  );
};

deal.updateFollowers = (id, deal, result) => {
  sql.query(
    "UPDATE deals SET followers = ? WHERE dealID = ?",
    [
      deal.followers,
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
      console.log("updated deal: ", { id: id, ...deal });
      result(null, { id: id, ...deal });
    }
  );
};

// SET
// `dealID` = ?,
// `Title` =
// `state` = ?,
// `price` =?,
// `hotelName` = ?,
// `Rating` = ?,
// `categoryID` = ?,
// `Description` = ?,
// `img_src` = ?,
// `city` = ?,
// `mainland` = ?
// WHERE `dealID` = ?;
module.exports = deal;
