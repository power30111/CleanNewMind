import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



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

  return (
    <div className='nav'>
      <button className="btn-hover color-9" onClick={goHome}>Home</button>

      {islogin ? (
        <button className="btn-hover color-9" onClick={logout}>로그아웃</button>
      ):(
        <button className="btn-hover color-9" onClick={goLogin}>로그인</button>
      )}

      <button className="btn-hover color-9" onClick={goSignup}>SignUp</button>
    </div>
  );
}

export default Navbar