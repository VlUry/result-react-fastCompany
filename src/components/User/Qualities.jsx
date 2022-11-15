const Qualities = (props) => {
  const { qualities } = props;

  return (
    <>
      {qualities.map((quality, index) => (
        <span key={index} className={`badge bg-${quality.color} m-1`}>
          {quality.name}
        </span>
      ))}
    </>
  );
};

export default Qualities;
