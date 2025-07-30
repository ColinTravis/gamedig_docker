import express from "express";
import { GameDig } from "gamedig";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/query", async (req, res) => {
  const { type, host, port } = req.query;

  if (!type || !host) {
    return res
      .status(400)
      .json({ error: "Missing required query parameters: type, host" });
  }
  try {
    const state = await GameDig.query({
      type: type,
      host: host,
      port: port,
      socketTimeout: 2000,
      attemptTimeout: 2000,
    });
    res.json({ ...state, status: "online" });
  } catch (error) {
      res.json({ status:"offline", error: "Failed to query game server", details: error.message });
      console.error("Error querying game server:", error);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Gamedig Server is running on http://localhost:${PORT}`);
});
