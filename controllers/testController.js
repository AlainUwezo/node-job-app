// controllers/testController.js
const { hasToken, getTokenData } = require("../config/tokenStore");

const accessTest = (req, res) => {
  const { token } = req.query;

  if (!token || !hasToken(token)) {
    return res.status(403).send("Access denied or invalid token");
  }

  const tokenData = getTokenData(token);

  // Vérifiez si le token a expiré
  if (new Date() > new Date(tokenData.expirationDate)) {
    return res.status(403).send("Token expired");
  }

  // Rendre le test accessible ici
  // Assurez-vous que ces données correspondent à ce que vous attendez
  res.status(200).json({
    jobTitle: tokenData.jobTitle || "Titre du Test",
    username: tokenData.username || "",
    email: tokenData.email,
    description: tokenData.description || "Description du Test",
    date: tokenData.date || new Date().toISOString(),
  });
};

module.exports = { accessTest };
