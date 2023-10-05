import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function UpdateExpense(){
    const [categories, setCategories]  = useState([]);
    const {id} = useParams();
    const [formData, setFormData] = useState({
        budget_id: "",
        amount: "",
        expense_date: "",
        user_id: ""
      });

    const jwtToken = localStorage.getItem('user_jwt_token'); 
     // Decode the JWT token
     const decodedToken = jwt_decode(jwtToken);
     //Get the user id
     const userId = decodedToken.sub;

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
        user_id: userId
      };


    const [error, setError] = useState({status: false, msg: "", type:""});
    const navigate = useNavigate();

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
                 }
             })
             .catch((error) => {
                 console.error('Error fetching data:', error);
                 navigate('/expense');
             });


        //First fetch the expense data for update
        axios.get('http://127.0.0.1:8000/api/expense/'+id, { headers })
            .then((response) => {
                if(!response.data.status && response.data.error == 'jwt token error'){
                     toast(response.data.message);
                      navigate('/login');
                }
               else{
                    setFormData({
                        ...formData, // Spread the existing state to keep its values
                        budget_id: response.data.expense.budget_id,
                        amount: response.data.expense.amount,
                        expense_date: response.data.expense.expense_date,
                        user_id: response.data.expense.user_id, // Add or update the 'user_id' property
                      });

                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                navigate('/expense');
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
            try {
              await axios.post("http://127.0.0.1:8000/api/expense/"+id, formData, {headers})
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
                    <h1 className="text-center">Update Expense</h1>
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
                            className="form-control" disabled
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
                
                    <button type="submit" className="btn btn-warning">
                        Update Expense
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

export default UpdateExpense;