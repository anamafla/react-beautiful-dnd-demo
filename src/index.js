import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialData from "./initial-data";
import Column from "./column";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [tasks, setTasks] = useState(initialData.tasks);
  const [columns, setColumns] = useState(initialData.columns);
  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);

  // console.log("tasks", tasks);
  // console.log("columns", columns);
  // console.log("columnOrder", columnOrder);

  const onDragStart = () => {
    document.body.style.color = "blue";
    document.body.style.transition = "background-color 0.2s ease";
  };

  const onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = result => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId, type } = result;

    //console.log("destination", destination);
    //console.log("source", source);
    //console.log("draggableId", draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setColumns(prevState => ({ ...prevState, [newColumn.id]: newColumn }));

      return;
    }

    //Moving from one list to another

    const starkTaskIds = Array.from(start.taskIds);
    starkTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: starkTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    setColumns(prevState => ({
      ...prevState,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    }));
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnOrder.map((columnId, index) => {
              console.log("columns:", columns);
              const column = columns[columnId];
              console.log("column:", column);
              const tasksByColumn = column.taskIds.map(taskId => tasks[taskId]);
              console.log("tasksByColumn:", tasksByColumn);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasksByColumn={tasksByColumn}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
