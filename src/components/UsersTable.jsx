import React from "react";
import User from "./User/User";
import PropTypes from "prop-types";

const UsersTable = (props) => {
  const { users, handleDelete, handleSave, onSort, currentSort } = props;

  const handleSort = (item) => {
    if (currentSort.iter === item) {
      onSort({
        ...currentSort,
        order: currentSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ iter: item, order: "asc" });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort("name")} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => handleSort("profession.name")} scope="col">
            Профессия
          </th>
          <th onClick={() => handleSort("completedMeetings")} scope="col">
            Встретился, раз
          </th>
          <th onClick={() => handleSort("rate")} scope="col">
            Оценка
          </th>
          <th onClick={() => handleSort("bookmark")} scope="col">
            Избранное
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User
            key={user._id}
            user={user}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func,
  handleSave: PropTypes.func,
  onSort: PropTypes.func,
  currentSort: PropTypes.object
};

export default UsersTable;
