var express = require("express");
const {check}=require("express-validator");
const {validarCampos} = require('../middlewares/validator');
var router = express.Router();
const { userPost, userGet, userPut,userDelete } = require("../controllers/userController");

/* Route users listing. */
router.get("/",userGet);
router.post("/",[check("email","No es valido").isEmail(),validarCampos], userPost);
router.put("/:id", userPut);
router.delete("/", userDelete);

module.exports = router;
