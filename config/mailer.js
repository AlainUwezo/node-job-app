// mailer.js
const nodemailer = require("nodemailer");

// Créez un transporteur de mails en utilisant les informations de votre service de messagerie
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "20au004@esisalama.org",
    pass: "tmgc vhjx bgak jkmx",
  },
});

module.exports = transporter;
