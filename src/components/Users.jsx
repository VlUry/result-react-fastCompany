import React, { useEffect, useState } from "react";
import paginate from "../utils/paginate";
import Pagination from "./Pagination";
import SearchStatus from "./SearchStatus";
import GroupList from "./GroupList";
import PropTypes from "prop-types";
import UsersTable from "./UsersTable/UsersTable";
import _ from "lodash";

const Users = (props) => {
  const { users, professions, setUsers } = props;
  const [selectedProf, setSelectedProf] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

  const pageSize = 3;
  const filtredUsers = selectedProf
    ? users.filter((user) => user.profession.name === selectedProf.name)
    : users;
  const usersCount = filtredUsers.length;

  const handleSort = (item) => {
    setSortBy(item);
  };
  const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);

  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  useEffect(() => {
    if (userCrop.length === 0 && currentPage > 1) {
      return setCurrentPage((prev) => prev - 1);
    }
  }, [userCrop.length === 0]);

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
};

Users.propTypes = {
  users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setUsers: PropTypes.func.isRequired,
  professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Users;
