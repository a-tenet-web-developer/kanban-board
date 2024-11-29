import React from "react";
import Task from "./Task";

const Column = ({ column, addTask, updateTask, deleteTask }) => {
  const handleAddTask = () => {
    const taskTitle = prompt("Enter task title:");
    if (taskTitle) {
      addTask(column.id, { id: Date.now(), title: taskTitle });
    }
  };

  return (
    <div className="column">
      <h2>{column.title}</h2>
      {column.tasks.map((task, index) => (
        <div className="task">
          <Task
            key={task.id}
            task={task}
            columnId={column.id}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      ))}
      <button className="add-task-button" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default Column;
