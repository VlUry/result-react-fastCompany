import React from "react";
import PropTypes from "prop-types";

const GroupList = (props) => {
  const { items, onItemSelect, selectedItem } = props;

  return (
    <div className="list-group">
      {Object.keys(items).map((item) => (
        <button
          key={items[item]._id}
          onClick={() => onItemSelect(items[item])}
          className={
            "list-group-item list-group-item-action" +
            (selectedItem === items[item] ? " active" : "")
          }
        >
          {items[item].name}
        </button>
      ))}
    </div>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  selectedItem: PropTypes.object
};

export default GroupList;
