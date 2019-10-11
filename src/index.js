import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";

function App() {
  const [tasks, setTasks] = useState(initialData.tasks);
  const [columns, setColumns] = useState(initialData.columns);
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);

  // console.log("tasks", tasks);
  // console.log("columns", columns);
  // console.log("columnOrder", columnOrder);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    console.log("destination", destination);
    console.log("source", source);
    console.log("draggableId", draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    setColumns(prevState => ({ prevState, [newColumn.id]: newColumn }));
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
