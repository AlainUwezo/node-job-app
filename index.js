const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const comparisonRoutes = require("./routes/comparisonRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Utiliser le middleware CORS pour toutes les origines
app.use(cors());

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Utiliser les routes pour les comparaisons
app.use("/api", comparisonRoutes);

// Route pour vérifier que le serveur fonctionne
app.get("/hello", (req, res) => {
  res.json({ message: "Hello" });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
