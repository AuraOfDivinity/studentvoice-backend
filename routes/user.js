var express = require("express");
const UserController = require("../controllers/UserController");

var router = express.Router();

router.get("/:id", UserController.getUser);

module.exports = router;
