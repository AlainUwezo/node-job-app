const axios = require("axios");
const tf = require("@tensorflow/tfjs");
const { cosineSimilarity, getModel } = require("../utils/useModel");

const translateText = async (text, targetLanguage = "en") => {
  try {
    const response = await axios.get(
      "https://translate.googleapis.com/translate_a/single",
      {
        params: {
          client: "gtx",
          sl: "auto",
          tl: targetLanguage,
          dt: "t",
          q: text,
        },
      }
    );

    return response.data[0][0][0];
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Translation failed");
  }
};

const compareTexts = async (req, res) => {
  try {
    const { offerText, candidateText } = req.body;

    if (!offerText || !candidateText) {
      return res
        .status(400)
        .json({ error: "Both offerText and candidateText are required" });
    }

    const [offerTextEn, candidateTextEn] = await Promise.all([
      translateText(offerText, "en"),
      translateText(candidateText, "en"),
    ]);

    const model = await getModel();

    // Convertir les textes en tenseurs
    const [offerEmbedding, candidateEmbedding] = await Promise.all([
      model.embed([offerTextEn]),
      model.embed([candidateTextEn]),
    ]);

    // Convertir les tenseurs en tableaux
    const offerVector = (await offerEmbedding.array())[0];
    const candidateVector = (await candidateEmbedding.array())[0];

    // Calculer la similarité cosinus
    const similarity = cosineSimilarity(
      tf.tensor(offerVector),
      tf.tensor(candidateVector)
    );

    // Convertir la similarité en un score sur 100
    const score = ((similarity + 1) / 2) * 100;

    res.json({ similarity: score });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

module.exports = {
  compareTexts,
};
