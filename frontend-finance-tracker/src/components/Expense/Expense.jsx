import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Expense(){
    //Make constnat for budget status
    const InLimit = 1;
    const LimitReached = 2;
    const ExceedLimit = 3;

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const jwtToken = localStorage.getItem('user_jwt_token'); 
    const decodedToken = jwt_decode(jwtToken);
    //Get the user id
    const userId = decodedToken.sub;

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
        'user_id': userId
      };

        useEffect(() => {
            // Fetch data from an API using Axios
            axios.get('http://127.0.0.1:8000/api/expenses', { headers })
            .then((response) => {
                if(!response.data.status && response.data.error == 'jwt token error'){
                      toast(response.data.message);
                      navigate('/login');
                }
                else if(response.data.expenses.length === 0){
                    setData([]);
                }else{
                    setData(response.data.expenses);

                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }, []);

        const deleteExpense = async (expenseId) => {
           if(window.confirm('Are your sure to delete the expense?')){
            try {
                // Send a DELETE request to your API endpoint with the user ID
                await axios.delete('http://127.0.0.1:8000/api/expense/'+expenseId,{headers})
                .then((response) => {
                  if(!response.data.status && response.data.error == 'jwt token error'){
                      toast(response.data.message);
                      navigate('/login');
                 }
  
                 //success - redirect to income home page
                 if(response.data.status){
                toast(response.data.message);
                setData((prevData) => prevData.filter((item) => item.id !== expenseId));
               }
            });
              } catch (error) {
                console.error('Error deleting expense:', error);
                toast('something went wrong');
              }
           }
         
          };

    return(
        <div>
        <Navbar />
        <div className="row" style={{ height: "100vh" }}>
          <Sidebar />
          <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            {/* Main content */}
            <div className="d-flex flex-row justify-content-between my-3" style={{alignItems:'center'}}>
              <h1>Expenses</h1>
              <NavLink to='/expense/add' className="btn btn-sm btn-primary text-center adding">Add Expense</NavLink>
            </div>
  
            <div>
              {data.length === 0 ? (
                <h3 className="text-center">No records available</h3>
              ) : (
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>Expense Name</th>
                      <th>Amount</th>
                      <th>Expense Date</th>
                      <th>Status</th>
                      <th colSpan="2">Action</th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.budget.category_name}</td>
                        <td>{item.amount}</td>
                        <td>{item.expense_date}</td>
                        <td>
                        {item.status === InLimit && (
                                <span className="badge badge-success">InLimit</span>
                              )}
                              {item.status === LimitReached && (
                                <span className="badge badge-warning">Limit Reached</span>
                              )}
                              {item.status === ExceedLimit && (
                                <span className="badge badge-danger">Limit Exceed</span>
                              )}
                          </td>
                        <td><Link to={`/expense/edit/${item.id}`} className="btn btn-sm btn-warning">Edit</Link></td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => deleteExpense(item.id)}>Delete</button></td>
                        {/* Add more table cells for additional columns */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    )
}

export default Expense;