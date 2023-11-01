import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './component/Navbar';
import Login from './page/Login';
import Membership from './page/membership';
import Home from './page/Home';
import { Routes, Route} from 'react-router-dom'


function App() {
  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Membership" element={<Membership/>}/>
      </Routes>
    </div>
  );
}


export default App;