import React from "react";
import User from "../User/User";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";

const UsersTable = (props) => {
  const { users, handleDelete, handleSave, handleSort, selectedSort } = props;
  const columns = {
    name: { iter: "name", name: "Имя" },
    qualities: { name: "Качества" },
    profession: { iter: "profession.name", name: "Профессия" },
    completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
    rate: { iter: "rate", name: "Рейтинг" },
    bookmark: { iter: "bookmark", name: "Избранное" },
    delete: {}
  };

  return (
    <table className="table">
      <TableHeader
        onSort={handleSort}
        selectedSort={selectedSort}
        columns={columns}
      />
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
  handleSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
