import React from "react";

function UserInfo(props) {

if (!props.isInfoSubmitted) {
    return null;
  }
  return (
    <div className="user-info">
      <h1>
        Hello {props.contact.fName} {props.contact.lName}
      </h1>
      <p>{props.contact.email}</p>
    </div>
  );
}

export default UserInfo;