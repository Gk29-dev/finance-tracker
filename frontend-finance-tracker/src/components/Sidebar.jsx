import React from "react";
import { Link } from "react-router-dom";

function Sidebar(){
    return(
                            <div className="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
                                {/* Sidebar content */}
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Dashboard
                                    </Link>
                                    </li>
                                    <li className="nav-item">
                                    <Link to="/income" className="nav-link">
                                        Income
                                    </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link to="/expense" className="nav-link">
                                          Expenses
                                      </Link>
                                    </li>
                                    <li className="nav-item">
                                      <Link to="/budget" className="nav-link">
                                          Budget
                                      </Link>
                                    </li>
                                    {/* Add more sidebar links as needed */}
                                </ul>
                            </div>
    )
}

export default Sidebar;