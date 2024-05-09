import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  CurrentTodo: { id: "", text: "", description: "", completed: false },
  CurrentIndex: null,
  isModalOpen: false,
  todos: [],
  loading: false,
  error: null,
};
export const postData = createAsyncThunk("todo/postTodos", async (newTodo) => {
  try {
    const response = await axios.post("http://localhost:3001/post", newTodo);
    return response.data;
  } catch (error) {
    console.error("Error fetching random number:", error);
    throw error;
  }
});
export const getTodos = createAsyncThunk("todo/fetchTodos", async () => {
  try {
    const response = await axios.get("http://localhost:3001/post");

    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});
export const updateTodos = createAsyncThunk(
  "todo/updateTodos",
  async (input) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/post/${input.id}`,
        input
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }
);
export const deleteTodos = createAsyncThunk("todo/deleteTodos", async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/post/${id}`);

    return id;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // addTodo: (state, action) => {
    //   state.todos.push(action.payload);
    // }, //it is sintex just remember it
    // removeTodo: (state, action) => {
    //   state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    // },
    editTodo: (state, action) => {
      const { index } = action.payload;
      // const todoedit = state.todos.findIndex((ind) => index === ind);
      state.CurrentIndex = index;
      state.CurrentTodo = state.todos[index];
      state.isModalOpen = true;
    },
    cloneTodo: (state, action) => {
      const id = action.payload;
      const duplicate = state.todos.findIndex((todo) => todo.id === id);

      if (duplicate !== -1) {
        const newId = nanoid();
        const TodoDuplicate = state.todos[duplicate];
        state.todos.splice(duplicate + 1, 0, {
          id: newId,
          text: TodoDuplicate.text,
          description: TodoDuplicate.description,
        });
      }
    },
    handelChange: (state, action) => {
      const { name, value } = action.payload;
      state.CurrentTodo = { ...state.CurrentTodo, [name]: value };
    },
    handelcancel: (state, action) => {
      state.CurrentIndex = null;
      state.CurrentTodo = "";
    },
    // editSave: (state, action) => {
    //   const { id, text, description } = action.payload;
    //   state.todos = state.todos.map((todo) => {
    //     if (todo.id === id) {
    //       todo.text = text;
    //       todo.description = description;

    //       state.isModalOpen = false;
    //     }
    //     return todo;
    //   });
    //   // state.CurrentTodo = "";
    //   // state.CurrentIndex = null;
    // },
    toggleModal: (state, action) => {
      state.isModalOpen = action.payload;
      if (!action.payload) {
        state.CurrentIndex = null;
        state.CurrentTodo = { text: "", description: "", id: "" };
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state
    },
    todoCompleted: (state, action) => {
      const tododone = state.todos.find((todo) => todo.id === action.payload);
      if (tododone) {
        tododone.completed = !tododone.completed;
      }
    },
  },
  extraReducers: (builder) => {
    // Handling postData pending state
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling postData fulfilled state
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload, "action.payload");
        state.todos = action.payload;
      })
      // Handling postData rejected state
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching random number:", action.error);
        state.error = null;
      })
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling postData fulfilled state
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        // state.todos = [...state.todos,action.payload]
        state.todos.push(action.payload);
      })
      // Handling postData rejected state
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching random number:", action.error);
        state.error = null;
      })
      .addCase(updateTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling postData fulfilled state
      .addCase(updateTodos.fulfilled, (state, action) => {
        state.loading = false;
        const { id, text, description } = action.payload;
        state.todos = state.todos.map((todo) => {
          if (todo.id === id) {
            todo.text = text;
            todo.description = description;

            state.isModalOpen = false;
          }
          return todo;
        });
      })
      // Handling postData rejected state
      .addCase(updateTodos.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching random number:", action.error);
        state.error = null;
      })
      .addCase(deleteTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling postData fulfilled state
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      // Handling postData rejected state
      .addCase(deleteTodos.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching random number:", action.error);
        state.error = null;
      });
  },
});
export const {
  addTodo,
  removeTodo,
  editTodo,
  editSave,
  handelChange,
  handelcancel,
  cloneTodo,
  toggleModal,
  setLoading,
  todoCompleted,
} = todoSlice.actions;
export default todoSlice.reducer;
