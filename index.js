require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// Variable para almacenar los datos de las URL
const urlDatabase = {};

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Ruta para redirigir a la URL original
app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = req.params.short_url; // Captura el código corto desde la URL

  // Verifica si el código corto existe en la base de datos
  if (urlDatabase.hasOwnProperty(shortUrl)) {
    const originalUrl = urlDatabase[shortUrl];
    res.redirect(originalUrl); // Redirige al usuario a la URL original
  } else {
    res.status(404).json({ error: "No short URL found for the given input" }); // Devuelve un error si el código corto no existe
  }
});

// Ruta POST para /api/shorturl
app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url; // Suponiendo que el cuerpo de la solicitud contiene la URL en la propiedad 'url'
  // Verifica si la URL es válida
  const urlPattern = /^https?:\/\/([\w.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;

  if (!urlPattern.test(originalUrl)) {
    res.json({ error: "invalid url" }); // Devuelve un error si la URL no es válida
    return;
  }

  // Realiza una verificación de DNS para confirmar que la URL es accesible
  const domain = new URL(originalUrl).hostname;
  dns.lookup(domain, (err) => {
    if (err) {
      res.json({ error: "invalid url" }); // Devuelve un error si la URL no es accesible
    } else {
      // Genera un código corto para la URL
      const shortUrl = generateShortUrl();

      // Almacena la URL original y el código corto en la base de datos
      urlDatabase[shortUrl] = originalUrl;

      // Devuelve la respuesta JSON con las propiedades 'original_url' y 'short_url'
      res.json({ original_url: originalUrl, short_url: shortUrl });
    }
  });
});

// Función para generar un código corto aleatorio
function generateShortUrl() {
  // Lógica para generar un código corto único (puedes implementar tu propia lógica aquí)
  // Por simplicidad, este ejemplo usa un contador incremental
  const shortUrl = Object.keys(urlDatabase).length + 1;
  return shortUrl.toString();
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
