import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const getInpitClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  return (
    <div className={name ? "mb-4" : ""}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={getInpitClasses()}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={`bi bi-eye-${showPassword ? "slash-" : ""}fill`}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: "text"
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextField;
