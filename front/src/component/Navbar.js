import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Mail from './Mail';


const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogin = useSelector((state=> state.isLogin))



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
  const goChat = () =>{
    navigate('/Chat')
  }

  useEffect(() => {
    // 페이지 로딩 시 실행
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      // 토큰이 세션 스토리지에 저장되어 있다면 로그인 상태로 설정
      dispatch({ type: 'login', payload: true });
      dispatch({ type: 'setToken', payload: storedToken })
    }
  }, [dispatch]);

  const handleBeforeUnload = () => {
    if (isLogin) {
      // 로그인 상태일 때만 세션 스토리지의 토큰 삭제
      sessionStorage.removeItem('token');
    }
  };

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLogin]); // isLogin이 변경될 때만 useEffect 실행

  return (
    <div className='nav'>
      <button className="btn-hover color-9" onClick={goHome}>Home</button>

      {isLogin ? (
        <button className="btn-hover color-9"onClick={logout}>Log Out</button>
      ):(
        <button className="btn-hover color-9" onClick={goLogin}>Log In</button>
      )}

      {isLogin ? (
        <button className="btn-hover color-9"onClick={Mypage}>My Page</button>
      ):(
        <button className="btn-hover color-9" onClick={goSignup}>Sign Up</button>
      )}
      
      <Sidebar width={320}>
        <button className="btn-hover color-9" onClick={goHome}>Home</button>

        {isLogin ? (
          <button className="btn-hover color-9"onClick={logout}>Log Out</button>
        ):(
          <button className="btn-hover color-9" onClick={goLogin}>Log In</button>
        )}

        {isLogin ? (
          <button className="btn-hover color-9"onClick={Mypage}>My Page</button>
        ):(
          <button className="btn-hover color-9" onClick={goSignup}>Sign Up</button>
        )}

        <button className="btn-hover color-9" onClick={goChat}>Chat</button>
        
        
        <Mail/>
      </Sidebar>
    </div>
  );
}

export default Navbar