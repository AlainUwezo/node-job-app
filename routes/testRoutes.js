// routes/testRoutes.js
const express = require("express");
const { accessTest } = require("../controllers/testController");
const router = express.Router();

router.get("/test/:jobId", accessTest);

module.exports = router;
