const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { google } = require("googleapis");
const router = express.Router();
require("dotenv").config();

// Créer un client OAuth2
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client,
});

// Route pour authentifier l'utilisateur et obtenir un token d'accès
router.get("/auth", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
  res.redirect(authUrl);
});

// URI de redirection après consentement
router.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.send(
      "Authentification réussie ! Vous pouvez maintenant planifier une réunion."
    );
  } catch (error) {
    console.error("Erreur d'authentification : ", error);
    res.status(500).send("Erreur d'authentification.");
  }
});

// Route pour planifier une réunion
router.post("/schedule-meeting", async (req, res) => {
  const {
    summary,
    description,
    location,
    startDateTime,
    endDateTime,
    attendees = [],
    timeZone = "Africa/Kinshasa",
  } = req.body;

  if (!summary || !startDateTime || !endDateTime) {
    return res.status(400).send({
      error: "Les champs summary, startDateTime et endDateTime sont requis.",
    });
  }

  const event = {
    summary,
    location,
    description,
    start: {
      dateTime: dayjs(startDateTime).toISOString(),
      timeZone,
    },
    end: {
      dateTime: dayjs(endDateTime).toISOString(),
      timeZone,
    },
    attendees: attendees.map((email) => ({ email })),
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: uuidv4(),
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    res.status(200).send({
      msg: "Réunion planifiée avec succès",
      eventLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error("Erreur lors de la planification de la réunion : ", error);
    res.status(500).send("Erreur lors de la planification de la réunion.");
  }
});

module.exports = router;
