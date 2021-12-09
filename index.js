const express = require("express");
require("dotenv").config();

//console.log(process.env);
//crear servidor express
const app = express();

//Directorio publico
app.use(express.static("public"));

//LEctura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));

// app.get("/", (req, res) => {
//   res.json({ ok: true });
// });

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
