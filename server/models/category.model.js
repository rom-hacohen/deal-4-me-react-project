const sql = require("./db");

const category = function(category){
    this.categoryID = category.categoryID;
    this.title = category.categoryName;
}

category.getAll = (result) => {
    sql.query("SELECT * FROM categories", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("categories: ", res);
      result(null, res);
    });
  };
  module.exports = category;