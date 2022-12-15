import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./Bookmark";
import DeleteButton from "./DeleteButton";
import Qualities from "./Qualities";
import Table from "../Table/Table";
import { Link } from "react-router-dom";

const UsersTable = (props) => {
  const { users, handleSort, selectedSort, handleSave, handleDelete } = props;

  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => (
        <Link to={`/users/${user._id}`}>
          <h5>{user.name}</h5>
        </Link>
      )
    },
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

  return <Table {...{ handleSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func,
  handleSave: PropTypes.func,
  handleSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
