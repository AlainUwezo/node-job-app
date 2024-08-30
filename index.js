const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const comparisonRoutes = require("./routes/comparisonRoutes");
const sendLinkRoute = require("./routes/sendTestLinkRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/api", comparisonRoutes);
app.use("/api", sendLinkRoute);
app.use("/api", testRoutes);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
