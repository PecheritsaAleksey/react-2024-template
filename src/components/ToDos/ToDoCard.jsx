import React, { useState } from "react";
import useStore from "../../store";
import ConfirmationModal from "../../shared/ConfirmationModal";
import AddToDo from "./AddToDo";

const ToDoCard = ({ id, title, description, done, children }) => {
  const { deleteTodo, updateTodo } = useStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);

  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const addChildTodoModalHandler = () => {
    setIsAddChildModalOpen(true);
  };

  const closeChildModalHandler = () => {
    setIsAddChildModalOpen(false);
  };

  const deleteToDo = async () => {
    await deleteTodo(id);
    toggleDeleteModal();
  };

  const handleStatusChange = async (e) => {
    updateTodo(id, { done: e.target.checked });
  };

  return (
    <>
      <div className="group relative bg-white bg-opacity-90 rounded-lg shadow-md p-4 m-2 transition duration-200 ease-in-out transform hover:scale-101 hover:shadow-xl flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="flex mr-12">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-6 w-6 text-green-600 rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-offset-0 focus:ring-green-500 focus:ring-opacity-50"
              checked={done}
              onChange={handleStatusChange}
            />
          </label>
        </div>
        <button
          onClick={toggleDeleteModal}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button
          onClick={addChildTodoModalHandler}
          className="absolute bottom-2 right-2 text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        {children}
      </div>
      {isDeleteModalOpen && (
        <ConfirmationModal
          title="Are you sure you want to delete this todo?"
          onClose={toggleDeleteModal}
          onConfirm={deleteToDo}
        />
      )}
      {isAddChildModalOpen && (
        <AddToDo onClose={closeChildModalHandler} parentTodoId={id} />
      )}
    </>
  );
};

export default ToDoCard;
