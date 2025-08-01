// Proxy HTTPS para Icecast - Todo al Aire (by Tito & Tato)
const express = require("express");
const request = require("request");
const app = express();

const ICECAST_URL = "http://190.225.170.89:8000/stream"; // Cambialo si tu stream es otro

app.get("/", (req, res) => {
  res.send("Proxy HTTPS para Todo al Aire funcionando! Ruta: /radio");
});

app.get("/radio", (req, res) => {
  res.setHeader("Content-Type", "audio/mpeg");
  request(ICECAST_URL)
    .on('error', function(err) {
      res.status(500).send('Error al conectar con el streaming.');
    })
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy andando en puerto: " + PORT);
});
