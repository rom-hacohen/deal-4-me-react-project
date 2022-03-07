const sql = require("./db");
  
// constructor
const deal = function (deal) {
  this.Title = deal.Title;
  this.state = deal.state;
  this.price = deal.price;
  this.hotelName = deal.hotelName;
  this.categoryID = deal.categoryID;
  this.Description = deal.Description;
  this.img_src = deal.img_src;
  this.city = deal.city;
  this.dates = deal.dates
};

deal.create = (newDeal, result) => {
  sql.query(
    "INSERT INTO  deals SET ?",
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

deal.orderByLowerPrice = (result) => {
  sql.query(
    "SELECT * FROM deals order by price asc",
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

deal.orderByHigherPrice = (result) => {
  sql.query(
    "SELECT * FROM deals order by price desc",
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
    `UPDATE deals SET Title = ? ,state =?,  price =? , hotelName = ?  , categoryID = ? , Description = ? , img_src = ? , city = ?, dates = ?, followers = ? WHERE dealID = ${id} `,
    [
      deal.Title,
      deal.state,
      deal.price,
      deal.hotelName,
      deal.categoryID,
      deal.Description,
      deal.img_src,
      deal.city,
      deal.dates,
      id
      
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

deal.addFollower = (id, deal, result) => {
  sql.query(
    "UPDATE deals SET followers = followers +1 WHERE dealID = ?",
    [
      id,
      deal.followers,
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


deal.removeFollower = (id, deal, result) => {
  sql.query(
    "UPDATE deals SET followers = followers -1 WHERE dealID = ?",
    [
      id,
      deal.followers,
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

deal.findeByCategoryID = (categoryID, result) => {
  sql.query("SELECT * FROM deals WHERE categoryID= ?", categoryID, (err, res) => {
    if (err) {
      console.log(categoryID);
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      console.log("deals: ", res);
      result(null, res);
    }
  });
};

module.exports = deal;
