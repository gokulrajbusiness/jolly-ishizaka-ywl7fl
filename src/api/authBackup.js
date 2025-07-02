import axios from "axios";

const API_URL = "https://your-api-url.com"; // replace with your real API endpoint

export async function login(username, password) {
  const { data } = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return data; // e.g. { username: "john", role: "hr", token: "..." }
}
