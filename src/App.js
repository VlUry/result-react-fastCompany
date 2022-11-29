import React, { useEffect, useState } from "react";
import Users from "./components/Users";
import api from "./api/API";

function App() {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [usersFetched, setUsersFetched] = useState(false);

  const fetchData = async () => {
    try {
      await api.users.fetchAll().then((data) => setUsers(data));
      setUsersFetched(true);
      await api.professions.fetchAll().then((data) => setProfessions(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {usersFetched && (
        <Users users={users} setUsers={setUsers} professions={professions} />
      )}
    </>
  );
}

export default App;
