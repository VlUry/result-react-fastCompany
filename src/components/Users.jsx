import React, { useEffect, useState } from "react";
import api from "../api/API";
import paginate from "../utils/paginate";
import Pagination from "./Pagination";
import SearchStatus from "./SearchStatus";
import User from "./User/User";
import GroupList from "./GroupList";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;
  const selectedUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users;
  const count = selectedUsers.length;
  const userCrop = paginate(selectedUsers, currentPage, pageSize);

  useEffect(() => {
    api.professions().then((data) => setProfessions(data));
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

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

  const handleProfessionSelecet = (item) => {
    if (currentPage > 1) setCurrentPage(1);
    setSelectedProf(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            selectedItem={selectedProf}
            onItemSelect={handleProfessionSelecet}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить фильтр
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus usersNum={count} />
        {count > 0 && (
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
              {userCrop.map((user) => (
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
