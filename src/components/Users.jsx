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
            {`${number} ${getUsersPhrase(number)} тусанет с тобой сегодня`}
          </span>
        )}
      </h3>
    );
  };

  const getUsersPhrase = (number) => {
    return (number >= 2 && number <= 4) ||
      (number > 21 &&
        ((number - 2) % 10 === 0 ||
          (number - 3) % 10 === 0 ||
          (number - 4) % 10 === 0))
      ? "человека"
      : "человек";
  };

  const renderUsersTable = (usersArr) => {
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
        <tbody>{renderUsersList(usersArr)}</tbody>
      </table>
    );
  };

  const renderUsersList = (usersArr) => {
    return usersArr.map((user) => {
      return (
        <tr key={user._id}>
          <th>{user.name}</th>
          <th>{renderUserQualities(user.qualities)}</th>
          <th>{user.profession.name}</th>
          <th>{user.completedMeetings}</th>
          <th>{`${user.rate} / 5`}</th>
          <th>{renderDeleteButton(user._id)}</th>
        </tr>
      );
    });
  };

  const renderUserQualities = (qualitiesArr) => {
    return qualitiesArr.map((quality, index) => {
      return (
        <span key={index} className={`badge bg-${quality.color} m-1`}>
          {quality.name}
        </span>
      );
    });
  };

  const renderDeleteButton = (userID) => {
    return (
      <button className="btn btn-danger" onClick={() => handleDelete(userID)}>
        delete
      </button>
    );
  };

  return (
    <>
      {renderPhrase(users.length)}
      {renderUsersTable(users)}
    </>
  );
};

export default Users;
