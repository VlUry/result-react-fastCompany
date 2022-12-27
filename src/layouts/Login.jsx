import React, { useState, useEffect } from "react";
import TextField from "../components/TextField";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
