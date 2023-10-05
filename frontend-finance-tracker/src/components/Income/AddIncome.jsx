import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function AddIncome(){
    const [formData, setFormData] = useState({
        source: "",
        amount: "",
        income_date: "",
        user_id: ""
      });

    const [error, setError] = useState({status: false, msg: "", type:""});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
       const jwtToken = localStorage.getItem('user_jwt_token');
       setToken(jwtToken); 
    // Decode the JWT token
    const decodedToken = jwt_decode(jwtToken);
    //Get the user id
    const userId = decodedToken.sub;
    setFormData({
        ...formData, // Spread the existing state to keep its values
        user_id: userId, // Add or update the 'user_id' property
      });
    },[]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.source && formData.amount && formData.income_date){
            //pass the JWT token in header 
            const headers = {
                Authorization: `Bearer ${token}`,
              };
            try {
              await axios.post("http://127.0.0.1:8000/api/income", formData, {headers})
              .then((response) => {
                    if(!response.data.status && response.data.error == 'jwt token error'){
                       toast(response.data.message);
                        navigate('/login');
                   }

                   //success - redirect to income home page
                   if(response.data.status){
                    toast(response.data.message);
                    navigate('/income');
                 }
              });
            } catch (error) {
              setError({status: true, msg: "Something went wrong!", type: "error"});
            }
        }else{
            setError({status: true, msg: "All fields are required", type: "error"});
        }
     
      };

    return (
        <div>
            <Navbar />
        <div className="row" style={{ height: "100vh" }}>
          <Sidebar />

          <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div className="container mt-5">
                    <h1 className="text-center">Add Income</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="source" className="form-label">
                        Income Source<span className="text-danger">*</span>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                        Amount<span className="text-danger">*</span>
                        </label>
                        <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="income_date" className="form-label">
                        Income Date<span className="text-danger">*</span>
                        </label>
                        <input
                        type="date"
                        className="form-control"
                        id="income_date"
                        name="income_date"
                        value={formData.income_date}
                        onChange={handleChange}
                        autoComplete="off"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Income
                    </button>
                    </form>

                {error.status ?  <div className="alert alert-danger mt-3" role="alert">
                        {error.msg}
                    </div> :  ""}
                </div>
          </div>
        </div>
       
   
        </div>   
    )
}

export default AddIncome;