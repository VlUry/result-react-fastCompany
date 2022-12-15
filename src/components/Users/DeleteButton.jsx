import React from "react";
import PropTypes from "prop-types";

const DeleteButton = (props) => {
  const { onClick } = props;

  return (
    <button className="btn btn-danger" onClick={onClick}>
      Удалить
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteButton;
