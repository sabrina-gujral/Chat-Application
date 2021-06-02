const express = require("express");
const { disconnect } = require("process");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));
app.set("view engine", "ejs");

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    socket.username = username;
    io.emit("isOnline", "<i> " + socket.username + " joined the chat </i>");

    socket.on("disconnect", (username) => {
      io.emit("isOnline", "<i> " + socket.username + " left the chat </i>");
    });

    socket.on("chat", (message) => {
      io.emit("chat", "<strong>" + socket.username + "</strong>  " + message);
    });
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => console.log("server listening on port 3000..."));
