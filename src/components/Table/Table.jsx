import React from "react";
import PropTypes from "prop-types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ handleSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader
            onSort={handleSort}
            selectedSort={selectedSort}
            columns={columns}
          />
          <TableBody data={data} columns={columns} />
        </>
      )}
    </table>
  );
};
Table.propTypes = {
  handleSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
};

export default Table;
