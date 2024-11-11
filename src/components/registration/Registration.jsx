import React, { useEffect, useState } from 'react';
import { end_points } from '../../api/Api';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../api/axiosInstance';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './Registration.css'

const Registration = () => {

  let api = end_points.user;
  let navigate = useNavigate();
  let [users, setUsers] = useState([]);
  let [validationError, setValidationError] = useState({
    email: "",
    username: ""
  });

  const hooksform = useForm();
  const { register, formState, handleSubmit } = hooksform;
  const { errors } = formState;

  useEffect(() => {
    axiosInstance.get(api)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log("Error", err));
  }, [api]);

  const submitHandler = (data) => {
    const emailExists = users.some(user => user.email === data.email);
    const usernameExists = users.some(user => user.username === data.username);

    if (emailExists || usernameExists) {
      setValidationError({
        email: emailExists ? "Email already registered" : "",
        username: usernameExists ? "Username already registered" : ""
      });
      return;
    }

    let uniqueToken = uuidv4();
    let userDataWithToken = { ...data, token: uniqueToken };

    axiosInstance.post(api, userDataWithToken)
      .then(res => {
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='registration-container'>
      <form
        className="registration-form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <h3 className='text-center mb-4 text-uppercase heading'>create new account</h3>
        <p className='description'>Already registered? <span onClick={() => navigate("/login")} className="login-link">Sign In</span></p>

        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            {...register("first_name", { required: "First name is required" })}
            id='firstname'
            className="form-control"
            placeholder='Enter your First name'
            type="text"
          />
          <p className="error-message">{errors.first_name?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            {...register("last_name", { required: "Last name is required" })}
            id='lastname'
            className="form-control"
            placeholder='Enter your Last name'
            type="text"
          />
          <p className="error-message">{errors.last_name?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            id='email'
            className="form-control"
            placeholder='Enter your Email'
            type="email"
          />
          <p className="error-message">{errors.email?.message}</p>
          {validationError.email && <p className="error-message">{validationError.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            id='username'
            className="form-control"
            placeholder='Enter your Username'
            type="text"
          />
          <p className="error-message">{errors.username?.message}</p>
          {validationError.username && <p className="error-message">{validationError.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            id='password'
            className="form-control"
            placeholder='Enter your Password'
            type="password"
            autoComplete="off"
          />
          <p className="error-message">{errors.password?.message}</p>
        </div>

        <div className="form-group radio-gender">
          <label htmlFor="male">Male</label>
          <input
            {...register("gender", { required: "Gender is required" })}
            type="radio"
            name="gender"
            id="male"
            value="Male"
          />

          <label htmlFor="female">Female</label>
          <input
            {...register("gender", { required: "Gender is required" })}
            type="radio"
            name="gender"
            id="female"
            value="Female"
          />
        </div>

        <button type="submit" className="btn text-white">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
