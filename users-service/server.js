const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "users-service" });
});

app.listen(port, () => {
  console.log(`users-service listening on port ${port}`);
});
