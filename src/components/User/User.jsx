import React from "react";
import Bookmark from "./Bookmark";
import DeleteButton from "./DeleteButton";
import Qualities from "./Qualities";
import PropTypes from "prop-types";

const User = (props) => {
  const { user, onDelete, onSave } = props;

  return (
    <tr>
      <th>{user.name}</th>
      <th>
        <Qualities qualities={user.qualities} />
      </th>
      <th>{user.profession.name}</th>
      <th>{user.completedMeetings}</th>
      <th>{`${user.rate} / 5`}</th>
      <th>
        <Bookmark status={user.bookmark} onClick={() => onSave(user._id)} />
      </th>
      <th>
        <DeleteButton onClick={() => onDelete(user._id)} />
      </th>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default User;
