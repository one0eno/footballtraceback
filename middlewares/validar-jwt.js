const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  //x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No se ha recibido el token",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

    const { uid, name } = payload;

    req.uid = uid;
    req.name = name;

    console.log(payload);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  console.log("token", token);

  next();
};

module.exports = {
  validarJWT,
};
