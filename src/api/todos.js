import axios from "axios";

// Dev => "http://localhost:4040/api/v1"
axios.defaults.baseURL = "https://global-todo.herokuapp.com/api/v1";

/**
 * @description gets all todos
 * @function fetchAllTodos
 * @returns {Promise} - returns a promise
 */
export const fetchAllTodos = () => axios.get("/todos");

/**
 * @description create a todo
 * @function createTodo
 * @param {object} payload - request object
 * @returns {Promise} - returns a promise
 */
export const createTodo = (payload) => axios.post("/todos", payload);

/**
 * @description fetch a todo
 * @function fetchSingleTodo
 * @param {string} todoId - todo id
 * @returns {Promise} - returns a promise
 */
export const fetchSingleTodo = (todoId) => axios.get(`/todos/${todoId}`);

/**
 * @description update a todo
 * @function updateTodo
 * @param {string} todoId - todo id
 * @param {object} payload - request object
 * @returns {Promise} - returns a promise
 */
export const updateTodo = (todoId, payload) => axios.put(`/todos/${todoId}`, payload);

/**
 * @description delete a todo
 * @function deleteTodo
 * @param {string} todoId - todo id
 * @returns {Promise} - returns a promise
 */
export const deleteTodo = (todoId) => axios.delete(`/todos/${todoId}`);
