const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const cors = require('cors');
const socketio = require('socket.io');
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/events");

// intialisation
const app = express();

// socket connection
const Server = http.createServer(app);
const io = socketio(Server, {
  cors: {
    origin: "http://localhost:3000",
  }
});
//middlewares
app.use(cors());
app.use(express.json({ extended: false }));
/*app.use("/", (req,res)=>{
  console.log(req);
  res.send("i");
});*/
app.use("/api", userRoutes);
app.use("/api", eventRoutes);

//databaseConnection
env.config();

mongoose
  .connect(`mongodb+srv://Vrinda12:vrinda123@cluster0.il1wz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("An error has occured", err));

const rooms = {};



Server.listen(2000, console.log("Server started"));
