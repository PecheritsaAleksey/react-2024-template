import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../shared/Button";
import useStore from "../../store";
import { ToastContainer, toast } from "react-toastify";

const AddToDo = ({ onClose, parentTodoId }) => {
  const { addTodo } = useStore();
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      data.parent_id = parentTodoId;
      await addTodo(data);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-10"
    >
      <div
        onClick={stopPropagation}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New ToDo
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
              })}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <Button type="submit" className="w-1/3">
              Add Todo
            </Button>
            <Button
              onClick={onClose}
              className="w-1/3 bg-red-600 hover:bg-red-700 "
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddToDo;
