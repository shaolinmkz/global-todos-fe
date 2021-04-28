import { string, func, bool } from "prop-types";

const Form = ({
  className,
  inputValue,
  handleSubmit,
  handleInput,
  icon,
  btnText,
  label,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} className={className}>
      <label>{label}</label>
      <input
        type="text"
        name="todoText"
        onChange={handleInput}
        placeholder="Enter todo"
        required
        value={inputValue}
      />
      <button type="submit" className="add__todo" disabled={[loading, !`${inputValue}`.replace(/\s+/gm, "")].includes(true)}>
        {!loading && <span className="material-icons">{icon}</span>}
        {loading ? "SAVING..." : btnText}
      </button>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: func.isRequired,
  handleInput: func.isRequired,
  inputValue: string,
  loading: bool,
  icon: string,
  btnText: string,
  label: string,
  className: string,
};

Form.defaultProps = {
  icon: "add_circle",
  btnText: "ADD",
  label: "Create Todo",
  inputValue: "",
  className: "create-form",
  loading: false,
};

export default Form;
