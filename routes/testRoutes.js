// routes/testRoutes.js
const express = require("express");
const { accessTest } = require("../controllers/testController");
const router = express.Router();
const jwt = require("jsonwebtoken");

console.log("Get job router");
router.get("/api/test/:jobId", accessTest);

const apiPrefix = "/api";

const signInUserData = [
  {
    accountUserName: "user1",
    password: "password123",
    avatar: "avatar1.jpg",
    userName: "User One",
    email: "user1@example.com",
    authority: "admin",
  },
];

const SECRET_KEY = "QwTp453fkflsnc31567ls";

router.post(`${apiPrefix}/sign-in`, (req, res) => {
  const { userName, password } = req.body;

  const user = signInUserData.find(
    (u) => u.accountUserName === userName && u.password === password
  );

  console.log("User", req.body);

  if (user) {
    const { avatar, userName, email, authority } = user;

    const token = jwt.sign({ userName, email, authority }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({
      user: { avatar, userName, email, authority },
      token,
    });
  }

  return res.status(401).json({
    message: "Email ou mot de passe invalide!",
  });
});

module.exports = router;
