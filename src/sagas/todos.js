import {
  call,
  takeEvery,
  // take,
  // takeLatest,
  fork,
  put,
} from "redux-saga/effects";
// import cogoToast from 'cogo-toast';
import * as actions from "../actions/todos";
import * as api from "../api/todos";

function* getTodos() {
    const {
      data: { data: { todos } },
    } = yield call(api.fetchAllTodos);

    yield put(
      actions.getTodoSuccess({
        todos,
      })
    );
}

function* watchGetTodosRequest() {
  yield takeEvery(actions.Types.GET_TODOS_REQUEST, getTodos);
}


const togoSagas = [
  fork(watchGetTodosRequest),
];

export default togoSagas;
