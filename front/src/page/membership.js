import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Membership = () => {

    /* 리듀서 */
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()

    /* 정보저장 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({type:'userInfo',payload:{ name, value }});
    };
    /*회원가입 성공시 로그인창으로 이동*/
    const navigate = useNavigate()

    const goLogin = () =>{
        navigate('/login')
    }

    
        /* 클릭이벤트 유저정보 전달(수정 필) */
        const handleSubmit=(e)=>{
            e.preventDefault();
    
            axios.post('http://localhost:8080/user/register',user)
            .then((response) => {
                if (response.status === 200) {
                alert('회원가입 성공');
                console.log("로그인 성공")
                goLogin()

    
                } else {
                alert('회원가입 실패');
                }
            })
            .catch((error) => {
            console.error('회원가입 에러', error);
            console.log(user)
            });
        }
    return (
        <Container className='login' >
            <Form className=' LoginBox' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" name="userId" value={user.id} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handleInputChange} /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name="name" value={user.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="Email" value={user.Email} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary"  type="submit">
                회원가입
                </Button>
            </Form>
        </Container>
    )
}

export default Membership



