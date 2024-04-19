import React from "react";
import {useNavigate} from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from "yup";
import './SignUp.css'

const SignUp = () => {
    const navigate= useNavigate()

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
    },
    validationSchema: formSchema,
    onSubmit: () => navigate('/login'),
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>

        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          onChange={formik.handleChange}
        />
        <label htmlFor="confirm-password">confirm password</label>
        <input
          id="confirm-password"
          name="password"
          onChange={formik.handleChange}
        />
        <button type="submit" className="btn">Submit</button>
      </form>
      </div>
      )}

export default SignUp