import { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { getTodosRequest } from "./actions/todos";
import Form from "./components/Form";

const App = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [todoTextCreate, setTodoTextCreate] = useState("");
  const [todoTextEdit, setTodoTextEdit] = useState("");
  const [editTodo, setEditTodo] = useState({
    todoText: "",
    completed: false,
  });

  const { todos: allTodos } = useSelector((store) => store.todos);

  const handleModal = () => {
    setModalIsOpen((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEdit = (event) => {
    event.preventDefault();
  };

  const handleInput = ({ target: { value } }) => {
    if (modalIsOpen) {
      setTodoTextEdit(value);
    } else {
      setTodoTextCreate(value);
    }
  };

  useEffect(() => {
    props.getTodosRequest();
  }, []);

  return (
    <div className="app__container">
      <h1 className="heading">Global Todo</h1>
      <div className="todo__container">
        <Form handleSubmit={handleSubmit} handleInput={handleInput} />

        <ul className="todo__list">
          {allTodos.map(({ _id, todoText, completed }) => (
            <li key={_id} className={completed ? "complete" : "incomplete"}>
              <p>{todoText}</p>
              <div className="button__container">
                <button type="button">
                  <span
                    className={`material-icons ${
                      completed ? "complete" : "incomplete"
                    }`}
                  >
                    {completed ? "check_circle" : "check_circle_outline"}
                  </span>
                </button>
                <button type="button">
                  <span className="material-icons ">edit</span>
                </button>
                <button type="button">
                  <span className="material-icons">delete</span>
                </button>
              </div>
            </li>
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
            handleSubmit={handleEdit}
            handleInput={handleInput}
            icon="update"
            btnText="Update"
            label="Update Todo"
          />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  getTodosRequest,
};

export default connect(null, mapDispatchToProps)(App);
