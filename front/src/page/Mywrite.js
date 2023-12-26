import React from 'react'
import { Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import List from '../component/List';



const Mywrite = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goWrite = () =>{
        navigate('/Write')
    }

    // Axios 인스턴스 생성 및 기본 URL 설정
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });


    const data = useSelector((state) => state.data)
/**/
    useEffect(()=>{
        api.get('/board/list')
        .then((response) => {
                console.log("게시글 조회 성공")
                dispatch({type:'boardlist',payload:response.data})
                console.log("수신",response.data)
                console.log(data)
        })
        .catch(error => {
            console.error('게시글 조회 실패 : ', error);
            console.log(data)
        });
    },[])

    return (
        <Container >
            <div className='hometop'>
                <h1 className='hometop-text'>나의 게시글</h1>
            </div>

            <div className='listbox'>
                <div className='boardlist'>
                    <div className='listtop'>
                        <div className='list-No'>No</div>

                        <div className='list-title'>제목</div>
                    </div>

                    <div className='max'>
                        {data.map(item => (
                            <List {...item} />
                        ))}
                    </div>
                </div>

            </div>
            <div className='homebot Write-btn'>
            <button className="btn-hover color-9" onClick={goWrite}>글쓰기</button>
            </div>
        </Container>
        
    )
}

export default Mywrite
