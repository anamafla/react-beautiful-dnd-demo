import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";

function App() {
  const [tasks, setTasks] = useState(initialData.tasks);
  const [columns, setColumns] = useState(initialData.columns);
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);

  console.log("tasks", tasks);
  console.log("columns", columns);
  console.log("columnOrder", columnOrder);

  const onDragEnd = result => {
    // TODO: reorder our column
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnOrder.map(columnId => {
        const column = columns[columnId];
        const tasksByColumn = column.taskIds.map(taskId => tasks[taskId]);

        return (
          <Column
            key={column.id}
            column={column}
            tasksByColumn={tasksByColumn}
          />
        );
      })}
    </DragDropContext>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
