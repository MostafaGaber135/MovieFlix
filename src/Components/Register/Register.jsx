import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) navigate('/');
  }, []);

  const validateName = (value) => {
    if (!value.trim()) return setNameError('Name is required');
    const regex = /^[A-Z][a-zA-Z]{2,11}$/;
    if (!regex.test(value)) {
      setNameError('Start with capital letter & 3–12 letters only');
    } else {
      setNameError('');
    }
  };

  const validateEmail = (value) => {
    if (!value.trim()) return setEmailError('Email is required');
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value) => {
    if (!value.trim()) return setPasswordError('Password is required');
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{6,}$/;
    if (!regex.test(value)) {
      setPasswordError('Must include uppercase, lowercase, number & symbol');
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    validateName(name);
    validateEmail(email);
    validatePassword(password);

    if (nameError || emailError || passwordError || !name || !email || !password) {
      toast.error('Please fix the errors');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const alreadyExists = users.some((user) => user.email === email);
    if (alreadyExists) {
      toast.error('Email already registered');
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    toast.success('Registered successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateName(e.target.value);
          }}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        />
        {nameError && <p className="text-red-400 text-sm mb-3">{nameError}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          className="w-full p-2 mb-3 rounded bg-gray-800 text-white"
        />
        {emailError && <p className="text-red-400 text-sm mb-3">{emailError}</p>}

        <div className="relative mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            className="w-full p-2 pr-10 rounded bg-gray-800 text-white"
          />
          <span
            className="absolute top-2 right-3 text-white cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {passwordError && (
          <p className="text-red-400 text-sm mb-2">{passwordError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 mt-2"
        >
          Register
        </button>

        <p className="text-white mt-4 text-center">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-red-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
