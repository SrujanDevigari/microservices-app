const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 4000;

// In Kubernetes, this will be http://users-service.default.svc.cluster.local:3000
// For local dev, we'll point it to localhost:3000 (users-service running locally)
const USERS_SERVICE_URL =
  process.env.USERS_SERVICE_URL || "http://localhost:3000";

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "api-gateway" });
});

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get(`${USERS_SERVICE_URL}/users`);
    res.json(response.data);
  } catch (err) {
    console.error("Error calling users-service:", err.message);
    res.status(500).json({ error: "users-service unavailable" });
  }
});

app.listen(port, () => {
  console.log(`api-gateway listening on port ${port}`);
  console.log(`Using USERS_SERVICE_URL=${USERS_SERVICE_URL}`);
});
// ci trigger
// rebuild
// rebuild
// rebuild
