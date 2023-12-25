import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './component/Navbar';
import Login from './page/Login';
import SignUp from './page/Signup';
import Home from './page/Home';
import { Routes, Route} from 'react-router-dom'
import Write from './page/Write';
import SelectedPage from './page/SelectedPage';
import Mypage from './page/Mypage';
import Rewrite from './page/Rewrite';
import Mail from './component/Mail';
import Chat from './component/Chat';



function App() {
  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Signup" element={<SignUp/>}/>
        <Route path="/Write" element={<Write/>}/>
        <Route path="/board/list/:id" element={<SelectedPage/>}/>
        <Route path="/Mypage" element={<Mypage/>}/>
        <Route path="/Rewrite" element={<Rewrite/>}/>
        <Route path="/Chat" element={<Chat/>}/>
      </Routes>
    </div>
  );
}


export default App;