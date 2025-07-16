import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';

function App() {
  return (
    <Router>
      <div className='flex flex-col items-center justify-center h-screen bg-yellow-500'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
