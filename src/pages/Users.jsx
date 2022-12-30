import React, { useEffect, useState } from "react";
import api from "../api/API";
import paginate from "../utils/paginate";
import Pagination from "../components/Pagination";
import SearchStatus from "../components/Users/SearchStatus";
import GroupList from "../components/Users/GroupList";
import UsersTable from "../components/Users/UsersTable";
import _ from "lodash";
import LoadingSpinner from "../components/LoadingSpinner";
import TextField from "../components/TextField";

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

  const [filter, setFilter] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ path: "", order: "" });
  const pageSize = 3;

  const handleSearch = (e) => {
    clearProfessionsFilter();
    setSearch(e.target.value);
    setFilter("search");
  };

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
    setSearch("");
    if (currentPage > 1) setCurrentPage(1);
    setSelectedProf(item);
    setFilter("profession");
  };

  const clearProfessionsFilter = () => {
    setSelectedProf();
    setFilter();
  };

  if (users) {
    const handleDelete = (userID) => {
      if (userCrop.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      const updatedUsers = users.filter((user) => user._id !== userID);
      setUsers(updatedUsers);
    };

    const filteredUsers = () => {
      switch (filter) {
        case "search":
          return users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase().trim())
          );
        case "profession":
          return users.filter(
            (user) => user.profession.name === selectedProf.name
          );
        default:
          return users;
      }
    };

    const usersCount = filteredUsers().length;

    const sortedUsers = _.orderBy(
      filteredUsers(),
      [sortBy.path],
      [sortBy.order]
    );

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
            <button
              className="btn btn-secondary mt-2"
              onClick={clearProfessionsFilter}
            >
              Очистить фильтр
            </button>
          </div>
        )}
        <div className="d-flex flex-column m-2">
          <SearchStatus usersNum={usersCount} />
          <TextField
            type="text"
            placeholder="Найти..."
            value={search}
            onChange={handleSearch}
          />
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

  return <LoadingSpinner />;
};

export default Users;
