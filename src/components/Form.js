import { string, func } from 'prop-types';

const Form = ({
  handleSubmit,
  handleInput,
  icon,
  btnText,
  label,
}) => {

  return (
    <form onSubmit={handleSubmit}>
      <label>{label}</label>
      <input type="text" name="todoText" onChange={handleInput} placeholder="Enter todo" required />
      <button type="submit" className="add__todo">
        <span className="material-icons">{icon}</span>{btnText}
      </button>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: func.isRequired,
  handleInput: func.isRequired,
  icon: string,
  btnText: string,
  label: string,
}

Form.defaultProps = {
  icon: 'add_circle',
  btnText: 'ADD',
  label: 'Create Todo',
}

export default Form;
