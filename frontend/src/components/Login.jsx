import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
// import "./Login.css";

const LogIn = ({ loggedIn, setLoggedIn }) => {
	const navigate = useNavigate();

	const formSchema = yup.object().shape({
		email: yup.string().email("Invalid email").required("Must enter email"),
		password: yup
			.string()
			.required("Must enter a valid password")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
				"Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: formSchema,
		onSubmit: () => {
			// add logic for password check

			setLoggedIn(true)
			navigate("/")
		}
	});


	
	return (
		<div className="container">
			<h1>Log In</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className="user-box">
					<label htmlFor="email">Email Address</label>
					<input
						id="email"
						name="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.errors.email && formik.touched.email ? (
						<p style={{ color: "red" }}> {formik.errors.email}</p>
					) : null}
				</div>
				<div className="user-box">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onBlur={formik.handleBlur}
						name="password"
						onChange={formik.handleChange}
					/>
					{formik.errors.password && formik.touched.password ? (
						<p style={{ color: "red" }}> {formik.errors.password}</p>
					) : null}
				</div>
				<div className="btn">
					<button type="submit">Submit</button>
				</div>
			</form>
			<p>Don't have an account?</p>
			<a href="/signup">Sign up here</a>
		</div>
	);
};

export default LogIn;
