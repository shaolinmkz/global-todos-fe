import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import {
  getTodosRequest,
  createTodoRequest,
  updateTodoRequest,
  deleteTodoRequest,
} from "./actions/todos";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoTextCreate, setTodoTextCreate] = useState("");
  const [todoTextEdit, setTodoTextEdit] = useState("");
  const [editId, setEditId] = useState('');

  const {
    todos: allTodos,
    isCreating,
  } = useSelector((store) => store.todos);

  const handleModal = () => {
    setModalIsOpen((prevState) => {
      if (prevState) {
        setTodoTextEdit("");
        setEditId("");
      }
      return !prevState;
    });
  };

  const handleCreateTodo = (event) => {
    event.preventDefault();

    props.createTodoRequest({
      todoText: todoTextCreate,
    });

    setTodoTextCreate("");
  };

  const handleEditTodo = (event) => {
    event.preventDefault();

    props.updateTodoRequest(editId, { todoText: todoTextEdit });
    handleModal();
  };

  const handleInput = ({ target: { value } }) => {
    if (modalIsOpen) {
      setTodoTextEdit(value);
    } else {
      setTodoTextCreate(value);
    }
  };

  const handleActions = (
    { target: { id } },
    { todoId, completed, todoText }
  ) => {
    if (id === "mark__complete") {
      props.updateTodoRequest(todoId, { completed: !completed });
    } else if (id === "edit") {
      handleModal();
      setTodoTextEdit(todoText);
      setEditId(todoId);
    } else if (id === "delete") {
      props.deleteTodoRequest(todoId)
    }
  };

  useEffect(() => {
    props.getTodosRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app__container">
      <h1 className="heading">Global Todo</h1>
      <div className="todo__container">
        <Form
          loading={isCreating}
          handleSubmit={handleCreateTodo}
          handleInput={handleInput}
          inputValue={todoTextCreate}
        />

        <ul className="todo__list">
          {allTodos.map(({ _id, todoText, completed }) => (
            <TodoList
              key={_id}
              id={_id}
              completed={completed}
              todoText={todoText}
              handleActions={handleActions}
            />
          ))}

          {!allTodos.length && (
            <div className="no__todos">
              <div>
                <span className="material-icons">description</span>
                <p>NO TODOS</p>
              </div>
            </div>
          )}
        </ul>
      </div>

      {modalIsOpen && (
        <div
          id="modal"
          onClick={({ target: { id } }) => {
            if (id === "modal") {
              handleModal();
            }
          }}
        >
          <Form
            handleSubmit={handleEditTodo}
            handleInput={handleInput}
            icon="update"
            btnText="Update"
            label="Update Todo"
            inputValue={todoTextEdit}
          />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  getTodosRequest,
  createTodoRequest,
  updateTodoRequest,
  deleteTodoRequest,
};

export default connect(null, mapDispatchToProps)(App);
