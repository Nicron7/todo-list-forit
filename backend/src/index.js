import express from "express";
import notesRouter from "./notes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Sever is running at port ${port}`);
});
