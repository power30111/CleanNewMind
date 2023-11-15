import axios from 'axios';
import React from 'react'
import { Form,  Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Userpage = () => {

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
    
            axios.get('http://localhost:8080/user/signup',user)
            .then((response) => {
                if (response.status === 200) {
                alert('회원조회 성공');
                console.log("회원조회 성공")
                goLogin()

    
                } else {
                alert('회원조회 실패');
                }
            })
            .catch((error) => {
            console.error('회원조회 에러', error);
            console.log(user)
            });
        }
    return (
        <Container className='flexbox' >
            <Form className='Box userinfo' onSubmit={handleSubmit}>
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
                    <Form.Control type="text" placeholder="Enter Name" name="name" value={user.name} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="Email" value={user.Email} disabled/>
                </Form.Group >
                <div className='Loginbtn'>
                    <button className="btn-hover color-9" type='submit'>Sign Up!</button>
                </div>
                
            </Form>
        </Container>
    )
}

export default Userpage



