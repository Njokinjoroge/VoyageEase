import React from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'
const Signup = () => {
  const navigate = useNavigate()
  const formSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Must enter email"),
	name: yup.string().required("Must enter a name"),
});
  
const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    }, 
    validationSchema: formSchema,
    onSubmit: values => {
      fetch('http://localhost:5555/travelers', {
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
      <div className='container'>
        <h2>Sign Up</h2>

<form onSubmit={formik.handleSubmit} >
          {inputFields.map(field =>(
            field.name === 'Password' || field.name === 'Confirm Password'?
            
            <>
            <div className='user-box'>
              <label htmlFor={field.id}>{field.name}</label>
              <input type="password" name={field.id} id={field.id} onChange={formik.handleChange}/>
              </div>
            </>:
            <>
                <div className='user-box'>
              <label htmlFor={field.id} key={field.id}>{field.name}</label>
              <input type="text" name={field.id} id={field.id} onChange={formik.handleChange}/>
              </div>
            </>
          ))}
<button type="submit">Sign Up</button>
        </form>
      </div>
    </section>
  )
}
export default Signup













// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import "./signup.css";

// const SignUp = () => {
// 	const navigate = useNavigate();

	const formSchema = yup.object().shape({
		email: yup.string().email("Invalid email").required("Must enter email"),
		name: yup.string().required("Must enter a name"),
	});
// 	const formik = useFormik({
// 		initialValues: {
// 		  name: '',
// 		  email: ''
// 		}, 
// 		validationSchema: formSchema,
// 		onSubmit: values => {
// 		  fetch('http://localhost:5555/travelers', {
// 			method: 'POST',
// 			headers: {'Content-Type':'application/json'},
// 			body: JSON.stringify(values)
// 		  })
// 		  .then(() => navigate('/login'))
// 		}
// 	  })
	

// 	return (
// 		<div className="container">
// 			<form onSubmit={formik.handleSubmit}>
// 				<div className="user-box">
// 				<label htmlFor="name">Name</label>
// 				<input
// 					id="name"
// 					name="name"
// 					onChange={formik.handleChange}
// 					value={formik.values.name}
// 				/>
// 				</div>
// 				<p style={{ color: "red" }}> {formik.errors.name}</p>
// 				<div className="user-box">
// 				<label htmlFor="email">Email Address</label>
// 				<input
// 					id="email"
// 					name="email"
// 					onChange={formik.handleChange}
// 					value={formik.values.email}
// 				/>
// 				<p style={{ color: "red" }}> {formik.errors.email}</p>

// 				</div>
// 				<div className="user-box">
// 				<label htmlFor="password">Password</label>
// 				<input
// 					id="password"
// 					name="password"
// 					onChange={formik.handleChange}
// 				/>
// 				</div>
// 				<div className="user-box">
// 				<label htmlFor="confirm-password">Confirm password</label>
// 				<input
// 					id="confirm-password"
// 					name="password"
// 					onChange={formik.handleChange}
// 				/>
// 				</div>
// 				<button
// 					type="submit"
// 					className="btn"
// 					>
// 					Submit
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default SignUp;


	// const formik = useFormik({
	// 	initialValues: {
	// 		name: "",
	// 		email: "",
	// 		age: "",
	// 	},
	// 	validationSchema: formSchema,
	// 	onSubmit: () => navigate("/login"),
	// });

	// function handleSubmit(){
	// 	fetch('http://127.0.0.1:5000/signup', {
	// 		method : 'POST',
	// 		headers: {
	// 			'Content-Type' : 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			name: formik.values.name, 
	// 			email: formik.values.email,
	// 			password: formik.values.password,
    //   		})
	// 	})
	// }
