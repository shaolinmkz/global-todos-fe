import { all } from "redux-saga/effects";
import todosSagas from "./todos";

export default function* rootSaga() {
	yield all([...todosSagas]);
}
