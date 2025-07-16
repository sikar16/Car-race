import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const SignupForm = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  
 const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    <div className="p-5 w-[400px] flex items-center rounded-lg justify-center  shadow-xl  min-w-1700px min-h-500px ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg  w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-sm  font-medium">First Name</label>
          <input
            type="text"
            name="fname"
            value={form.fname}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lname"
            value={form.lname}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <span onClick={togglePassword} className="absolute right-3 top-9 text-gray-600 cursor-pointer">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
             </span>

        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-black-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;