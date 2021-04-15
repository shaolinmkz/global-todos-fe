import {
  call,
  takeEvery,
  take,
  takeLatest,
  fork,
  put,
} from "redux-saga/effects";
import * as actions from "../actions/todos";
import * as api from "../api/todos";
import notify from "../utils/notify";

function* getTodos() {
  try {
    const {
      data: {
        data: { todos },
      },
    } = yield call(api.fetchAllTodos);

    yield put(actions.getTodosSuccess(todos));
  } catch (error) {
    notify("error", "Error fetching todos");
  }
}

function* watchGetTodosRequest() {
  yield takeEvery(actions.Types.GET_TODOS_REQUEST, getTodos);
}

function* getTodo({ todoId }) {
  try {
    const {
      data: {
        data: { todo },
      },
    } = yield call(api.fetchSingleTodo, todoId);

    yield put(actions.getTodoSuccess(todo));
  } catch (error) {
    notify("error", "Error fetching todo");
  }
}

function* watchGetTodoRequest() {
  while (true) {
    const action = yield take(actions.Types.GET_TODO_REQUEST);
    yield call(getTodo, { todoId: action.payload });
  }
}

function* createTodo({ payload }) {
  try {
    yield put(actions.creatingTodo());
    const {
      data: {
        data: { todo },
      },
    } = yield call(api.createTodo, payload);

    yield put(actions.createTodoSuccess(todo));
    yield put({ type: actions.Types.TYPING_TODO_CREATE, payload: '' });
    notify("success", "Todo created successfully");
  } catch (error) {
    notify("error", "Error creating a todo");
  } finally {
    yield put(actions.creatingTodo());
  }
}

function* watchCreateTodoRequest() {
  yield takeLatest(actions.Types.CREATE_TODO_REQUEST, createTodo);
}

function* updateTodo({ todoId, payload }) {
  try {
    yield put(actions.updateLoading());

    const {
      data: {
        data: { todo },
      },
    } = yield call(api.updateTodo, todoId, payload);

    yield put(actions.updatedTodoSuccess(todo));
    yield put({ type: actions.Types.TYPING_TODO_EDIT, payload: '' });
    yield put({ type: actions.Types.OPEN_CLOSE_MODAL, payload: false });
    notify("success", "Todo updated successfully");
  } catch (error) {
    notify("error", "Error updating a todo");
  } finally {
    yield put(actions.updateLoading())
  }
}

function* watchUpdateTodoRequest() {
  while (true) {
    const action = yield take(actions.Types.UPDATE_TODO_REQUEST);
    yield call(updateTodo, action);
  }
}

function* deleteTodo({ id }) {
  try {
    yield call(api.deleteTodo, id);

    yield put(actions.deleteTodoSuccess(id));
    notify("success", "Todo deleted successfully");
  } catch (error) {
    notify("error", "Error deleting a todo");
  }
}

function* watchDeleteTodoRequest() {
  while (true) {
    const action = yield take(actions.Types.DELETE_TODO_REQUEST);
    yield call(deleteTodo, action.payload);
  }
}

const togoSagas = [
  fork(watchUpdateTodoRequest),
  fork(watchCreateTodoRequest),
  fork(watchGetTodosRequest),
  fork(watchGetTodoRequest),
  fork(watchDeleteTodoRequest),
];

export default togoSagas;
