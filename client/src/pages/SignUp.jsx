import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useSelector, useDispatch } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';

import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { toast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validating the values
    const { username, password, email } = formData;
    if (!username || !password || !email) {
      toast({
        title: 'All fields fields are mandatory !!! .',
        description:
          'Oops! Looks like you missed a few mandatory fields. Please fill them out to proceed. ',
      });
      return;
    }
    if (
      username.trim() === '' ||
      password.trim() === '' ||
      email.trim() === ''
    ) {
      toast({
        title: 'All fields fields are mandatory !!! .',
        description:
          'Oops! Looks like you missed a few mandatory fields. Please fill them out to proceed. ',
      });
      return;
    }

    if (
      username.length < 3 ||
      !email.match(/^\S+@\S+\.\S+$/) ||
      password.length !== 3
    ) {
       toast({
         title: 'All fields fields are mandatory !!! .',
         description:
           'Username must be at least 3 characters long. Password must be exactly 3 characters long.',
       });
       return
    }
    try {
      // Reusing sign in dispatch in sign up.
      dispatch(signInStart());
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        dispatch(signInFailure());
        return;
      }

      navigate('/');
      dispatch(signInSuccess());
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl text-center p-5
      font-semibold"
      >
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-r-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-r-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-r-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95
        disabled:opacity-40"
        >
          {loading ? `Loading...` : `Sign Up`}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account? </p>
        <Link to="/signin">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && `Something went wrong!!`}</p>
      <Toaster />
    </div>
  );
};

export default SignUp;
