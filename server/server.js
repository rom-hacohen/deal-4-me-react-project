const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
var path = require('path');
const cors = require('cors');
const http = require('http').Server(app); ;
const PORT = process.env.PORT || 3009;
const io = require("socket.io")(http, {
  cors: {
    origin: "*"}
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + "/public"));

// parse requests of content-type - application/json
  app.use(express.json());
  app.use(cors())


  io.on('connection', socket => {
    socket.on('sendUpdate', (arg) => {
      console.log(arg);
      io.emit('getUpdate',true)
    })
  })
  

require("./routes/auth")(app);
require("./routes/deals")(app);
require("./routes/admin")(app);
require("./routes/category")(app);
require("./routes/follow")(app);

// set port, listen for requests

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));

