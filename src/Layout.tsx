import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";

export const Layout = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
};
