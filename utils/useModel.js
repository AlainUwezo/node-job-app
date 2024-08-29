const tf = require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

// Charger le modèle USE une seule fois lorsque le serveur démarre
let modelPromise = use.load().then((model) => {
  console.log("USE model loaded.");
  return model;
});

// Fonction pour obtenir le modèle chargé
const getModel = async () => {
  return await modelPromise;
};

// Fonction pour calculer la similarité cosinus
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.dot(vecB).arraySync();
  const magnitudeA = Math.sqrt(vecA.dot(vecA).arraySync());
  const magnitudeB = Math.sqrt(vecB.dot(vecB).arraySync());
  return dotProduct / (magnitudeA * magnitudeB);
};

module.exports = {
  getModel,
  cosineSimilarity,
};
