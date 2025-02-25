import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import AuthSuccess from './components/AuthSuccess';
import AuthFailure from './components/AuthFailure';
import Login from './components/Login';
import Register from './components/Register';

// function App: React.FC = () => {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<AuthSuccess />} />
        <Route path="/failure" element={<AuthFailure />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
