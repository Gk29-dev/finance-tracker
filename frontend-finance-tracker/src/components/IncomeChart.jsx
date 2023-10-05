import React, { useEffect } from "react";
import { useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function IncomeChart(){
    const [incomeData, setIncomeData] = useState([]);
    const incomeLabel = [];
    const incomeAmount = [];

    const jwtToken = localStorage.getItem('user_jwt_token'); 
    const decodedToken = jwt_decode(jwtToken);
    //Get the user id
    const userId = decodedToken.sub;

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
        'user_id': userId
      };

    useEffect(() => {
        // Fetch income data from an API using Axios
        axios.get('http://127.0.0.1:8000/api/incomes', { headers })
        .then((response) => {
            if(!response.data.status && response.data.error == 'jwt token error'){
                toast(response.data.message);
            }
            else if(response.data.incomes.length === 0){
                setIncomeData([]);
            }else{
                setIncomeData(response.data.incomes);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    },[]);

    incomeData.map((income) => {
        incomeLabel.push(income.source);
        incomeAmount.push(income.amount); 

    });

    const incomelabels = incomeLabel;
    const userIncomeData = {
      labels: incomelabels,
      datasets: [
        {
          label: "Income",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: incomeAmount,
        },
      ],
    };

    return (
        <div>
            <Bar data={userIncomeData} />
        </div>
    )
}

export default IncomeChart;