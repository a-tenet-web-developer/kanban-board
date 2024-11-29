import React from "react";

const Task = ({ task, columnId, updateTask, deleteTask }) => {
  const handleEdit = () => {
    const newTitle = prompt("Edit task title:", task.title);
    if (newTitle) {
      updateTask(columnId, task.id, { ...task, title: newTitle });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) {
      deleteTask(columnId, task.id);
    }
  };

  return (
    <div className="task-container">
      <p className="task-title">{task.title}</p>
      <button className="task-button" onClick={handleEdit}>Edit</button>
      <button className="task-button delete" onClick={handleDelete}>Delete</button>
    </div>
  );
};


export default Task;
