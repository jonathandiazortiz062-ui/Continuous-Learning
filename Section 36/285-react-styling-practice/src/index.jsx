//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
import react from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    <h1 className="heading" style={{ color: getColor() }}>
        {getColor() === "red" ? "Good Morning" : getColor() === "green" ? "Good Afternoon" : "Good Evening"}
    </h1>
  </div>,
  document.getElementById("root")
);

function getColor() {
  const currentHour = new Date().getHours();
  if (currentHour >= 0 && currentHour < 12) {
    return "red"; // Morning
  } else if (currentHour >= 12 && currentHour < 18) {
    return "green"; // Afternoon
  } else {
    return "blue"; // Evening
  }
};