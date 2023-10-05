import React from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Income(){
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
            axios.get('http://127.0.0.1:8000/api/incomes', { headers })
            .then((response) => {
                if(!response.data.status && response.data.error == 'jwt token error'){
                      toast(response.data.message);
                      navigate('/login');
                }
                else if(response.data.incomes.length === 0){
                    setData([]);
                }else{
                    setData(response.data.incomes);

                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }, []);

        const deleteIncome = async (incomeId) => {
           if(window.confirm('Are your sure to delete the income?')){
            try {
                // Send a DELETE request to your API endpoint with the user ID
                await axios.delete('http://127.0.0.1:8000/api/income/'+incomeId,{headers})
                .then((response) => {
                  if(!response.data.status && response.data.error == 'jwt token error'){
                      toast(response.data.message);
                      navigate('/login');
                 }
  
                 //success - redirect to income home page
                 if(response.data.status){
                toast(response.data.message);
                setData((prevData) => prevData.filter((item) => item.id !== incomeId));
               }
            });
              } catch (error) {
                console.error('Error deleting income:', error);
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
              <h1>Income</h1>
              <NavLink to='/income/add' className="btn btn-sm btn-primary text-center adding">Add Income</NavLink>
            </div>
  
            <div>
              {data.length === 0 ? (
                <h3 className="text-center">No records available</h3>
              ) : (
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>Source</th>
                      <th>Amount</th>
                      <th>Income Date</th>
                      <th colSpan="2">Action</th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.source}</td>
                        <td>{item.amount}</td>
                        <td>{item.income_date}</td>
                        <td><Link to={`/income/edit/${item.id}`} className="btn btn-sm btn-warning">Edit</Link></td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => deleteIncome(item.id)}>Delete</button></td>
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

export default Income;