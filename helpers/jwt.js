const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    console.log(uid);
    console.log(name);
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: process.env.SECRET_JWT_EXPIREIN,
      },
      (err, token) => {
        if (err) {
          console.log("no se puedo leer el token");
          reject(err);
        }
        console.log(token);
        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
