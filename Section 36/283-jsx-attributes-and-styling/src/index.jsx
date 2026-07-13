import React from "react";
import ReactDOM from "react-dom";

const images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmjrycByly0TxmKpAkqDre_LmyarAWWelRn9xfujxaw&s=10', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd957APYw2ryRQflDMzBNEFUGiKdSF-N_ac44pA2BR9A&s=10']

ReactDOM.render(
  <div>
    <h1>My Favourite Foods</h1>
    <ul>
      <li>Pizza</li>
      <li>Hamburger</li>
    </ul>
    <div>
      {images.map((image, index) => (
        <img key={index} src={image} className="images" alt={`Favorite food ${index + 1}`} />
      ))}
    </div>
  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
