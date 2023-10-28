import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';



const Login = () => {


    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });
    /* formdata를 usestate로 설정 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const dispatch = useDispatch()
    
    /* 아이디 비번을  받아서 formdata에 저장 저장 */
    
    const Loginstart = ()=>{
        dispatch({type:"Login"})
    }
    /* 로그인버튼 클릭이벤트 */

    const formDataToSend = new FormData();
    formDataToSend.append('id', formData.id);
    formDataToSend.append('password', formData.password);
    /* 전송할 form 데이터 생성 및 추가 */



    /* 클릭이벤트 유저정보 전달 */
    const handleSubmit=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:8080/user/login',formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data', // 필수
            },
        })

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
        console.log(formDataToSend)
        console.log(formData)
        });
    }
    
    
    return (
        <Container className='login' >
            <Form className=' LoginBox' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" name="id" value={formData.id} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} /> 
                </Form.Group>
                <Button variant="primary" type="submit" onClick={Loginstart}>
                로그인
                </Button>
                <Button variant="primary" type="submit">
                회원가입
                </Button>

            </Form>
        </Container>
    )
}

export default Login
