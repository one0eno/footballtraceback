const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//console.log(process.env);
//crear servidor express
const app = express();

//Base de datos
dbConnection();
//Directorio publico
app.use(express.static("public"));

//LEctura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
