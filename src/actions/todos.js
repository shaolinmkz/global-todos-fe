export const Types = {
  GET_TODOS_REQUEST: 'todo/get_todos_request',
  GET_TODO_REQUEST: 'todo/get_todo_request',
  CREATE_TODO_SUCCESS: 'todo/create_todo_success',
  UPDATE_TODO_SUCCESS: 'todo/update_todo_success',
  DELETE_TODO_SUCCESS: 'todo/delete_todo_success',
  GET_TODOS_SUCCESS: 'todo/get_todos_success',
  GET_TODO_SUCCESS: 'todo/get_todo_success',
};


export const getTodosRequest = () => ({
  type: Types.GET_TODOS_REQUEST,
});

export const getTodosSuccess = ({ todos }) => ({
  type: Types.GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodoRequest = () => ({
  type: Types.GET_TODO_REQUEST,
});

export const getTodoSuccess = ({ todo }) => ({
  type: Types.GET_TODO_SUCCESS,
  payload: todo,
});
