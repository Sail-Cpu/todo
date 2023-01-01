import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

/* Pages */
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path='/' element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
