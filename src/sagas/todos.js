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

function* getTodos() {
  const {
    data: {
      data: { todos },
    },
  } = yield call(api.fetchAllTodos);

  yield put(actions.getTodosSuccess(todos));
}

function* watchGetTodosRequest() {
  yield takeEvery(actions.Types.GET_TODOS_REQUEST, getTodos);
}

function* getTodo({ todoId }) {
  const {
    data: {
      data: { todo },
    },
  } = yield call(api.fetchSingleTodo, todoId);

  yield put(actions.getTodoSuccess(todo));
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
  } finally {
    yield put(actions.creatingTodo());
  }
}

function* watchCreateTodoRequest() {
  yield takeLatest(actions.Types.CREATE_TODO_REQUEST, createTodo);
}

function* updateTodo({ todoId, payload }) {
  const {
    data: {
      data: { todo },
    },
  } = yield call(api.updateTodo, todoId, payload);

  yield put(actions.updatedTodoSuccess(todo));
}

function* watchUpdateTodoRequest() {
  while (true) {
    const action = yield take(actions.Types.UPDATE_TODO_REQUEST);
    yield call(updateTodo, action);
  }
}

function* deleteTodo({ id }) {
  yield call(api.deleteTodo, id);

  yield put(actions.deleteTodoSuccess(id));
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
