import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Card from "./UI/Card";

function Login(){
    const [error, setError] = useState({status: false, msg: "", type:""});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here

        if(formData.email && formData.password){
            console.log(formData);
            setFormData({
                email: '',
                password: '',
            });
            setError({status: false, msg: "", type: ""});

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
                if(!response.data.status){
                    setError({status: true, msg: response.data.message, type: "error"});

                }else{
                    localStorage.setItem('user_jwt_token', response.data.token);
                    localStorage.setItem('user_email', response.data.user.email);
                    setError({status: false, msg: "", type: ""});
                    navigate("/");
                }
            } catch (error) {
                console.error('Login failed', error);
                setError({status: true, msg: 'Login failed, something went wrong!', type: "error"});

            }
        }else{
            setError({status: true, msg: "All fields are required", type: "error"});
        }
        
      }

return (
   <Card>
     <div className="container">
        <h1 className="text-center">Login Page</h1>
        <form onSubmit={handleSubmit} id="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          <Link to="/signup" className="float-right">Create Account</Link>
        </form>

       {error.status ?  <div className="alert alert-danger mt-3" role="alert">
            {error.msg}
        </div> :  ""}
      </div>
   </Card>
    );
}

export default Login;