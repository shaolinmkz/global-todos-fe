import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTodosRequest,
  createTodoRequest,
  updateTodoRequest,
  deleteTodoRequest,
  Types,
} from "./actions/todos";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = () => {
  const dispatch = useDispatch()

  const {
    todos: allTodos,
    isCreating,
    pageLoading,
    updateLoading,
    todoTextCreate,
    todoTextEdit,
    editId,
    modalIsOpen,
  } = useSelector((store) => store.todos);

  const handleModal = (value) => {
    dispatch({ type: Types.OPEN_CLOSE_MODAL, payload: value });

    if(!value) {
      dispatch({ type: Types.TYPING_TODO_EDIT, payload: '' });
      dispatch({ type: Types.GET_TODO_EDIT_ID, payload: '' });
    }
  };

  const handleCreateTodo = (event) => {
    event.preventDefault();

    dispatch(createTodoRequest({
      todoText: todoTextCreate,
    }))
  };

  const handleEditTodo = (event) => {
    event.preventDefault();

   dispatch(updateTodoRequest(editId, { todoText: todoTextEdit }))
  };

  const handleInput = ({ target: { value } }) => {
    if (modalIsOpen) {
      dispatch({ type: Types.TYPING_TODO_EDIT, payload: value });
    } else {
      dispatch({ type: Types.TYPING_TODO_CREATE, payload: value });
    }
  };

  const handleActions = (
    { target: { id } },
    { todoId, completed, todoText }
  ) => {
    if (id === "mark__complete") {
      dispatch(updateTodoRequest(todoId, { completed: !completed }))
    } else if (id === "edit") {
      handleModal(true);
      dispatch({ type: Types.TYPING_TODO_EDIT, payload: todoText });
      dispatch({ type: Types.GET_TODO_EDIT_ID, payload: todoId });
    } else if (id === "delete") {
      dispatch(deleteTodoRequest(todoId))
    }
  };

  useEffect(() => {
    dispatch(getTodosRequest())
  }, [dispatch]);


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

        <ul className="todo__list" style={{
          maxHeight: window.innerHeight  - (0.3676767 * window.innerHeight)
        }}>
          {!pageLoading && allTodos.map(({ _id, todoText, completed }) => (
            <TodoList
              key={_id}
              id={_id}
              completed={completed}
              todoText={todoText}
              handleActions={handleActions}
            />
          ))}

          {!pageLoading && !allTodos.length && (
            <div className="no__todos">
              <div>
                <span className="material-icons">description</span>
                <p>NO TODOS</p>
              </div>
            </div>
          )}

          {pageLoading && (
            <div className="loader">
              <div>
                <p>Loading...</p>
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
              handleModal(false);
            }
          }}
        >
          <Form
            handleSubmit={handleEditTodo}
            handleInput={handleInput}
            loading={updateLoading}
            icon="update"
            btnText="Update"
            label="Update Todo"
            inputValue={todoTextEdit}
            className="edit-form"
          />
        </div>
      )}
    </div>
  );
};



export default App;
