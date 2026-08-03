import React from "react";

function TodoItem(props) {

  return (
    <li onClick={() => {
      return props.onChecked(props.id);
      }}>
      {props.text}
    </li>
  );
}

export default TodoItem;