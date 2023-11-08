import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    const goWrite = () =>{
        navigate('/Write')
    }

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