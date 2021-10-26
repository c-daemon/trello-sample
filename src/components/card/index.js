import React from "react";

import "./card.css";

export default function Card(props) {
  const { task, removeTask } = props;

  const handleDrag = (event) => {
    event.dataTransfer.setData("taskId", task.id);
  };

  return (
    <article className="card" draggable="true" onDragStart={handleDrag}>
      <div className="card-header">
        <h4>{task.name}</h4>
        <button onClick={() => removeTask(task.id)}>X</button>
      </div>
      <div>{task.description}</div>
    </article>
  );
}
