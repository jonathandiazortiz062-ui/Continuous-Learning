import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Jonamaru@2327",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const existingUsers = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (existingUsers.rows.length > 0) {
    // User already exists, redirect to register page
    console.log("User already exists. Redirecting to register page.");
    return res.redirect("/register");
  } else {
    try {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
        email,
        password,
      ]);
      res.render("secrets.ejs");
    } catch (err) {
      console.error("Error registering user:", err);
      res.redirect("/register");
    }
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password],
    );
    const dbPassword = result.rows[0]?.password;
    if (result.rows.length > 0 && dbPassword === password) {
      res.render("secrets.ejs");
    } else {
      console.log("Invalid password credentials. Redirecting to login page.");
      res.redirect("/login");
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
