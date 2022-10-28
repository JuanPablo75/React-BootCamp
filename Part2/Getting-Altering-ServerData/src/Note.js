import React from "react"
export const Note = ({ title, body }) => {
  //console.log({props})

  return (
    <div>
      <li>
        <h3>{title}</h3>
        <small>{body}</small>
      </li>
    </div>
  );
};
