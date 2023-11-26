import axios from 'axios';
import React from 'react'
import { Form,  Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {

    /* 리듀서 */
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch()

    /*회원가입 성공시 로그인창으로 이동*/
    const navigate = useNavigate()

    const goEdit = () =>{
        navigate('/Edit')
    }

    
        /* 클릭이벤트 유저정보 전달(수정 필) */
        const handleSubmit=(e)=>{
            e.preventDefault();
    
            axios.get('http://localhost:8080/user/signup',user)
            .then((response) => {
                if (response.status === 200) {
                alert('회원조회 성공');
                console.log("회원조회 성공")


    
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
        <Container className='flexbox infobox'>
        <div className='Box userinfo' onSubmit={handleSubmit}>
                <div className="mb-3 mypage-text" controlId="formID">
                    <label className='mypage-text-label'>아이디</label>
                    <div>{user.userId}</div>
                </div>

                <div className="mb-3 mypage-text" controlId="formPassword">
                    <label className='mypage-text-label'>비밀번호</label>
                    <div type='password'>{user.password}</div>
                </div>

                <div className="mb-3 mypage-text" controlId="formName">
                    <label className='mypage-text-label'>이름</label>
                    <div>{user.name}</div>
                </div>

                <div className="mb-3 mypage-text" controlId="formEmail">
                    <label className='mypage-text-label'>이메일</label>
                    <div>{user.Email}</div>
                </div>

                <div className='flexbox'>
                    <button className="btn-hover color-9" onClick={goEdit}>Edit!!</button>
                </div>
            </div>
    </Container>
    )
}

export default Mypage



