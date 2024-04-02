import React, { useState } from "react";
import useStore from "../../store";
import ConfirmationModal from "../../shared/ConfirmationModal";

const ToDoCard = ({ id, title, description, done, children }) => {
  const { deleteTodo } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const deleteToDo = async () => {
    await deleteTodo(id);
    toggleModal();
  };

  return (
    <div className="group relative bg-white bg-opacity-90 rounded-lg shadow-md p-4 m-2 transition duration-200 ease-in-out transform hover:scale-101 hover:shadow-xl">
      <button
        onClick={toggleModal}
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
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{description}</p>
      <p>Status: {done ? "Done" : "Not Done"}</p>
      {children}
      {isModalOpen && (
        <ConfirmationModal
          title="Are you sure you want to delete this todo?"
          onClose={toggleModal}
          onConfirm={deleteToDo}
        />
      )}
    </div>
  );
};

export default ToDoCard;
