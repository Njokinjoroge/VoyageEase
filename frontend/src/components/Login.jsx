import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
// import "./Login.css";

const LogIn = () => {
	const navigate = useNavigate();

	const formSchema = yup.object().shape({
		email: yup.string().email("Invalid email").required("Must enter email"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: formSchema,
		onSubmit: () => navigate("/"),
	});
	return (
		<div className="container">
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="email">Email Address</label>
				<input
					id="email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<p style={{ color: "red" }}> {formik.errors.email}</p>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					onChange={formik.handleChange}
				/>
				<div className="btn">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default LogIn;
