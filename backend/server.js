import "dotenv/config";
import express from "express";
import cors from "cors";
import researchRouter from "./src/routes/research.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, timestamp: new Date().toISOString() }));
app.use("/api/research", researchRouter);

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`AI Investment Research backend running on http://localhost:${PORT}`);
});
