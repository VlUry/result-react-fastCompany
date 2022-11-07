import { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevValue) => prevValue.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    return (
      <h3>
        {number === 0 ? (
          <span className="badge bg-danger m-1">
            Никто с тобой не тусанет :(
          </span>
        ) : (
          <span className="badge bg-primary m-1">
            {number} человек тусанет с тобой сегодня
          </span>
        )}
      </h3>
    );
  };

  const renderUsers = (usersArr) => {
    return usersArr.map((user) => {
      return (
        <tr key={user._id}>
          <th>{user.name}</th>
          <th>
            {user.qualities.map((quality) => {
              return (
                <span className={`badge bg-${quality.color} m-1`}>
                  {quality.name}
                </span>
              );
            })}
          </th>
          <th>{user.profession.name}</th>
          <th>{user.completedMeetings}</th>
          <th>{`${user.rate} / 5`}</th>
          <th>
            <button
              onClick={() => handleDelete(user._id)}
              className="btn btn-danger"
            >
              delete
            </button>
          </th>
        </tr>
      );
    });
  };

  const renderTable = (usersArr) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUsers(usersArr)}</tbody>
      </table>
    );
  };

  return (
    <>
      {renderPhrase(users.length)}
      {renderTable(users)}
    </>
  );
};

export default Users;
