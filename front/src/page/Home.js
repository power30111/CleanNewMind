import React from 'react'
import { Container, Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {

    return (
        <Container className='homepage' >
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
            <div className='homebot'>
                <Button variant="outline-primary">글쓰기</Button>
            </div>
        </Container>
        
    )
}

export default Home