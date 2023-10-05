import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import IncomeChart from "./IncomeChart";
import ExpenseChart from "./ExpenseChart";

function Dashboard(){

    return (
        <div>
            <Navbar/>
            <div className="row" style={{height: '100vh'}}>
                <Sidebar/>
                <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                                {/* Main content */}
                    <h2 className="text-center my-5">Income</h2>
                    <IncomeChart/>

                    <h2 className="text-center my-5">Expenses</h2>
                    <ExpenseChart />
                </div>
            </div>
        </div>
        
    );
}

export default Dashboard;