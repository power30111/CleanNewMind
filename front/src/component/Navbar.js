import React from 'react'
import  {Button} from 'react-bootstrap';
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
      <Button variant="outline-primary" onClick={goHome}>Home</Button>

      {islogin ? (
        <button class="btn-hover color-9" onClick={logout}>로그아웃</button>
      ):(
        <button class="btn-hover color-9" onClick={goLogin}>로그인</button>
      )}

      <Button variant="outline-primary" onClick={goSignup}>SignUp</Button>
    </div>
  );
}

export default Navbar