import React, { useEffect, useState } from "react";

function EmployeeDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const candidates = JSON.parse(localStorage.getItem("candidates")) || [];

    const userProfile = candidates.find((c) => c.username === user?.username);

    setProfile(userProfile);
  }, []);

  if (!profile) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile.firstName}!</h1>

      <div className="bg-white p-4 rounded shadow w-[400px]">
        <h2 className="text-xl font-semibold mb-3">Your Profile</h2>
        <ul className="space-y-2">
          <li>
            <strong>First Name:</strong> {profile.firstName}
          </li>
          <li>
            <strong>Last Name:</strong> {profile.lastName}
          </li>
          <li>
            <strong>Username:</strong> {profile.username}
          </li>
          <li>
            <strong>Father's Name:</strong> {profile.fathersName}
          </li>
          <li>
            <strong>PAN Card:</strong> {profile.panCard}
          </li>
          <li>
            <strong>Expected Salary:</strong> ₹{profile.expectedSalary}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
