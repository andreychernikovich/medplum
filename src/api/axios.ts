import axios from "axios";
import { BASE_API_URL } from "@constants/environment";

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
