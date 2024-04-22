import React from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'


function Signup () {
    const navigate = useNavigate()
    const formSchema = yup.object().shape({
		email: yup.string().email("Invalid email").required("Must enter email"),
		name: yup.string().required("Must enter a name"),
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
        name: '',
        email: ''
      }, 
      validationSchema: formSchema,
      onSubmit: values => {
        fetch('http://localhost:5000/travelers', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(values)
        })
        .then(() => navigate('/login'))
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
  return (
		<section>
			<div className="container">
				<h2>Sign Up</h2>

				<form onSubmit={formik.handleSubmit}>
					{inputFields.map((field) =>
						field.name === "Password" ||
						field.name === "Confirm Password" ? (
							<>
								<div className="user-box">
									<label htmlFor={field.id}>
										{field.name}
									</label>
									<input
										type="password"
										name={field.id}
										id={field.id}
										onChange={formik.handleChange}
									/>
								</div>
								<p style={{ color: "red" }}>
									{" "}
									{formik.errors.password}
								</p>
							</>
						) : 
  
					   field.name == "Email" ? (
							<>
								<div className="user-box">
									<label
										htmlFor={field.id}
										key={field.id}>
										{field.name}
									</label>
									<input
										type="text"
										name={field.id}
										id={field.id}
										onChange={formik.handleChange}
									/>
								</div>
								<p style={{ color: "red" }}>
									{" "}
									{formik.errors.email}
								</p>
							</>
						) : field.name == "Name" ? (
							<>
								<div className="user-box">
									<label
										htmlFor={field.id}
										key={field.id}>
										{field.name}
									</label>
									<input
										type="text"
										name={field.id}
										id={field.id}
										onChange={formik.handleChange}
									/>
								</div>
								<p style={{ color: "red" }}>
									{" "}
									{formik.errors.name}
								</p>
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
