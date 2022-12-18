import React from 'react';
import { Navigate, Route,  Routes  } from 'react-router-dom';
import './App.css';
import AuthForm from './component/Auth/AuthForm';
import ExpenseTracker from './component/Expense/ExpenseTracker';

function App() {
  return (
    <React.Fragment>
        <Routes>
          <Route path='/auth' element={ <AuthForm /> }/>
          <Route path='/expense'  element={ <ExpenseTracker /> }/>
          <Route path="*" element={<Navigate replace to="/auth" />} />
        </Routes>
    </React.Fragment>
  );
}

export default App;
