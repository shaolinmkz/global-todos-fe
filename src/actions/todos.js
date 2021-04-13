export const Types = {
  CREATING_TODO: 'todo/creating_todo',
  UPDATE_LOADING: 'todo/update_loading',
  GET_TODOS_REQUEST: 'todo/get_todos_request',
  GET_TODO_REQUEST: 'todo/get_todo_request',
  CREATE_TODO_REQUEST: 'todo/create_todo_request',
  CREATE_TODO_SUCCESS: 'todo/create_todo_success',
  UPDATE_TODO_REQUEST: 'todo/update_todo_request',
  UPDATE_TODO_SUCCESS: 'todo/update_todo_success',
  DELETE_TODO_SUCCESS: 'todo/delete_todo_success',
  DELETE_TODO_REQUEST: 'todo/delete_todo_request',
  GET_TODOS_SUCCESS: 'todo/get_todos_success',
  GET_TODO_SUCCESS: 'todo/get_todo_success',
};

export const creatingTodo = () => ({
  type: Types.CREATING_TODO,
});

export const updateLoading = () => ({
  type: Types.UPDATE_LOADING,
});

export const getTodosRequest = () => ({
  type: Types.GET_TODOS_REQUEST,
});

export const getTodosSuccess = (todos) => ({
  type: Types.GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodoRequest = () => ({
  type: Types.GET_TODO_REQUEST,
});

export const getTodoSuccess = (todo) => ({
  type: Types.GET_TODO_SUCCESS,
  payload: todo,
});

export const createTodoRequest = (todo) => ({
  type: Types.CREATE_TODO_REQUEST,
  payload: todo,
});

export const createTodoSuccess = (todo) => ({
  type: Types.CREATE_TODO_SUCCESS,
  payload: todo,
});

export const updateTodoRequest = (todoId, payload) => ({
  type: Types.UPDATE_TODO_REQUEST,
  payload,
  todoId,
});

export const updatedTodoSuccess = (todo) => ({
  type: Types.UPDATE_TODO_SUCCESS,
  payload: todo,
});

export const deleteTodoRequest = (id) => ({
  type: Types.DELETE_TODO_REQUEST,
  payload: {
    id
  },
});

export const deleteTodoSuccess = (id) => ({
  type: Types.DELETE_TODO_SUCCESS,
  payload: {
    id
  },
});
