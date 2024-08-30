// routes/sendLinkRoute.js
const express = require("express");
const router = express.Router();
const { sendLink } = require("../controllers/sendTestLinkController");

// Route pour envoyer le lien
router.post("/send-link", sendLink);

module.exports = router;
