import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./todoList.css";
import { getTodos } from "../features/todo/todoSlice";
import { deleteTodos } from "../features/todo/todoSlice";
import Spinner from "react-bootstrap/Spinner";
import {
  removeTodo,
  editTodo,
  cloneTodo,
  todoCompleted,
} from "../features/todo/todoSlice";
const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const completed = useSelector((state) => state.completed);

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();
  const handelEdit = (index) => {
    dispatch(editTodo({ index }));
  };
  const handelCopy = (todo) => {
    dispatch(cloneTodo(todo.id));
  };
  const handeldone = (id) => {
    dispatch(todoCompleted(id));
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(getTodos());
    }, 3000);
    // return () => clearTimeout(delay);
  }, [dispatch]);
  if (!loading && todos.length === 0)
    return (
      <div className="loader">
        {" "}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (error) <div>Error: {error}</div>;
  return (
    <div className="body-list">
      <div>
        <h2 className="banner">Todos List</h2>
        <table>
          <thead>
            <tr className="w-1/3">
              <th>S.no </th>
              <th>
                Title <i className="fa-solid fa-sort "></i>
              </th>
              <th>
                Description <i className="fa-solid fa-sort"></i>
              </th>

              <th>Actions </th>
            </tr>
          </thead>
          {!todos || todos.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="4" className="msg">
                  <h3>No Todos Found</h3>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id}>
                  <td class="name ">{index + 1}</td>
                  <td
                    className={todo.completed ? "line-through" : " " && "w-1/3"}
                  >
                    {todo.text}
                  </td>
                  <td
                    className={todo.completed ? "line-through" : " " && "w-1/3"}
                  >
                    {todo.description}
                  </td>

                  <td>
                    {!completed && (
                      <>
                        <i
                          className="fa fa-pencil "
                          data-bs-toggle="tooltip"
                          title="Edit"
                          onClick={() => handelEdit(index)}
                        ></i>
                        <i
                          className="fa fa-clone"
                          data-bs-toggle="tooltip"
                          title="Copy"
                          aria-hidden="true"
                          onClick={() => handelCopy(todo)}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="tooltip"
                          title="Delete"
                          onClick={() => dispatch(deleteTodos(todo.id))}
                        ></i>
                      </>
                    )}
                    <i
                      className={
                        !todo.completed
                          ? "fa fa-check"
                          : "fa fa-check completed"
                      }
                      onClick={() => handeldone(todo.id)}
                      data-bs-toggle="tooltip"
                      title={!todo.completed ? "Mark completed" : "completed"}
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Todo;
