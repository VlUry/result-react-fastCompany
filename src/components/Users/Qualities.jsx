import React from "react";
import PropTypes from "prop-types";

const Qualities = (props) => {
  const { qualities } = props;

  return (
    <>
      {qualities.map((quality) => (
        <span key={quality._id} className={`badge bg-${quality.color} m-1`}>
          {quality.name}
        </span>
      ))}
    </>
  );
};

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default Qualities;
