import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "UDEMYFSC-Section33-world-flags",
  password: "Jonamaru@2327",
  port: 5432,
});

db.connect();

let countries = [];
let totalCountries = 0;

db.query("SELECT country_code FROM visited_countries", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    countries = res.rows.map(row => row.country_code);
    totalCountries = countries.length;
  }
  //db.end(); -> We should not end the connection here because we will be using it for further queries.
});
async function getVisitedCountries() {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    return result.rows.map(row => row.country_code);
    
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
}

app.get("/", async (req, res) => {
  //Write your code here.
  countries = await getVisitedCountries();
  totalCountries = countries.length;
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: totalCountries });
});

app.post("/add", async (req, res) => {
  const countryCode = req.body.country.trim().toUpperCase();
  try {
    
    if (countryCode && !countries.includes(countryCode)) {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
    } else {
      console.log("Country code is either empty or already exists.");
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
