import React, { useEffect } from "react";
import useStore from "../store";
import ToDoList from "../components/ToDos/ToDoList";

const ToDos = () => {
  const { getTodos } = useStore();

  useEffect(() => {
    getTodos();
  }, []);

  return <ToDoList />;
};

export default ToDos;
