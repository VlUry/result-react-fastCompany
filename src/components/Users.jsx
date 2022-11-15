import { useState } from "react";
import api from "../api/API";
import SearchStatus from "./SearchStatus";
import User from "./User/User";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userID) => {
    const updatedUsers = users.filter((user) => user._id !== userID);
    setUsers(updatedUsers);
  };

  const handleSave = (userID) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userID) {
        user.bookmark = !user.bookmark;
        return user;
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
  };

  return (
    <>
      <SearchStatus usersNum={users.length} />
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
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
      )}
    </>
  );
};

export default Users;
