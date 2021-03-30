const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const userGet = async (req = request, res = response) => {
  const [total, users] = await Promise.all([
    User.countDocuments(),
    User.find(),
  ]);

  res.status(200).send({
    total: total,
    users: users,
  });
};
//Agregar Usuario
const userPost = async (req, res = response) => {
  const { name, password, email, rol, img } = req.body;
  const user = new User({ name, password, email, rol, img });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  try {
    // Guardar en BD
    await user.save();
    res.status(201).send({
      msg: "Usuario creado correctame",
      user: user,
    });
  } catch (e) {
    res.status(400).send({ msg: "Ha ocurrido un error al adicionar" });
  }
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, email, ...resto } = req.body;

  try {
    if (password) {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    //Buscar y actualizar
    await User.findByIdAndUpdate(id, resto);
    res.status(200).send({ msg: "User Actualizado Correctame" });
  } catch (e) {
    res.status(400).send({ msg: "Ha ocurrido un error en la actualizacón" });
  }
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;
  //Fisicamente lo borramos
  try {
    await User.findByIdAndRemove(id);
    res.status(200).send({ msg: "Usuario eliminado Correctamente" });
  } catch (e) {
    res.status(400).send({ msg: "Ha ocurrido un error en la eliminación" });
  }
};

module.exports = { userPost, userGet, userPut, userDelete };
