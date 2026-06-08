import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
var bandName = "";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(combineStreetAndPet);
const port = 3000;

//requests:
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Custom function to display the result of the post method:

function combineStreetAndPet(req, res, next) {
  bandName = req.body["street"] + req.body["pet"];
  next();
}
