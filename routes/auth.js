const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validator');


const { login } = require('../controllers/authController');


const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );



module.exports = router;