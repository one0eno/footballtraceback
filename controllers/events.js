const { response } = require("express");

const Event = require("../models/Event");

const getEventos = async (req, res = response) => {
  try {
    const eventos = await Event.find().populate("user", "name");

    return res.status(200).json({
      ok: true,
      msg: "obtenereventos",
      eventos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const createEvent = async (req, res) => {
  const evento = new Event(req.body);

  try {
    console.log("********.........**********", req.body);
    console.log("********.........**********", req.uid);

    evento.user = req.uid;
    const eventoGuardado = await evento.save();

    return res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Se ha producido un error, hable con el administrador",
      msgerror: error,
    });
  }
};

const updateEvent = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Event.findById(eventoId);
    if (!evento)
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe en base de datos",
      });

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permisos para modificar el evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Event.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    return res.json({
      ok: true,
      msg: eventoActualizado,
    });

    console.log(evento);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Se ha producido un error al modificar el evento",
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Event.findById(eventoId);
    if (!evento)
      return res.status(404).json({
        ok: false,
        msg: "El evento no existe en base de datos",
      });

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tienes permisos para modificar el evento",
      });
    }

    const eventoEliminado = await Event.findByIdAndDelete(eventoId);

    return res.json({
      ok: true,
      msg: eventoEliminado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Se ha producido un error al eliminar el evento",
    });
  }
};

module.exports = {
  getEventos,
  createEvent,
  updateEvent,
  deleteEvent,
};
