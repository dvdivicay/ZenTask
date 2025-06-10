import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const text = await res.text();
    console.log('Response status:', res.status);
    console.log('Response body:', text);

    if (!res.ok) {
      throw new Error(text);
    }

    alert(text);
  } catch (err) {
    console.error('Signup error:', err);
    alert('Error signing up: ' + err.message);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
      <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
