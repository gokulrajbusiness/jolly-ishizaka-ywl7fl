import React, { useState, useEffect } from "react";

function HRDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    fathersName: "",
    panCard: "",
    expectedSalary: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("candidates")) || [];
    setCandidates(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const updated = [
      ...candidates,
      { ...form, expectedSalary: Number(form.expectedSalary) },
    ];
    setCandidates(updated);
    localStorage.setItem("candidates", JSON.stringify(updated));
    setForm({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      fathersName: "",
      panCard: "",
      expectedSalary: "",
    });
  };

  // Get Second Highest Salary
  const getSecondHighest = () => {
    const salaries = [...new Set(candidates.map((c) => c.expectedSalary))].sort(
      (a, b) => b - a
    );
    return salaries[1] || null;
  };

  const secondHighest = getSecondHighest();
  const secondHighestCandidates = candidates.filter(
    (c) => c.expectedSalary === secondHighest
  );

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Username",
      "PAN Card",
      "Father's Name",
      "Expected Salary",
    ];

    const rows = candidates.map((c) => [
      c.firstName,
      c.lastName,
      c.username,
      c.panCard,
      c.fathersName,
      c.expectedSalary,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidates.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>

      {/* Candidate Registration */}
      <form
        onSubmit={handleRegister}
        className="bg-white p-4 rounded shadow mb-6 w-[500px]"
      >
        <h2 className="text-xl font-semibold mb-4">Register Candidate</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            name="fathersName"
            placeholder="Father's Name"
            value={form.fathersName}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            name="panCard"
            placeholder="PAN Card"
            value={form.panCard}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
          <input
            name="expectedSalary"
            placeholder="Expected Salary"
            type="number"
            value={form.expectedSalary}
            onChange={handleChange}
            required
            className="border px-2 py-1 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      {/* Export Button */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleExportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>

      {/* Employee Management */}
      <h2 className="text-xl font-semibold mb-2">Employee Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">PAN Card</th>
              <th className="border px-4 py-2">Father's Name</th>
              <th className="border px-4 py-2">Expected Salary</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{c.firstName}</td>
                <td className="border px-4 py-2">{c.lastName}</td>
                <td className="border px-4 py-2">{c.username}</td>
                <td className="border px-4 py-2">{c.panCard}</td>
                <td className="border px-4 py-2">{c.fathersName}</td>
                <td className="border px-4 py-2">{c.expectedSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Second Highest Salary */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Second Highest Expected Salary:{" "}
          {secondHighest ? `₹${secondHighest}` : "Not Available"}
        </h2>
        {secondHighestCandidates.length > 0 && (
          <ul className="list-disc ml-6">
            {secondHighestCandidates.map((c, index) => (
              <li key={index}>
                {c.firstName} {c.lastName} (Username: {c.username}, Salary: ₹
                {c.expectedSalary})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HRDashboard;
