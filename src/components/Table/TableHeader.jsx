import React from "react";
import PropTypes from "prop-types";

const TableHeader = (props) => {
  const { onSort, selectedSort, columns } = props;

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  const renderCaret = () => {
    return selectedSort.order === "asc" ? (
      <i className="bi bi-caret-up-fill"></i>
    ) : (
      <i className="bi bi-caret-down-fill"></i>
    );
  };

  const renderColumnHeader = (column) => {
    return columns[column].path === selectedSort.path ? (
      <>
        {columns[column].name} {renderCaret()}
      </>
    ) : (
      columns[column].name
    );
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={() =>
              columns[column].path && handleSort(columns[column].path)
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {renderColumnHeader(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
