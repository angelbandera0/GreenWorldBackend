const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User=require('../models/user');

const userGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { isDeleted: false };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.status(200).send({
        "total":total,
        "users":users
    });
}

const userPost= async(req,res=response)=>{
    const { name,  password,email, rol,img} = req.body;
    const user = new User({  name,  password,email, rol,img});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();
    res.status(201).send({"user":user});
}

module.exports={userPost,userGet}