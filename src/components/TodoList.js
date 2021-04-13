import { string, func, bool } from "prop-types";

const TodoList = ({ id, completed, todoText, handleActions }) => {
  return (
    <li className={completed ? "complete" : "incomplete"}>
      <p>{todoText}</p>
      <div
        className="button__container"
        onClick={(event) =>
          handleActions(event, { todoId: id, completed, todoText })
        }
      >
        <button
          type="button"
          id="mark__complete"
          className={completed ? "complete" : "incomplete"}
        >
          <span
            className={`material-icons ${
              completed ? "complete" : "incomplete"
            }`}
          >
            {completed ? "check_circle" : "check_circle_outline"}
          </span>
        </button>
        <button type="button" id="edit">
          <span className="material-icons ">edit</span>
        </button>
        <button type="button" id="delete">
          <span className="material-icons">delete</span>
        </button>
      </div>
    </li>
  );
};

TodoList.propTypes = {
  id: string.isRequired,
  completed: bool.isRequired,
  todoText: string.isRequired,
  handleActions: func.isRequired,
};

export default TodoList;
