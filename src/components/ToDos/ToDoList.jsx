import React, { useState } from "react";
import ToDoCard from "./ToDoCard";
import AddToDo from "./AddToDo";
import useStore from "../../store";
import Button from "../../shared/Button";
import Spinner from "../../shared/Spinner";

const ToDoList = () => {
  const { todos, isTodosLoading } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTodoHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const renderNoTodos = () => {
    return <div className="text-center">No todos, create your first one</div>;
  };

  if (isTodosLoading) {
    return <Spinner />;
  }

  const renderTodos = (todos, parentId = null, level = 0) => {
    return todos
      .filter((todo) => todo.parent_id === parentId)
      .map((todo) => (
        <div
          style={{ marginLeft: `${level * 40}px`, marginBottom: "20px" }}
          key={todo.id}
        >
          <ToDoCard
            id={todo.id}
            title={todo.title}
            description={todo.description}
            done={todo.done}
          />
          {renderTodos(todos, todo.id, level + 1)}
        </div>
      ));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {todos.length === 0 ? (
        renderNoTodos()
      ) : (
        <div className="w-full max-w-3xl">{renderTodos(todos)}</div>
      )}
      <Button onClick={addTodoHandler} className="mt-4 md:w-1/3 w-2/3">
        Add Todo
      </Button>
      {isModalOpen && <AddToDo onClose={closeModalHandler} />}
    </div>
  );
};

export default ToDoList;
