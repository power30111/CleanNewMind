import axios from 'axios';
import React from 'react'
import {Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Edit = () => {

    /* 리듀서 */
    const testpassword = useSelector((state) => state.testpassword);
    const edit = useSelector((state) => state.edit);

    const dispatch = useDispatch()

    /*회원가입 성공시 로그인창으로 이동*/
    const navigate = useNavigate()

    const goHome = () =>{
        navigate('/')
    }

    const deleteedit = () =>{
        dispatch({type:"delete-edit"})
        
    }

    /* 정보저장 */
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({type:'edit',payload:{ name, value }});
    };


    const comparePassword = () =>{
        if (edit.newPassword !== edit.password) {
            dispatch({type:"testPassword", payload: false})
        }
        else {
            dispatch({type:"testPassword", payload: true})
        }
    }

        /* 클릭이벤트 유저정보 전달(수정 필) */
        const handleSubmit=(e)=>{
            e.preventDefault();
            comparePassword()
        
        if (testpassword == false) {
            axios.get('http://localhost:8080/user/signup',edit)
            .then((response) => {
                alert('변경 성공');
                console.log("회원 정보 수정 성공")
                goHome()
                dispatch({type:"testPassword", payload: false})
            })
            .catch((error) => {
            console.error('변경 에러', error);
            console.log(edit)
            dispatch({type:"testPassword", payload: false})
            });
        }
        else {
            alert ('비밀번호가 일치 하지 않습니다.')
            console.log(edit)
            dispatch({type:"testPassword", payload: false})
        }
            
        }
    return (
        <Container className='flexbox infobox' >
        <Form className='Box userinfo' onSubmit={handleSubmit}>

            <Form.Group className="mb-3 mypage-text" controlId="formId">
                <Form.Label className='mypage-text-label'>아이디</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="text" placeholder="Enter Id" name="userId" value={edit.userId} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3 mypage-text" controlId="formPassword">
                <Form.Label className='mypage-text-label'>새 비밀번호</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="password" placeholder="newPassword" name="password" value={edit.password} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3 mypage-text" controlId="formPassword">
                <Form.Label className='mypage-text-label'>재확인</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="password" placeholder="newPassword" name="newPassword" value={edit.newPassword} onChange={handleInputChange} /> 
            </Form.Group>

            {testpassword && (
                <div style={{ color: 'skyblue', marginBottom: '10px' }}>
                    새 비밀번호와 재확인 비밀번호가 일치하지 않습니다.
                </div>
            )}

            <Form.Group className="mb-3 mypage-text" controlId="formName">
                    <Form.Label className='mypage-text-label'>이름</Form.Label>
                    <Form.Control className='Edit-inputbox Edit-underline' type="text" placeholder="Enter Name" name="name" value={edit.name} onChange={handleInputChange} />
                </Form.Group>

            <Form.Group className="mb-3 mypage-text" controlId="formEmail">
                <Form.Label className='mypage-text-label'>이메일</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="email" placeholder="Enter Email" name="Email" value={edit.Email} onChange={handleInputChange} />
            </Form.Group >

            <div className='flexbox'>
                    <button className="btn-hover color-9" type='submit' onClick={deleteedit}>Complete!!</button>
                </div>
        </Form>
    </Container>
    )
}

export default Edit



