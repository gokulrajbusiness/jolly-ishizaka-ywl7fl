import React, { useState, useEffect } from "react";
import AppRoutes from "./routes";

function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const onStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppRoutes key={user?.role || "guest"} />
    </div>
  );
}

export default App;
