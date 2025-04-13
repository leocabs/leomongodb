// /frontend/src/SignUp.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://leomongodb.vercel.app/api/users/register', formData);
      alert('Account created successfully');
      console.log(response.data);
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
    }
  };
  useEffect(() => {
    // Fetch users when the component is mounted
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://leomongodb.vercel.app/api/users/register/api/users');
        setUsers(response.data);  // Store the list of users in the state
      } catch (error) {
        setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to fetch users only once when the component mounts
  return (
    <>
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
      {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="username" className="block">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">Sign Up</button>
      </form>
    </div>
    <div className="max-w-2xl mx-auto mt-8">
    <h2 className="text-2xl font-bold text-center mb-4">All Users</h2>
    {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
    <ul className="space-y-4">
      {users.length > 0 ? (
        users.map((user) => (
          <li key={user._id} className="border p-4 rounded-md shadow-md">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </li>
        ))
      ) : (
        <p>No users found</p>
      )}
    </ul>
  </div>
    </>
  );
};

export default App;
