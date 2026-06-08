//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(checkPassword);
const port = 3000;
var authorized = false;

//requests:
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/check", (req, res) => {
  console.log(req.body);
  if (authorized) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

//cuatom middleware functio to check the password:
function checkPassword(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    authorized = true;
  }
  next();
}
