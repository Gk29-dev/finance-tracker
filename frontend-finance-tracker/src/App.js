import './App.css';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Income from './components/Income/Income';
import AddIncome from './components/Income/AddIncome'
import UpdateIncome from './components/Income/UpdateIncome';
import { ToastContainer} from 'react-toastify';
import Budget from './components/Budget/Budget';
import AddBudget from './components/Budget/AddBudget';
import UpdateBudget from './components/Budget/UpdateBudget';
import Expense from './components/Expense/Expense';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectRoute from './components/RedirectRoute';
import AddExpense from './components/Expense/AddExpense';
import UpdateExpense from './components/Expense/UpdateExpense';

function App() {
  const jwtToken = localStorage.getItem('user_jwt_token');
  console.log(jwtToken);

  return (
      <div>
          <ToastContainer />
          <Router>
             <Routes>
               <Route path='/signup' element={<RedirectRoute element={< Signup />} />}></Route>
                <Route path='/login' element={<RedirectRoute element={< Login />} />}></Route>

               <Route path='/' element={<ProtectedRoute element={< Dashboard /> } /> }></Route>
                <Route path='/income' element={<ProtectedRoute element={< Income />} />  }></Route>
                <Route path='/income/add' element={<ProtectedRoute element={<AddIncome/>} />}></Route>
                <Route path='/income/edit/:id' element={<ProtectedRoute element={<UpdateIncome />} />}></Route>
                
                {/* Expenses */}
                <Route path='/expense' element={<ProtectedRoute element={< Expense />} />}></Route>
                <Route path='/expense/add' element={<ProtectedRoute element={< AddExpense />} />}></Route>
                <Route path='/expense/edit/:id' element={<ProtectedRoute element={< UpdateExpense />} />}></Route>

                {/* Budgets */}
                <Route path='/budget' element={<ProtectedRoute element={< Budget />} /> }></Route>
                <Route path='/budget/add' element={<ProtectedRoute element={< AddBudget />} />}></Route>
                <Route path='/budget/edit/:id' element={<ProtectedRoute element={< UpdateBudget />} />}></Route>

                <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />

             </Routes>
          </Router>
      </div>
  );
}

export default App;
