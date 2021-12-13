const Event = require("../models/Event");

const { response } = require("express");

const getEventos = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: "obtenereventos",
    events: [],
  });
};

const createEvent = async (req, res) => {
  console.log("llega a create");
  console.log(req.body);

  const evento = new Event(req.body);

  try {
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Se ha producido un error, hable con el administrador",
    });
  }
  res.status(200).json({
    ok: true,
    msg: "crear eventos",
  });
};

const updateEvent = (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "actualizar evento",
  });
};

const deleteEvent = (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "eliminar evento",
  });
};

module.exports = {
  getEventos,
  createEvent,
  updateEvent,
  deleteEvent,
};
