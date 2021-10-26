import React, { useReducer, useState } from "react";
import Modal from "react-modal";
import { ListForm, TaskForm, List } from "./components";
import TasksContainer from "./containers/tasks-container";
import { initialState, reducer } from "./reducers/appReducer";
import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { lists, tasks, currentListId } = state;
  const [modalContent, setModalContent] = useState(null);

  /** AppState Handlers */
  const handleAddList = () => {
    setModalContent("ADD_LIST");
  };

  const handleAddTask = (listId) => {
    handleListId(listId);
    setModalContent("ADD_TASK");
  };

  const handleModalClose = () => {
    setModalContent(null);
  };

  const handleListSubmit = (payload) => {
    dispatch({
      type: "ADD_LIST",
      payload,
    });
    handleModalClose();
  };

  const handleTaskSubmit = (payload) => {
    dispatch({
      type: "ADD_TASK",
      payload,
    });
    handleModalClose();
  };

  const handleListId = (payload) => {
    dispatch({
      type: "UPDATE_CURRENT_LIST_ID",
      payload,
    });
  };

  const handleMoveTask = (payload) => {
    dispatch({
      type: "MOVE_TASK",
      payload,
    });
  };

  const handleRemoveList = (listId) => {
    dispatch({
      type: "REMOVE_LIST",
      payload: listId,
    });
  };

  const handleRemoveTask = (cardId) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: cardId,
    });
  };
  /** AppState Handlers Ends*/

  /** Modal Views */
  const getModalView = (modalState) => {
    switch (modalState) {
      case "ADD_LIST":
        return <ListForm onSubmit={handleListSubmit} />;
      case "ADD_TASK":
        return <TaskForm listId={currentListId} onSubmit={handleTaskSubmit} />;
      default:
        return "";
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sample Trello Board</h1>
        <div className="add-list-container">
          <button className="add-list-btn" onClick={handleAddList}>
            Add List
          </button>
        </div>
      </header>
      <main className="app-container">
        <div className="lists-wrapper">
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              removeList={handleRemoveList}
              addTask={handleAddTask}
            >
              <TasksContainer
                listId={list.id}
                tasks={tasks}
                moveTask={handleMoveTask}
                removeTask={handleRemoveTask}
              />
            </List>
          ))}
        </div>
      </main>
      <Modal
        isOpen={Boolean(modalContent)}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleModalClose}
        style={customStyles}
        overlayClassName="modal-overlay"
      >
        {getModalView(modalContent)}
      </Modal>
    </div>
  );
}

export default App;
