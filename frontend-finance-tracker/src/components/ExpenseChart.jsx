import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function ExpenseChart(){
    const [expenseData, setExpenseData] = useState([]);
    const expenseLabel = [];
    const expenseAmount = [];
    const jwtToken = localStorage.getItem('user_jwt_token'); 
    const decodedToken = jwt_decode(jwtToken);
    //Get the user id
    const userId = decodedToken.sub;

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
        'user_id': userId
      };


    useEffect(() => {
                // Fetch expense data from an API using Axios
                axios.get('http://127.0.0.1:8000/api/expenses', { headers })
                .then((response) => {
                    if(!response.data.status && response.data.error == 'jwt token error'){
                          toast(response.data.message);
                    }
                    else if(response.data.expenses.length === 0){
                     setExpenseData([]);
                    }else{
                     setExpenseData(response.data.expenses);
    
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
    },[]);

    expenseData.map((expense) => {
        expenseLabel.push(expense.budget.category_name);
        expenseAmount.push(expense.amount); 
    });

        //expense
        const expenseLabels = expenseLabel;
        const userExpenseData = {
          labels: expenseLabels,
          datasets: [
            {
              label: "Expense",
              backgroundColor: "rgb(255, 153, 51)",
              borderColor: "rgb(255, 153, 51)",
              data: expenseAmount,
            },
          ],
        };


    return(
       <div>
             <Bar data={userExpenseData} />
       </div>
    );
}

export default ExpenseChart;