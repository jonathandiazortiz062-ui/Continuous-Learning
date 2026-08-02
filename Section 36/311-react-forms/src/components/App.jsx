import React from "react";

function App() {

const [name, setName] = React.useState("");
const [submittedName, setSubmittedName] = React.useState("");

function handleSubmit(event) {
  setSubmittedName(name);
  event.preventDefault();
  
}
  return (
    <div className="container">
      <h1>Hello {submittedName}</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="What's your name?" value={name} onChange={(event)=>setName(event.target.value)}/>
      <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default App;

