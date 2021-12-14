/**
 * Routas de usuarios
 * host + /api/auth
 *
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, renewToken, loginUser } = require("../controllers/auth");
const validarCampos = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
/**grabar usuario */
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Introduzca un email valido").isEmail(),
    check(
      "password",
      "El password ha de ser de 6 caracteres obligatorio"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Introduzca un email valido").isEmail(),
    check(
      "password",
      "El password ha de ser de 6 caracteres obligatorio"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
