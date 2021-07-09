//any configurations of my express server
import express from "express";
import cors from "cors";
import path from "path";
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../public"))); // <-- location of public dir

export default app;
