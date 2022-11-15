import Bookmark from "./Bookmark";
import DeleteButton from "./DeleteButton";
import Qualities from "./Qualities";

const User = (props) => {
  const { user, onDelete, onSave } = props;

  const deleteUser = () => {
    onDelete(user._id);
  };

  const saveUser = () => {
    onSave(user._id);
  };

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
        <Bookmark status={user.bookmark} onClick={saveUser} />
      </th>
      <th>
        <DeleteButton onClick={deleteUser} />
      </th>
    </tr>
  );
};

export default User;
