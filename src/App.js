import React, { useContext } from 'react';
import {  Navigate, Route,  Routes  } from 'react-router-dom';
import './App.css';
import AuthForm from './component/Auth/AuthForm';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';


function App() {
  const athCntx = useContext(AuthContext);
  console.log(athCntx);
  return (
      <React.Fragment>
        <Routes>
          {!athCntx.isLoggedIn && <Route path='/auth' element={ <AuthForm /> }/>}
          {athCntx.isLoggedIn && <Route path='/home'  element={ <HomePage /> }/>}
          <Route path="*" element={<Navigate replace to='/auth' />} />
        </Routes>
      </React.Fragment>
  );
}

export default App;
