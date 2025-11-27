import React from "react";
import { logout } from "../../store/userSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import Button from "../Button.jsx";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await axios.post("/api/v1/users/logout", { withCredentials: true });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always logout from client side regardless of API response
      dispatch(logout());
    }
  };

  return (
    <Button
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition cursor-pointer"
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
