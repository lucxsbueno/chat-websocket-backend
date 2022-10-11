/**
 * 
 * Environment variables
 */
require("dotenv").config();

/**
 * 
 * Server configuration
 */
const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/**
 * 
 * Request body in json format
 */
app.use(express.json());

/**
 * 
 * 
 * 
 * 
 * Cors
 */
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my server application! 😊"
  });
});

/**
 * 
 * Routes
 */
const userRouter = require("./api/user/user.router");
app.use("/users", userRouter);

const channelRouter = require("./api/channel/channel.router");
app.use("/channels", channelRouter);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", data => {
    console.log("Disconnected:", data.id);
  });

  socket.on("unsubscribe_room", data => {
    socket.leave(data.room);
  });

  socket.on("join_room", data => {
    socket.join(data.room);
  });

  socket.on("send_message", async data => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", data => {
    socket.to(data.room).emit("user_is_typing", data.user);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is runnig on: http://localhost:${process.env.PORT}.`);
});