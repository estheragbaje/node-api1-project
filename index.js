// implement your API here
const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const server = express();

server.get(cors());
server.use(express.json());


server.get("/api/users", getAllUsers);
server.get("*", handleDefaultRequest);

function getAllUsers(req, res) {
  db.find()
    .then(data => {
      console.log(data);
      //   res.json(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "The users information could not be retrieved."
      });
    });
}

function handleDefaultRequest(req, res) {
  res.json("hello from afternoon project");
}

server.listen(process.env.PORT || 3800, () => {
  console.log("listening on " + (process.env.PORT || 3800));
});
