// implement your API here
const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const server = express();

server.get(cors());
server.use(express.json());

server.delete("/api/users/:id", deleteUser);
server.post("/api/users", createNewUSer);
server.get("/api/users/:id", getUserById);
server.get("/api/users", getAllUsers);
server.get("*", handleDefaultRequest);

function deleteUser(req, res) {
  const id = req.params.id;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        sucess: false,
        error: "The user could not be removed"
      });
    });
}

function createNewUSer(req, res) {
  const user = {
    name: req.body.name,
    bio: req.body.bio
  };

  db.insert(req.body)
    .then(data => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        success: false,
        errorMessage: "Please provide name and bio for the user."
      });
    });
}

function getUserById(req, res) {
  const id = req.params.id;
  console.log(id);

  db.findById(id)
    .then(data => {
      if (data) {
        res.status(200).json({
          success: true,
          data
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "The user information could not be retrieved."
      });
    });
}

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
