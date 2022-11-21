import React from "react";

const DeleteButton = (props) => {
  const { onClick } = props;

  return (
    <button className="btn btn-danger" onClick={onClick}>
      Удалить
    </button>
  );
};

export default DeleteButton;
