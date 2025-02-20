"use client";
import React, { useEffect } from "react";
import axios from "axios";
import DashBoard from "@/components/dashBoard";
import { baseURL } from "../constants/constants.js";
import Loader from "@/components/Loader";

export default function Home() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setUser(response.data);
          console.log("User is authenticated");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUser();
  }, []);

  return <>{user ? <DashBoard user={user} /> : <Loader />}</>;
}
