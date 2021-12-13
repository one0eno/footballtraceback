const { response } = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

/**
 * Crea un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res
        .status(500)
        .json({ ok: false, msg: "Un usuario existe con ese correo" });
    }

    usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //grabamos
    await usuario.save();

    console.log("hEMOS GRABADO");
    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(201).json({
      ok: true,
      msg: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Error al grabar el usuario" });
  }
};
/**
 * Login de usuario
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //buscamos el usuario
    let usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario y/o contraseña no son correctos",
      });
    }

    //comparamos contraseña que llega con la de base de datos
    const validatePassword = bcrypt.compareSync(password, usuario.password);

    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario y/o contraseña no son correctos",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }

  return res.json({ ok: true, msg: "login", email, password });
};

/**
 * Renovacion de token de usuario
 * @param {*} req
 * @param {*} res
 */
const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generarJWT(uid, name);

  res.json({ ok: true, token });
};

module.exports = {
  createUser,
  renewToken,
  loginUser,
};
