import axios from "axios";

const api = axios.create({
  baseURL: "https://task-mate-backend-seven.vercel.app/api/v1",
  withCredentials: true,
});

export default api;
