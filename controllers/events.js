const { response } = require("express");

const getEventos = (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: "obtenereventos",
    events: [],
  });
};

const createEvent = (req, res) => {
  console.log("llega a create");
  console.log(req.body);

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
