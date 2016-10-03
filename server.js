var express = require("express");
var app = express();
var PORT = process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});


app.get("/", function(req, res, next){
  res.send("Working");
});

var io = require('socket.io').listen(app.listen(PORT));

io.sockets.on("connection", function(socket){
  socket.emit("message", {message : "Welcome to the chat"});
  socket.on("send", function(data){
    io.sockets.emit("message", data);
  });
});







