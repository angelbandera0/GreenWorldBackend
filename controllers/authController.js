const { response } = require('express');
const bcryptjs = require('bcryptjs')

const { User } = require('../models');

const { generarJWT } = require('../helpers/generar_jwt');


const login = async(req, res = response) => {
    //obtiene el email y la contraseña q se le envia 
    const { email, password } = req.body;
    try {
      
        // Verificar si el email existe
        const usuario = await User.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'User / Password no son correctos - correo'
            });
        }

        
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.status(200).send({
            "user":usuario,
            "user":token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}



module.exports = {
    login
}
