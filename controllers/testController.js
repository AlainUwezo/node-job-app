// controllers/testController.js
const { hasToken, getTokenData } = require("../config/tokenStore");

const accessTest = (req, res) => {
  console.log("Befor token", req);
  const { token } = req.query;

  console.log("Token", token);

  if (!token || !hasToken(token)) {
    return res.status(403).send("Access denied or invalid token");
  }

  const tokenData = getTokenData(token);

  console.log("Token Data", tokenData);

  // Vérifiez si le token a expiré
  if (new Date() > new Date(tokenData.expirationDate)) {
    return res.status(403).send("Token expired");
  }

  // Rendre le test accessible ici
  // Assurez-vous que ces données correspondent à ce que vous attendez
  res.status(200).json({
    jobTitle: tokenData.jobTitle || "Titre du Test",
    username: tokenData.username || "",
    email: tokenData.email || "",
    offerId: tokenData.offerId || "",
    description: tokenData.description || "Description du Test",
    date: tokenData.date || new Date().toISOString(),
    applicationId: tokenData.applicationId || "",
  });
};

module.exports = { accessTest };
