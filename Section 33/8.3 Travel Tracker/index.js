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
let availableCountries = [];
let totalCountries = 0;

db.query("SELECT country_code, country_name FROM countries", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    availableCountries = res.rows;
  }
  //db.end(); -> We should not end the connection here because we will be using it for further queries.
});

async function getVisitedCountries() {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    return result.rows.map((row) => row.country_code);
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
  if (!req.body.country) {
    return res.redirect("/");
  }

  const userInput = req.body.country.trim().toUpperCase();

  const countryInfo = availableCountries.find(
    (row) =>
      row.country_code.toUpperCase() === userInput ||
      row.country_name.toUpperCase() === userInput,
  );

  try {
    if (countryInfo && !countries.includes(countryInfo.country_code)) {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryInfo.country_code],
      );

      console.log(`Added ${countryInfo.country} (${countryInfo.country_code})`);
    } else {
      console.log("Country already exists or does not exist in database.");
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
