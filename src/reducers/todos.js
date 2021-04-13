import { Types } from "../actions/todos";

const INITIAL_STATE = {
  todos: [],
  todo: null,
};

const todoReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
      };
    case Types.GET_TODO_SUCCESS:
      return {
        ...state,
        todo: payload,
      };
    case Types.CREATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [payload, ...state.users],
      };
    case Types.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(todo => todo._id === payload._id ? payload : todo),
      };
    case Types.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(({ _id }) => _id !== payload._id),
      };
    default:
      return state;
  }
};

export default todoReducer;
