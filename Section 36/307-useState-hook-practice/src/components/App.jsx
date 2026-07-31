import React from "react";

function App() {
let time = new Date().toLocaleTimeString();
function sayHi() {
  setCurrentTime(new Date().toLocaleTimeString());
}
setInterval(sayHi, 1000);

const [currentTime, setCurrentTime] = React.useState(time);
  return (
    <div className="container">
      <h1>{currentTime}</h1>
      <button onClick = {() => setCurrentTime( new Date().toLocaleTimeString())}>Get Time</button>
    </div>
  );
}

export default App;
