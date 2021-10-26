import React from "react";

import "./list.css";

export default function List(props) {
  const { list, addTask, removeList, children } = props;
  return (
    <div className="list">
      <div className="list-header">
        <h3>{list.name}</h3>
        <button onClick={() => removeList(list.id)}>X</button>
      </div>
      {children}
      <div className="list-footer">
        <button onClick={() => addTask(list.id)}>Add Task</button>
      </div>
    </div>
  );
}
