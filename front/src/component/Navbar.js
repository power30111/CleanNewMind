import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const islogin = useSelector((state=> state.islogin))


  const goHome = () =>{
      navigate('/')
  }
  const goLogin = () =>{
      navigate('/login')
  }
  const goSignup = () =>{
      navigate('/Signup')
  }
  const logout =()=>{
    dispatch({type:'logout', payload:false})
  }
  const Mypage = ()=>{
    navigate('/Mypage')
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (islogin) {
        localStorage.removeItem('token');
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [islogin]); // islogin이 변경될 때만 useEffect 실행
  


  return (
    <div className='nav'>
      <button className="btn-hover color-9" onClick={goHome}>Home</button>

      {islogin ? (
        <button className="btn-hover color-9"onClick={logout}>Log Out</button>
      ):(
        <button className="btn-hover color-9" onClick={goLogin}>Log In</button>
      )}

      {islogin ? (
        <button className="btn-hover color-9"onClick={Mypage}>My Page</button>
      ):(
        <button className="btn-hover color-9" onClick={goSignup}>Sign Up</button>
      )}
      
    </div>
  );
}

export default Navbar