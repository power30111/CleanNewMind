import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './component/Navbar';
import Login from './page/Login';
import SignUp from './page/Signup';
import Home from './page/Home';
import { Routes, Route} from 'react-router-dom'
import Write from './page/Write';


function App() {
  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/Write" element={<Write/>}/>
      </Routes>
    </div>
  );
}


export default App;