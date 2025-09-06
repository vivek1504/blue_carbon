import cors from "cors";
import express from "express";
import nccrRouter from "./routes/nccr.js";
import projectRouter from "./routes/project.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/project", projectRouter)
app.use("/nccr", nccrRouter)

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
