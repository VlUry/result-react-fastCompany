import React from "react";
// import User from "../User/User";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Bookmark from "../User/Bookmark";
import DeleteButton from "../User/DeleteButton";
import Qualities from "../User/Qualities";

const UsersTable = (props) => {
  const { users, handleSort, selectedSort, handleSave, handleDelete } = props;
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Рейтинг" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark status={user.bookmark} onClick={() => handleSave(user._id)} />
      )
    },
    delete: {
      component: (user) => (
        <DeleteButton onClick={() => handleDelete(user._id)} />
      )
    }
  };

  return (
    <table className="table">
      <TableHeader
        onSort={handleSort}
        selectedSort={selectedSort}
        columns={columns}
      />
      <TableBody data={users} columns={columns} />
      {/* <tbody>
        {users.map((user) => (
          <User
            key={user._id}
            user={user}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        ))}
      </tbody> */}
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
