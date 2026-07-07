import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

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

  try {
    const existingUsers = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    if (existingUsers.rows.length > 0) {
      // User already exists, redirect to register page
      console.log("User already exists. Redirecting to register page.");
      return res.redirect("/register");
    } else {
      //password encryption
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.redirect("/register");
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash],
          );
          console.log(result);
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    res.redirect("/register");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log("Login email:", email);
    console.log("Database query result:", result.rows);

    if (result.rows.length === 0) {
      console.log("User not found. Redirecting to login page.");
      return res.redirect("/login");
    }

    const dbPassword = result.rows[0].password;
    console.log("Database password:", dbPassword);

    const isValidPassword = await bcrypt.compare(password, dbPassword);
    if (isValidPassword) {
      return res.render("secrets.ejs");
    }

    console.log("Invalid password credentials. Redirecting to login page.");
    return res.redirect("/login");
  } catch (err) {
    console.error("Error logging in user:", err);
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
