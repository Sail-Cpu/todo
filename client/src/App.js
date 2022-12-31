import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

/* Pages */
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
