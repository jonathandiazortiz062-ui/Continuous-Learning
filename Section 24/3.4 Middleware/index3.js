import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(logger);
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Custom function to log request method and url
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
