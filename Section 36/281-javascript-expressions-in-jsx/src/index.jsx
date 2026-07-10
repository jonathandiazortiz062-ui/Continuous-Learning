import React from "react";
import ReactDOM from "react-dom";

const name = "Nathan";
const date = new Date();
const hours = date.getHours();
const day = date.getDay();
ReactDOM.render(
  <div>
    <h1>Hello {name}!</h1>
    <p>Today is {day}.</p>
    <p>The current hour is {hours}.</p>
  </div>,
  document.getElementById("root"),
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
