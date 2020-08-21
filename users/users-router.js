const express = require("express");
const router = express.Router();

const Users = require("./users-model");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((error) => {
      res.send(error);
    });
});


module.exports = router