import React from "react";
import Bookmark from "./Bookmark";
import DeleteButton from "./DeleteButton";
import Qualities from "./Qualities";
import PropTypes from "prop-types";

const User = (props) => {
  const { user, onDelete, onSave } = props;

  return (
    <tr>
      <td>{user.name}</td>
      <td>
        <Qualities qualities={user.qualities} />
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{`${user.rate} / 5`}</td>
      <td>
        <Bookmark status={user.bookmark} onClick={() => onSave(user._id)} />
      </td>
      <td>
        <DeleteButton onClick={() => onDelete(user._id)} />
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default User;
