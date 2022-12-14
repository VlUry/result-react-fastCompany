import React from "react";
import PropTypes from "prop-types";

const SearchStatus = (props) => {
  const { usersNum } = props;

  const getUsersPhrase = (number) => {
    return (number > 1 && number < 5) ||
      ((number - 21) % 10 > 0 &&
        ((number - 2) % 10 === 0 ||
          (number - 3) % 10 === 0 ||
          (number - 4) % 10 === 0))
      ? "человека тусанут"
      : "человек тусанет";
  };

  return (
    <h3>
      {usersNum === 0 ? (
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      ) : (
        <span className="badge bg-primary">
          {`${usersNum} ${getUsersPhrase(usersNum)} с тобой сегодня`}
        </span>
      )}
    </h3>
  );
};

SearchStatus.propTypes = {
  usersNum: PropTypes.number.isRequired
};

export default SearchStatus;
