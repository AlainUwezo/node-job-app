// mailer.js
const nodemailer = require("nodemailer");

// Créez un transporteur de mails en utilisant les informations de votre service de messagerie
const transporter = nodemailer.createTransport({
  service: "gmail", // Vous pouvez utiliser un autre service si nécessaire
  auth: {
    user: "20au004@esisalama.org", // Remplacez par votre e-mail
    pass: "tmgc vhjx bgak jkmx", // Remplacez par votre mot de passe
  },
});

module.exports = transporter;
