import axios from 'axios';
import React from 'react'
import { Form, Container } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../redux/actions/LoginAction';


const Login = () => {

    const logininfo = useSelector((state) => state.login);
    /*const token = useSelector((state) => state.token);*/
    /* 정보저장 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({type:'Login',payload:{ name, value }});
    };
    /*회원가입 페이지 이동*/
    const navigate = useNavigate()
    
    const goSignup = () =>{
        navigate('/Signup')
    }
    const goHome = () =>{
        navigate('/')
    }
    const login =()=>{
        dispatch({type:'login', payload:true})
    }

    const dispatch = useDispatch()


    

    /* 클릭이벤트 유저정보 전달 */
    const handleSubmit=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:8080/user/login',logininfo)

        .then((response) => {
                const accessToken=response.data.accessToken
                dispatch(LoginAction.getToken(accessToken))
                login()
                alert('로그인 성공');
                console.log("로그인 성공")
                console.log(`토큰 데이터 : ${response.data.accessToken}`)
                goHome()
        })
        .catch((error) => {
        console.error('로그인 에러', error);
        console.log(logininfo)
        });
    }
    
    
    return (
        <Container className='flexbox' >
            <Form className='Box userinfo' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" name="userId" value={login.userId} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={login.password} onChange={handleInputChange} /> 
                </Form.Group>
                <div className='flexbox'>
                    <button className="btn-hover color-9" type='submit'>Login!</button>
                    <button className="btn-hover color-9" onClick={goSignup}>Sign Up!</button>
                </div>
            </Form>
        </Container>
    )
}

export default Login
