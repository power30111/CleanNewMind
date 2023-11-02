import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const login = useSelector((state) => state.login);

    /* 정보저장 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({type:'Login',payload:{ name, value }});
    };
    /*회원가입 페이지 이동*/
    const navigate = useNavigate()
    
    const goMembership = () =>{
        navigate('/Membership')
    }

    const dispatch = useDispatch()
    

    /* 클릭이벤트 유저정보 전달 */
    const handleSubmit=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:8080/user/loginV2',login)

        .then((response) => {
            if (response.status === 200) {
            alert('로그인 성공');
            console.log("로그인 성공")

            } else {
            alert('로그인 실패');
            }
        })
        .catch((error) => {
        console.error('로그인 에러', error);
        console.log(login)
        });
    }
    
    
    return (
        <Container className='login' >
            <Form className=' LoginBox' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" name="id" value={login.id} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={login.password} onChange={handleInputChange} /> 
                </Form.Group>
                <Button variant="primary" type="submit" >
                로그인
                </Button>
                <Button variant="primary" onClick={goMembership} >
                회원가입
                </Button>

            </Form>
        </Container>
    )
}

export default Login
