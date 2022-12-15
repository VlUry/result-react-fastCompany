import React, { useEffect, useState } from "react";
import api from "../api/API";
import paginate from "../utils/paginate";
import Pagination from "../components/Pagination";
import SearchStatus from "../components/SearchStatus";
import GroupList from "../components/GroupList";
import UsersTable from "../components/User/UsersTable";
import _ from "lodash";

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();

  const fetchData = async () => {
    try {
      await api.users.fetchAll().then((data) => setUsers(Object.values(data))); // Object.values позволяет работать и с объектам, и с массивами
      await api.professions
        .fetchAll()
        .then((data) => setProfessions(Object.values(data)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedProf, setSelectedProf] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ path: "", order: "" });
  const pageSize = 3;

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
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

  if (users) {
    const handleDelete = (userID) => {
      if (userCrop.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      const updatedUsers = users.filter((user) => user._id !== userID);
      setUsers(updatedUsers);
    };

    const filtredUsers = selectedProf
      ? users.filter((user) => user.profession.name === selectedProf.name)
      : users;
    const usersCount = filtredUsers.length;

    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 m-2">
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
        <div className="d-flex flex-column m-2">
          <SearchStatus usersNum={usersCount} />
          {usersCount > 0 && (
            <UsersTable
              users={userCrop}
              handleDelete={handleDelete}
              handleSave={handleSave}
              handleSort={handleSort}
              selectedSort={sortBy}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={usersCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return <p>Загрузка...</p>;
};

export default Users;
