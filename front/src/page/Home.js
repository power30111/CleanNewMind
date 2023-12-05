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
                console.log("게시글 조회 성공")
                dispatch({type:'boardlist',payload:response.data})
                console.log("수신",response.data)
                console.log(data)
                console.log ('리스폰', response)
        })
        .catch(error => {
            console.error('게시글 조회 실패 : ', error);
            console.log(data)
        });
    },[])

    return (
        <Container>
            <div className='hometop'>
                <h1 className='hometop-text'>게시글</h1>
            </div>

            <div className='listbox'>
                <div className='boardlist'>
                    <div className='listtop-title'>
                        <div className='list-No'>No</div>

                        <div className='list-title'>제목</div>

                        <div className='list-writer'>작성자</div>
                    </div>

                    <div className='max'>
                        {data.map((item, index) => (
                            <List key={item.id} {...item} index={index}/>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div className='homebot-btn'>
                    <div className='flexbox'>
                        
                        <button className="btn-hover color-9" onClick={goWrite}>글쓰기</button>
                    </div>
                </div>
                <div className='flexbox '>
                    <input className='homebot-input' name="search" placeholder='검색창' />
                    <button className="btn-hover color-9 homebot-search">검색</button>
                </div>
            </div>
        </Container>
        
    )
}

export default Home
