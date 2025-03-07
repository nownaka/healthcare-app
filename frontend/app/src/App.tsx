import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import AuthSuccess from './components/viewpage/AuthSuccess';
import AuthFailure from './components/viewpage/AuthFailure';
import Login from './components/bussiness/Login';
import Register from './components/viewpage/Register';
import ProtectedRoute from './components/bussiness/LoginCheck';
import Profile from "./components/bussiness/Profile"; // 適切なパスに変更

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
        <Route path="/failure" element={<AuthFailure />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/success" element={<AuthSuccess />} />
          <Route path="/profileform" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
