import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import Card from "./UI/Card";

function Signup(){
    const [error, setError] = useState({status: false, msg: "", type:""});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        age: '',
        address: ''
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

        if(formData.name && formData.email && formData.password && formData.cpassword && formData.password === formData.cpassword){
            console.log(formData);
            document.getElementById('signup-form').reset();
            setFormData({
                name: '',
                email: '',
                password: '',
                cpassword: '',
                age: '',
                address: ''
            });
            setError({status: false, msg: "", type: ""});

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
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
                setError({status: true, msg: 'Signup failed, something went wrong!', type: "error"});

            }
        }
        else if( formData.password && formData.cpassword && formData.password !== formData.cpassword){
            setError({status: true, msg: "Password and Confirm password must be same", type: "error"});
        }
        else{
            setError({status: true, msg: "Mandatory fields are required", type: "error"});
        }
        
      }

    return (
       <Card>
          <div>
              <div className="container mt-5">
          <h1 className="text-center">Signup Page</h1>
          <form onSubmit={handleSubmit} id="signup-form">
          <div className="mb-3">
          <label htmlFor="name" className="form-label">
                Full Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
              />
          </div>
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
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password<span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
          <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                autoComplete="off"
              />
          </div>

          <div className="mb-3">
          <label htmlFor="age" className="form-label">
                Address
              </label>
              <textarea name="address" id="address" cols="30" rows="6" onChange={handleChange} autoComplete="off" style={{width: "100%"}} value={formData.address}></textarea>
          </div>


            <button type="submit" className="btn btn-primary">
              Signup
            </button>
            <span  className="float-right">Already have an account?<Link to="/login">Login</Link></span>
          </form>

        {error.status ?  <div className="alert alert-danger mt-3" role="alert">
              {error.msg}
          </div> :  ""}
        </div>
    
          </div>
       </Card>
    );
}

export default Signup;