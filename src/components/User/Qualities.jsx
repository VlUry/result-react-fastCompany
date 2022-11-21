import React from "react";

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

export default Qualities;
