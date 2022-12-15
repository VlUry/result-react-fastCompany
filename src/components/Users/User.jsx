import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import API from "../../api/API";
import LoadingSpinner from "../LoadingSpinner";
import Qualities from "./Qualities";

const User = () => {
  const params = useParams();
  const history = useHistory();
  const [user, setUser] = useState();

  const fetchData = async () => {
    try {
      await API.users.getById(params.userId).then((data) => setUser(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (user) {
    return (
      <div className="m-2">
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <Qualities qualities={user.qualities} />
        <h3>Встретился раз: {user.completedMeetings}</h3>
        <h3>Рейтинг: {user.rate}</h3>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/users")}
        >
          Все пользователи
        </button>
      </div>
    );
  }

  return <LoadingSpinner />;
};

export default User;
