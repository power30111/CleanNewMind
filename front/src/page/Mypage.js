import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Form,  Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {

    /* 리듀서 */
    const edit = useSelector((state) => state.edit);
    const token = useSelector((state) => state.token)

    const dispatch = useDispatch()

    /*회원가입 성공시 로그인창으로 이동*/
    const navigate = useNavigate()

    const goEdit = () =>{
        navigate('/Edit')
    }

    
    useEffect(()=>{
        axios.get('http://localhost:8080/user/getMyInfo',{
            headers: {
                Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
            }
        })
        .then((response) => {
            
            alert('회원조회 성공');
            console.log("회원조회 성공", response)
            console.log("회원조회 성공", response.data)
            dispatch({type:'getMyInfo', payload:response.data})
            console.log(edit)
        })
        .catch((error) => {
        console.error('회원조회 에러', error);
        console.log(edit)
        });
        },[])
    return (
        <Container className='flexbox infobox'>
        <div className='Box userinfo'>
                <div className="mb-3 mypage-text" controlId="formID">
                    <label className='mypage-text-label'>아이디</label>
                    <div>{edit.userId}</div>
                </div>

                <div className="mb-3 mypage-text" controlId="formPassword">
                    <label className='mypage-text-label'>비밀번호</label>
                    <div type='password'>********</div>
                </div>

                <div className="mb-3 mypage-text" controlId="formName">
                    <label className='mypage-text-label'>이름</label>
                    <div>{edit.name}</div>
                </div>

                <div className="mb-3 mypage-text" controlId="formEmail">
                    <label className='mypage-text-label'>이메일</label>
                    <div>{edit.Email}</div>
                </div>

                <div className='flexbox'>
                    <button className="btn-hover color-9" onClick={goEdit}>Edit!!</button>
                </div>
            </div>
    </Container>
    )
}

export default Mypage



