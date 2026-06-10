import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { lettersInName: 0 });
});

app.post("/submit", (req, res) => {

  const lettersInNameSubmit= req.body.fName.length + req.body.lName.length;
  res.render("index.ejs", { lettersInName: lettersInNameSubmit }); 
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
