const express = require("express");
const { dbConnection } = require("./database/config");
const { validarJWT } = require("./middlewares/validar-jwt");
require("dotenv").config();
const cors = require("cors");

//console.log(process.env);
//crear servidor express
const app = express();

//Base de datos
dbConnection();

//cors
app.use(cors());

//Directorio publico
app.use(express.static("public"));

//LEctura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//app.use("/api/auth", validarJWT, require("./routes/auth"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
