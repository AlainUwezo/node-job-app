const { v4: uuidv4 } = require("uuid");
const transporter = require("../config/mailer");
const { saveTokenToDatabase } = require("../config/tokenStore"); // Importez la fonction de stockage du token

const sendLink = async (req, res) => {
  const {
    recipientEmail,
    username,
    testLink,
    jobTitle,
    expirationDate,
    companyName,
  } = req.body;

  if (
    !recipientEmail ||
    !username ||
    !testLink ||
    !jobTitle ||
    !expirationDate ||
    !companyName
  ) {
    return res
      .status(400)
      .send(
        "Recipient email, test link, job title, username, expiration date, and company name are required"
      );
  }

  // Générer un token unique
  const token = uuidv4();

  // Stocker le token
  saveTokenToDatabase(
    recipientEmail,
    username,
    token,
    expirationDate,
    jobTitle
  );

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Votre Test pour le Poste",
    html: `
      <html>
        <body>
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h4 style="color: #007bff;">Félicitations ! Vous avez passé à l'étape suivante</h4>
            
            <p>Bonjour ${username}, merci d'avoir postulé pour le poste de <strong>${jobTitle}</strong> chez <strong>${companyName}</strong>. Nous apprécions énormément le fait que vous nous considerez comme votre futur employeur.</p>
            
            <p>Nous sommes heureux de vous annoncer que vous avez été sélectionné pour passer à l'étape de test pour le poste suivant :</p>
            
            <p>Nous nous engageons à garantir un processus de recrutement équitable et transparent pour tous nos candidats. Chaque étape de notre sélection est soigneusement conçue pour valoriser les compétences, l'expérience, et le potentiel de chaque candidat, sans préjugé ni discrimination. Nous croyons fermement que la diversité et l'inclusion sont des moteurs essentiels de l'innovation et de la croissance. Ainsi, nous mettons un point d'honneur à évaluer chaque candidature de manière impartiale, en nous assurant que tous les candidats ont des chances égales de démontrer leurs aptitudes et de réussir. Nous vous encourageons à donner le meilleur de vous-même et à saisir cette opportunité pour nous montrer en quoi vous êtes unique.</p>

            <p>Nous vous encourageons vivement à participer au test dès que possible pour maximiser vos chances de succès. Ce test est une étape cruciale de notre processus de sélection, et votre performance jouera un rôle déterminant dans notre décision finale. Plus vous répondez tôt, mieux nous pourrons évaluer votre candidature. Veuillez noter que la session de test est limitée dans le temps et se fermera automatiquement à la date indiquée : <strong>${expirationDate}</strong>. Nous vous invitons donc à ne pas attendre la dernière minute pour le compléter, afin d'éviter tout imprévu. Saisissez cette opportunité pour montrer tout votre potentiel et démontrer pourquoi vous êtes le candidat idéal pour ce poste !</p>
            
            <p>Pour commencer le test, veuillez cliquer sur le lien suivant : <a href="${testLink}?token=${token}" style="color: #007bff;">Accéder au Test</a>. Nous vous encourageons vivement à débuter le test dès que possible afin de vous assurer que vous avez suffisamment de temps pour le compléter avant la date limite de <strong>${expirationDate}</strong>. Ce test constitue une étape essentielle dans notre processus de sélection, et votre réactivité nous permettra de mieux évaluer vos compétences et votre adéquation pour le poste. Nous sommes impatients de découvrir vos talents et de vous accompagner dans cette étape cruciale de votre candidature. N'hésitez pas à nous contacter si vous avez des questions ou avez besoin d'aide. Bonne chance et merci pour votre intérêt dans cette opportunité !</p>
            
            <p>Cordialement,</p>
            
            <p>L'équipe de recrutement de ${companyName}</p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Link sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};

module.exports = { sendLink };
