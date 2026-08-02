import React from "react";

function App() {

  const [fullName, setFullName] = React.useState({
    fname: "",
    lname: ""
  });

  function handleChange(event) {
    const {name, value} = event.target;

    setFullName(prevValue => {
      if(name === "fName") {
        return {
          fname: value,
          lname: prevValue.lname
        };
      } else if(name === "lName") {
        return {
          fname: prevValue.fname,
          lname: value
        };
      }
    });
  }
  return (
    <div className="container">
      <h1>Hello {fullName.fname} {fullName.lname}</h1>
      <form>
        <input name="fName" placeholder="First Name" onChange={handleChange} value={fullName.fname}/>
        <input name="lName" placeholder="Last Name" onChange={handleChange} value={fullName.lname}/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
