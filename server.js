const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB (reemplaza <MONGO_DB_URL> con tu URL de MongoDB)
mongoose.connect("<MONGO_DB_URL>", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const solicitudSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  fecha: Date,
  articulos: String,
  descripcion: String,
  costos: String,
});

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

app.use(bodyParser.json());

app.post("/api/solicitudes", async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json({ message: "Solicitud creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la solicitud" });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
