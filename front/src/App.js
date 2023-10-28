import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 임포트
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './page/Login';
import { Routes, Route} from 'react-router-dom'

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // axios를 사용하여 GET 요청 보내기
    axios.get('http://localhost:8080/test/api1')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생', error);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <h1>텍스트 데이터:</h1>
      <p>{data}</p>
    </div>
  );
}


export default App;