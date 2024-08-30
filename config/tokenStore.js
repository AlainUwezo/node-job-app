// config/tokenStore.js

// Simple in-memory store (use a database for production)
const tokenStore = new Map();

const saveTokenToDatabase = (
  email,
  username,
  token,
  expirationDate,
  jobTitle
) => {
  tokenStore.set(token, { email, username, expirationDate, jobTitle });
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
