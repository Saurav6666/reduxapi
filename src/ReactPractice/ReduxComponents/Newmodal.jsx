import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import Todo from "./Todo";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  editSave,
  handelChange,
  handelcancel,
  toggleModal,
} from "../features/todo/todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import { postData } from "../features/todo/todoSlice";
import { updateTodos } from "../features/todo/todoSlice";
const Newmodal = () => {
  const input = useSelector((state) => state.CurrentTodo);

  const CurrentIndex = useSelector((state) => state.CurrentIndex);
  const dispatch = useDispatch();

  const handleAddTodoAsync = async (newTodo) => {
    try {
      await dispatch(postData(newTodo));
    } catch (error) {
      console.log(error);
    }
  };
  const addTodohandler = async (e) => {
    e.preventDefault();
    const { text, description } = input;
    if (CurrentIndex !== null) {
      // console.log("ID:",CurrentIndex.id)
      dispatch(updateTodos(input));
    } else {
      if (text === "" || description === "") {
        alert("All fields are required");
      } else {
        const newTodo = {
          id: nanoid(),
          text,
          description,
        };
        dispatch(postData(newTodo));

        // handleAddTodoAsync(newTodo);
      }
    }
    handleClose();
  };

  const handleCancel = () => {
    dispatch(handelcancel()); // Dispatch the handeclcancel action to clear input field
  };

  const show = useSelector((state) => state.isModalOpen);
  const handleClose = () => dispatch(toggleModal(false));
  const handleShow = () => dispatch(toggleModal(true));

  return (
    <div>
      <div className="header">
        <div className="logo">
          <h4 className="heading">TODOS</h4>
        </div>
        <div className="headerelElements">
          <Button
            className="addbutton text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            variant="primary"
            onClick={handleShow}
          >
            Create New
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {CurrentIndex !== null ? "Edit Todo" : "ADD Todo"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="text"
                placeholder="Enter Title"
                value={input ? input.text : ""}
                onChange={(e) =>
                  dispatch(
                    handelChange({ name: "text", value: e.target.value })
                  )
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={(e) =>
                  dispatch(
                    handelChange({ name: "description", value: e.target.value })
                  )
                }
                value={input ? input.description : ""}
                placeholder="Enter Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {CurrentIndex !== null && (
            <Button variant="secondary" onClick={handleCancel}>
              Clear
            </Button>
          )}
          <Button variant="primary" onClick={addTodohandler}>
            {CurrentIndex !== null ? "Update" : "ADD Todo"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Newmodal;
