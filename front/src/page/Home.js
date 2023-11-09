import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate()

    const goWrite = () =>{
        navigate('/Write')
    }

    const token = useSelector((state) => state.token)
/*
    useEffect(()=>{
        axios.get('http://localhost:8080/board/list',{
            headers: {
                Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
                }
        })
        .then((response) => {
            if (response.status === 200) {
                console.log("게시글 조회 성공")
            }
            else {
            alert('게시글 조회 실패');
            }
        })
        .catch(error => {
            console.error('게시글 조회 실패 : ', error);
        });
    },[])
*/

    return (
        <Container >
            <div className='hometop'>
                <h1 className='hometop-text'>게시글</h1>
            </div>

            <div className='listbox'>
                <div className='boardlist'>
                    <div className='listtop'>
                        <div className='list-No'>No</div>
                        <div className='list-title'>제목</div>
                    </div>
                </div>

            </div>
            <div className='homebot Write-btn'>
            <button class="btn-hover color-9" onClick={goWrite}>글쓰기</button>
            </div>
        </Container>
        
    )
}

export default Home