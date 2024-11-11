import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { end_points } from '../../api/Api';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  let api = end_points.user;
  const [err, setErr] = useState({
    email: "",
    password: ""
  });

  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  const submitHnadler = (data) => {
    let formdata = {
      email: data.email,
      password: data.password
    };

    axiosInstance.get(api)
      .then(res => {
        console.log("axios response for successful login", res);

        const userlogin = res.data.find((user) => user.email === formdata.email);

        if (userlogin) {
          if (userlogin.password === formdata.password) {
            console.log("Login successful");
            window.sessionStorage.setItem("token",userlogin.token)
            console.log(userlogin);
            
            alert("Login successful");
            navigate("/products")
            // Redirect user after successful login
          } else {
            console.log("Incorrect password");
            setErr({ email: "", password: "Incorrect password" });
          }
        } else {
          console.log("Invalid Email");
          setErr({ email: "Invalid email", password: "" });
        }
        console.log("userlogin", userlogin);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-body">
      <form className="login-form" onSubmit={handleSubmit(submitHnadler)} noValidate>
        <h3 className="text-center mb-4 text-uppercase heading">Login</h3>
        <p className="description">Please Sign In to continue</p>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="form-ctrl"
            placeholder="Enter your email"
          />
          <p className="error-message">{errors.email?.message}</p>
          {err.email && <p className="error-message">{err.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="form-ctrl"
            placeholder="Enter your password"
            autoComplete="off"
          />
          <p className="error-message">{errors.password?.message}</p>
          {err.password && <p className="error-message">{err.password}</p>}
        </div>

        <p className="form-footer">
          Don’t have an account?
          <span
            onClick={() => navigate('/register')}
            className="signup-link"
          >
            Sign-Up
          </span>
        </p>

        <button type="submit" className="btn text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
