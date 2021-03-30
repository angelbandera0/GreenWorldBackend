var express = require("express");
var router = express.Router();
const { userPost, userGet } = require("../controllers/userController");
/* GET users listing. */
router.get("/", userGet);
router.post("/", userPost);

module.exports = router;
