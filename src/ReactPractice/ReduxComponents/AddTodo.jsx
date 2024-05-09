import React from "react";
import Newmodal from "./Newmodal";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  editSave,
  handelChange,
  handelcancel,
} from "../features/todo/todoSlice";
const AddTodo = () => {
  const input = useSelector((state) => state.todoInput);
  const updateTodo = useSelector((state) => state.UpdateTodo);
  const dispatch = useDispatch();

  const addTodohandler = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      // Prevent adding empty todo
      return;
    } else if (updateTodo !== null) {
      // console.log("ID:",updateTodo.id)
      dispatch(editSave({ id: updateTodo.id, text: input }));
    } else {
      dispatch(addTodo(input));
    }
  };
  const handleCancel = () => {
    dispatch(handelcancel()); // Dispatch the handeclcancel action to clear input field
  };

  return (
    <div>
      <form onSubmit={addTodohandler} className="space-x-3 mt-12 ml-96">
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500
      focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 
      transition-color duration-200 ease-in-out"
          placeholder="Enter a Todo"
          value={input}
          onChange={(e) => dispatch(handelChange(e.target.value))}
        />
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6
      focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {updateTodo ? "Edit Todo" : "ADD Todo"}
        </button>

        {updateTodo && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-white bg-indigo-500 border-0 py-2 px-6
focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Cancel
          </button>
        )}
      </form>
      <div>
        {/* <Button
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          variant="primary"
          onClick={handleShow}
        >
          Add your Work
        </Button>
        <Newmodal handleClose={handleClose} show={show} /> */}
      </div>
    </div>
  );
};

export default AddTodo;
