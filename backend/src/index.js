import express from "express";
import notesRouter from "./notes.js";
import cors from "cors";
const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());
app.use("/tasks", notesRouter);

app.listen(port, () => {
  console.log(`Sever is running at port ${port}`);
});
