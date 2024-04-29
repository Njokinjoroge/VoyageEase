import React from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'
// import "./signup.css"

function Signup () {
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
		email: yup.string().email("Invalid email").required("Must enter email"),
		name: yup.string().required("Must enter a name"),
		password: yup
			.string()
			.required("Must enter a valid password")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
				"Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			),
		confirm_password: yup
			.string()
			.required("Must enter a valid password")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
				"Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
			)
			.oneOf([yup.ref('password'), ''], 'Passwords must match')
	});
    
  const formik = useFormik({
      initialValues: {
        name: '',
        email: ''
      }, 
      validationSchema: formSchema,
      onSubmit: values => {
			console.log(values)

			fetch('http://localhost:5000/api/register/', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(values)
			})
			.then((response) => {
				if (!response.ok){
					alert("Something went wrong, please try again later")
				}
				
				if (response.ok){
					alert('Sign Up successful!')
					navigate('/login')}
				}
			)
      	}
    })
	
  const inputFields = [
      {
        name:'Name',
        id:'name'
      },
      {
        name:'Email',
        id:'email'
      },
      {
        name:'Password',
        id:'password'
      },
      {
        name:'Confirm Password',
        id:'confirm_password'
      },
  ]

//   console.log("Visited: ",formik.touched)

  return (
		<section>
			<div className="container">
				<h2>Sign Up</h2>

				<form onSubmit={formik.handleSubmit} className='auth-forms'>
					{inputFields.map((field) =>
						field.name === "Password" ? (
							<>
								<div className="user-box">
									<label htmlFor={field.id}>
										{field.name}
									</label>
									<input
										type="password"
										name={field.id}
										id={field.id}
										key={field.id}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</div>
								{formik.errors.password &&
								formik.touched.password ? (
									<p style={{ color: "red" }}>
										{formik.errors.password}
									</p>
								) : null}
							</>
						) : field.name === "Confirm Password" ? (
							<>
								<div className="user-box">
									<label htmlFor={field.id}>
										{field.name}
									</label>
									<input
										type="password"
										name={field.id}
										id={field.id}
										key={field.id}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</div>
								{formik.errors.confirm_password &&
								formik.touched.confirm_password ? (
									<p style={{ color: "red" }}>
										{formik.errors.confirm_password}
									</p>
								) : null}
							</>
						) : field.name === "Email" ? (
							<>
								<div className="user-box">
									<label htmlFor={field.id} key={field.id}>
										{field.name}
									</label>
									<input
										type="text"
										name={field.id}
										id={field.id}
										key={field.id}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</div>
								{formik.errors.email && formik.touched.email ? (
									<p style={{ color: "red" }}>
										{formik.errors.email}
									</p>
								) : null}
							</>
						) : field.name === "Name" ? (
							<>
								<div className="user-box">
									<label htmlFor={field.id} key={field.id}>
										{" "}
										{field.name}
									</label>
									<input
										type="text"
										name={field.id}
										id={field.id}
										key={field.id}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</div>
								{formik.errors.name && formik.touched.name ? (
									<p style={{ color: "red" }}>
										{formik.errors.name}
									</p>
								) : null}
							</>
						) : (
							<>{null}</>
						)
					)}
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</section>
  );
}
export default Signup
