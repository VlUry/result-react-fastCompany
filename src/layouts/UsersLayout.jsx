import React from "react";
import { useParams } from "react-router-dom";
import User from "../pages/User";
import Users from "../pages/Users";

const UsersLayout = () => {
  const params = useParams();

  if (params.userId) {
    return <User userId={params.userId} />;
  }
  return <Users />;
};

export default UsersLayout;
