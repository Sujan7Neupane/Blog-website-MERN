import { useEffect } from "react";
import "./App.css";

import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/userSlice";
import { Outlet } from "react-router";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = useState(true);

  // const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/v1/users/current-user", {
        withCredentials: true,
      });

      // console.log( user);
      const user = response?.data?.data?.user;

      if (user) {
        dispatch(login(user));
        // console.log("Current user:", user);
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [dispatch]);

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : null;
}

export default App;
