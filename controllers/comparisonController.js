const tf = require("@tensorflow/tfjs");
const { cosineSimilarity, getModel } = require("../utils/useModel");

const compareTexts = async (req, res) => {
  try {
    const { offerText, candidateText } = req.body;

    if (!offerText || !candidateText) {
      return res
        .status(400)
        .json({ error: "Both offerText and candidateText are required" });
    }

    const model = await getModel();

    // Convert texts to tensors using the USE model
    const [offerEmbedding, candidateEmbedding] = await Promise.all([
      model.embed([offerText]),
      model.embed([candidateText]),
    ]);

    // Convert tensors to arrays
    const offerVector = (await offerEmbedding.array())[0];
    const candidateVector = (await candidateEmbedding.array())[0];

    // Calculate cosine similarity
    const similarity = cosineSimilarity(
      tf.tensor(offerVector),
      tf.tensor(candidateVector)
    );

    // Convert similarity to a score out of 100
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
