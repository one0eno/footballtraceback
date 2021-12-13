/**
 * Routas de usuarios
 * host + /api/events
 *
 */
const { Router } = require("express");
const { check } = require("express-validator");
//const { isDate } = require("../helpers/isDate");
const validarCampos = require("../middlewares/validar-campos");
const {
  getEventos,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");

const router = Router();

//CONTROLA TODAS LAS RUTAS, MOVIENDO MAS ABAJO PODEMOS CONTROLAR SOLO ALGUNAS RUTAS
router.use(validarJWT);

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "titulo obligatorio").not().isEmpty(),
    check("start", "fecha de inicio obligatoria").custom(isDate),
    check("end", "fecha de fin esobligatoria").custom(isDate),

    validarCampos,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
