const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan');
var path = require('path');
// const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/static', express.static(path.join(__dirname, 'public')))
// parse requests of content-type - application/json
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

 
require("./routes/auth")(app);
require("./routes/deals")(app);
require("./routes/admin")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
