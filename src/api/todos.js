import axios from "axios";

export const fetchAllTodos = () => axios.get("/todos");

export const createTodo = (payload) => axios.post("/todos", payload);

export const fetchSingleTodo = (todoId) => axios.get(`/todos/${todoId}`);

export const updateTodo = (todoId, payload) => axios.put(`/todos/${todoId}`, payload)

export const deleteTodo = (todoId) => axios.delete(`/todos/${todoId}`);
