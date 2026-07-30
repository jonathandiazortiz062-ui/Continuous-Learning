import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";


function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojipedia.map(x => {return <Entry
      key={x.id}
      emoji={x.emoji}
      name={x.name}
      description={x.meaning}
    />} )}</dl>
    </div>
  );
}

export default App;
