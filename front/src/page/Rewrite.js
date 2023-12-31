import React from 'react'
import axios from 'axios';
import { Container, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import Chat from '../component/Chat';


const Rewrite = () => {

    // Axios 인스턴스 생성 및 기본 URL 설정
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const text = useSelector((state) => state.text)
    const token = useSelector((state) => state.token)
    const urlid = useSelector((state)=>state.urlid)

    const goHome = () =>{
        navigate('/')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({type:'write',payload:{ name, value }});
    };

    /* 클릭이벤트 글정보 전달 */
    const handleSubmit=(e)=>{
        e.preventDefault();

        api.post(`/board/list/${urlid}/update`,text,{
            headers: {
                Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
            }
        })
        .then((response) => {
                alert('올리기 성공');
                console.log("올리기 성공")
                console.log('내용:',  text)
                dispatch({type:"reset"})
                goHome()
        })
        .catch((error) => {
        console.error('전송 에러', error);
        console.log('urlid', urlid)
        console.log('내용:',  text)
        });
    }

    return (
        <Container className='flexbox'>
            <Form className='Write-Box' onSubmit={handleSubmit}>
                <Form.Group className='Write-page'>
                    <Form.Group className="mb-3 flexbox Write-title" >
                        <Form.Control className='text-area'  name="title" value={text.title} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3 flexbox Write-text">
                        <Form.Control className='text-area'  name="content" value={text.content} onChange={handleInputChange}/>
                    </Form.Group>

                    <div className='Write-btn'>
                        <button className="btn-hover color-9 " type='submit'>저장</button>
                        <button className="btn-hover color-9" onClick={goHome}>취소</button>
                    </div>
                </Form.Group>
            </Form>
            <Chat/>
        </Container>
    )   
}

export default Rewrite