// config/tokenStore.js

// Simple in-memory store (use a database for production)
const tokenStore = new Map();

const saveTokenToDatabase = (
  email,
  username,
  token,
  expirationDate,
  jobTitle,
  offerId,
  applicationId
) => {
  console.log("OFFER ID " + offerId + " app id " + applicationId);
  tokenStore.set(token, {
    email,
    username,
    expirationDate,
    jobTitle,
    offerId,
    applicationId,
  });
};

const getTokenData = (token) => {
  return tokenStore.get(token);
};

const hasToken = (token) => {
  return tokenStore.has(token);
};

module.exports = {
  saveTokenToDatabase,
  getTokenData,
  hasToken,
};
