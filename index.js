// implement your API here
const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const server = express();

server.get(cors());
server.use(express.json())

server.get('*', handleDefaultRequest)

function handleDefaultRequest(req, res) {
    res.json('hello from afternoon project')
}

server.listen(process.env.PORT || 3800, () => {
    console.log('listening on ' + (process.env.PORT || 3800))
})