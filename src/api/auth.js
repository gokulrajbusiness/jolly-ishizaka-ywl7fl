export async function login(username, password) {
  if (username === "hr") {
    return loginHR(username, password); // HR validated via API
  } else {
    return loginEmployee(username, password); // Employee validated via localStorage
  }
}

async function loginHR(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid HR credentials");
    }

    const data = await response.json();
    return {
      username: data.username,
      role: data.role,
      token: data.token,
    };
  } catch (error) {
    console.error("HR login error", error);
    throw error;
  }
}

// 🔸 Employee Login - via localStorage
async function loginEmployee(username, password) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];

    const user = candidates.find(
      (c) => c.username === username && c.password === password
    );

    if (user) {
      return {
        username: user.username,
        role: "employee",
        token: "fake-jwt-token",
      };
    } else {
      throw new Error("Invalid employee credentials");
    }
  } catch (error) {
    console.error("Employee login error", error);
    throw error;
  }
}
