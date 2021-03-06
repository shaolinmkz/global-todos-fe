import { Types } from "../actions/todos";

const INITIAL_STATE = {
  todos: [],
  todo: null,
  pageLoading: true,
  updateLoading: false,
  isCreating: false,
  todoTextCreate: '',
  todoTextEdit: '',
  editId: '',
  modalIsOpen: false,
};

const todoReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.TYPING_TODO_CREATE:
      return {
        ...state,
        todoTextCreate: payload,
      };
    case Types.TYPING_TODO_EDIT:
      return {
        ...state,
        todoTextEdit: payload,
      };
    case Types.GET_TODO_EDIT_ID:
      return {
        ...state,
        editId: payload,
      };
    case Types.OPEN_CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: payload,
      };
    case Types.GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
        pageLoading: false,
      };
    case Types.GET_TODO_SUCCESS:
      return {
        ...state,
        todo: payload,
      };
    case Types.CREATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [payload, ...state.todos],
      };
    case Types.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload._id ? payload : todo
        ),
      };
    case Types.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(({ _id }) => _id !== payload.id),
      };
    case Types.CREATING_TODO:
      return {
        ...state,
        isCreating: !state.isCreating,
      };
    case Types.UPDATE_LOADING:
      return {
        ...state,
        updateLoading: !state.updateLoading,
      };
    default:
      return state;
  }
};

export default todoReducer;
