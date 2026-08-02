import React, { useState } from "react";
import UserInfo from "./UserInfo";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  const [isInfoSubmitted, setIsInfoSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setContact(prevContact => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevContact.lName,
          email: prevContact.email
        };
      } else if (name === "lName") {
        return {
          fName: prevContact.fName,
          lName: value,
          email: prevContact.email
        };
      } else if (name === "email") {
        return {
          fName: prevContact.fName,
          lName: prevContact.lName,
          email: value
        };
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsInfoSubmitted(true);
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form onSubmit={handleSubmit}>
        <input name="fName" placeholder="First Name" onChange={handleChange} value={contact.fName}/>
        <input name="lName" placeholder="Last Name" onChange={handleChange} value={contact.lName}/>
        <input name="email" placeholder="Email" onChange={handleChange} value={contact.email}/>
        <button type="submit">Submit</button>
      </form>
      <UserInfo contact={contact} isInfoSubmitted={isInfoSubmitted} />
    </div>
  );
}

export default App;
