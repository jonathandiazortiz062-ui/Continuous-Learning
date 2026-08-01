// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

const [honda, tesla] = cars;
//or you can destructure the array like this:
// const { speedStats: { topSpeed: hondaTopSpeed }, coloursByPopularity: [hondaTopColour] } = honda;
// const { speedStats: { topSpeed: teslaTopSpeed }, coloursByPopularity: [teslaTopColour] } = tesla;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{tesla.speedStats.topSpeed}</td>
      <td>{tesla.coloursByPopularity[0]}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{honda.speedStats.topSpeed}</td>
      <td>{honda.coloursByPopularity[0]}</td>
    </tr>
  </table>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
