import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
// import "./Login.css";

const LogIn = ({ loggedIn, setLoggedIn }) => {
	const navigate = useNavigate();

	const formSchema = yup.object().shape({
		email: yup.string().email("Invalid email").required("Must enter email"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: formSchema,
		onSubmit: () => {
			setLoggedIn(true)
			navigate("/")
		}
	});





	
	return (
		<div className="container">
			<h1>Log In</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className="user-box" >
				<label htmlFor="email">Email Address</label>
				<input
					id="email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<p style={{ color: "red" }}> {formik.errors.email}</p>
				</div>
				<div className="user-box">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={formik.handleChange}
				/>
				</div>
				<div className="btn">
					<button type="submit">Submit</button>
				</div>
			</form>
			<p>Don't have an account?</p>
			<a href='/signup'>Sign up here</a>
		</div>
	);
};

export default LogIn;
