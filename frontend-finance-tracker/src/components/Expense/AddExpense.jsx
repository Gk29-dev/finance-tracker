import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function AddExpense(){
    const [categories, setCategories]  = useState([]);
    const [formData, setFormData] = useState({
        budget_id: "",
        amount: "",
        expense_date: "",
        user_id: ""
      });

    const [error, setError] = useState({status: false, msg: "", type:""});
    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('user_jwt_token');
    // Decode the JWT token
    const decodedToken = jwt_decode(jwtToken);
    //Get the user id
    const userId = decodedToken.sub;

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
        user_id: userId
      };

    useEffect(() => {
        //Get the all budget categories
        axios.get('http://127.0.0.1:8000/api/categories/', { headers })
        .then((response) => {
            if(!response.data.status && response.data.error == 'jwt token error'){
                 toast(response.data.message);
                  navigate('/login');
            }
            else if(response.data.categories.length === 0){
                setCategories([]);
            }

           else{
                setCategories(response.data.categories);
                console.log("category:"+categories);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            navigate('/expense');
        }); 
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
        if(formData.budget_id && formData.amount && formData.expense_date){
            //pass the JWT token in header 
            try {
              await axios.post("http://127.0.0.1:8000/api/expense", formData, {headers})
              .then((response) => {
                    if(!response.data.status && response.data.error == 'jwt token error'){
                       toast(response.data.message);
                        navigate('/login');
                   }

                   //success - redirect to income home page
                   if(response.data.status){
                    toast(response.data.message);
                    navigate('/expense');
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
                    <h1 className="text-center">Add Expense</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="budget_id" className="form-label">
                        Category Name<span className="text-danger">*</span>
                    </label>
                        <select
                            value={formData.budget_id}
                            onChange={handleChange}
                            name="budget_id"
                            id="budget_id"
                            className="form-control"
                            >
                            {categories.length === 0 ? (
                                <option value="" disabled>Select category</option>
                            ) : (
                                <>
                                <option value="" disabled hidden>
                                    Select category
                                </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                    {category.category_name}
                                    </option>
                                ))}
                                </>
                            )}
                            </select>
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
                        <label htmlFor="expense_date" className="form-label">
                        Expense Date<span className="text-danger">*</span>
                        </label>
                        <input
                        type="date"
                        className="form-control"
                        id="expense_date"
                        name="expense_date"
                        value={formData.expense_date}
                        onChange={handleChange}
                        autoComplete="off"
                        />
                    </div>
                
                    <button type="submit" className="btn btn-primary">
                        Add Expense
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

export default AddExpense;