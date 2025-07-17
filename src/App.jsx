import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import StartGame from './page/StartGame';
import ScoreList from './page/ScoreList';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/startgame" element={<StartGame />} />
        <Route path="/scorelist" element={<ScoreList />} />
      </Routes>
    </Router>
  );
}

export default App;
