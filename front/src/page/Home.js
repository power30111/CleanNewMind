import React from 'react'
import { Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import List from '../component/List';



const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goWrite = () =>{
        navigate('/Write')
    }


    const data = useSelector((state) => state.data)
/**/
    useEffect(()=>{
        axios.get('http://localhost:8080/board/list')
        .then((response) => {
            if (response.status === 200) {
                console.log("게시글 조회 성공")
                dispatch({type:'boardlist',payload:response.data})
                console.log("수신",response.data)
                console.log(data)
            }
            else {
            alert('게시글 조회 실패');
            console.log(data)
            }
        })
        .catch(error => {
            console.error('게시글 조회 실패 : ', error);
            console.log(data)
        });
    },[])

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

export default Home
