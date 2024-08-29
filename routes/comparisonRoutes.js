// Ce fichier définit les routes pour les opérations de comparaison.

const express = require("express");
const router = express.Router();
const comparisonController = require("../controllers/comparisonController");

// Route pour comparer une offre avec une candidature
router.post("/compare", comparisonController.compareTexts);

module.exports = router;
