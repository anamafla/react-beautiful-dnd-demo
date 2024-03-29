const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Learn react-beautiful-dnd" },
    "task-2": { id: "task-2", content: "Make a demo" },
    "task-3": {
      id: "task-3",
      content: "Implement react-beautiful-dnd in my project"
    },
    "task-4": {
      id: "task-4",
      content: "Share with the world"
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  // facilitate reordering of the columns

  columnOrder: ["column-1", "column-2", "column-3"]
};

export default initialData;
