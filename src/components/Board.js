import React from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd"; // Import DragDropContext from react-beautiful-dnd

const Board = ({ columns, setColumns, addTask, updateTask, deleteTask }) => {
  const onDragEnd = (result) => {
    // Ensure we exit if there's no destination
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    // Ensure source and destination are valid and exist
    const sourceCol = columns.find((col) => col.id === source.droppableId);
    const destCol = columns.find((col) => col.id === destination.droppableId);
  
    if (!sourceCol || !destCol) return;  // Exit if any column is missing
  
    // Handle reordering within the same column
    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = [...sourceCol.tasks];  // Create a copy of the tasks array
      const [movedTask] = reorderedTasks.splice(source.index, 1);  // Remove the task at source.index
      reorderedTasks.splice(destination.index, 0, movedTask);  // Insert the task at destination.index
  
      // Update the columns state with the reordered tasks
      setColumns((prev) =>
        prev.map((col) =>
          col.id === sourceCol.id ? { ...col, tasks: reorderedTasks } : col
        )
      );
    } else {
      // Handle moving task to a different column
      const sourceTasks = [...sourceCol.tasks];  // Copy tasks from source column
      const [movedTask] = sourceTasks.splice(source.index, 1);  // Remove the task from the source column
  
      const destTasks = [...destCol.tasks];  // Copy tasks from destination column
      destTasks.splice(destination.index, 0, movedTask);  // Insert the task at destination column
  
      // Update the columns state with the moved task
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === sourceCol.id) {
            return { ...col, tasks: sourceTasks };  // Update source column
          } else if (col.id === destCol.id) {
            return { ...col, tasks: destTasks };  // Update destination column
          }
          return col;  // Return other columns unchanged
        })
      );
    }
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}> {/* Wrap your board with DragDropContext */}
      <div className="board">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
