import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./styles/global.css";

const App = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanbanColumns");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "todo", title: "To-Do", tasks: [] },
          { id: "inprogress", title: "In Progress", tasks: [] },
          { id: "done", title: "Done", tasks: [] },
        ];
  });

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, task) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const updateTask = (columnId, taskId, updatedTask) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
            }
          : col
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  };

  return (
    <div>
      <Board
        columns={columns}
        setColumns={setColumns}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
