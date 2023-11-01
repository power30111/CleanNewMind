import React from 'react'
import { useNavigate } from 'react-router-dom';
import  {Button} from 'react-bootstrap';

const Home = () => {
    const navigate = useNavigate()

    const goLogin = () =>{
        navigate('/login')
    }
    const goMembership = () =>{
        navigate('/Membership')
    }
    return (
        <div>
            <Button variant="primary" onClick={goLogin}>로그인페이지</Button>
            <Button variant="primary" onClick={goMembership}>회원가입페이지</Button>
        </div>
        
    )
}

export default Home