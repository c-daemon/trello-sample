export const initialState = {
  lists: [
    {
      name: "Resource",
      id: 100,
    },
    {
      name: "ToDo",
      id: 101,
    },
    {
      name: "Doing",
      id: 102,
    },
    {
      name: "Done",
      id: 103,
    },
  ],
  tasks: [],
  currentListId: 0,
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [...state.lists, payload],
      };
    }
    case "REMOVE_LIST": {
      const filteredList = state.lists.filter((list) => list.id !== payload);
      const filteredTasks = state.tasks.filter(
        (task) => task.listId !== payload
      );
      return {
        ...state,
        lists: filteredList,
        tasks: filteredTasks,
      };
    }
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    }
    case "REMOVE_TASK": {
      const filteredTasks = state.tasks.filter((task) => task.id !== payload);
      return {
        ...state,
        tasks: filteredTasks,
      };
    }
    case "UPDATE_CURRENT_LIST_ID":
      return {
        ...state,
        currentListId: payload,
      };
    case "MOVE_TASK": {
      const { listId, taskId } = payload;
      const task = state.tasks.find((task) => task.id === taskId);
      const filterTasks = state.tasks.filter((task) => task.id !== taskId);
      const copiedTaskWithNewListId = {
        ...task,
        listId,
      };
      return {
        ...state,
        tasks: [...filterTasks, copiedTaskWithNewListId],
      };
    }
    default:
      return state;
  }
};
