import React from "react";
import { Card } from "../components";

import "./tasks-container.css";

export default function TasksContainer(props) {
  const { listId, tasks, moveTask, removeTask } = props;
  const filteredTask = tasks.filter((task) => task.listId === listId);
  const sortedTask = filteredTask.sort(
    (taskA, taskB) =>
      Number(new Date(taskB.createdAt)) - Number(new Date(taskA.createdAt))
  );

  const handleDrop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");
    const payload = {
      listId,
      taskId: Number(taskId),
    };
    moveTask(payload);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <section
      className="tasks-container"
      onDrop={handleDrop}
      onDragOver={allowDrop}
    >
      {sortedTask.map((task) => (
        <Card key={task.id} task={task} removeTask={removeTask} />
      ))}
    </section>
  );
}
