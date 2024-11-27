import { LuLogOut } from "react-icons/lu";
import React from "react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <svg
      className="swap-off h-10 w-15 fill-current cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 20"
    >
      {!loading ? (
        <LuLogOut className=" cursor-pointer" onClick={logout} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </svg>
  );
};

export default LogoutButton;
