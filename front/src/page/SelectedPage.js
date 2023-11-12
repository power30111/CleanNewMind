import React from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/'
import { useEffect } from 'react'



const SelectedPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const id = useSelector((state) => state.urlid);
    const taketext = useSelector((state)=>state.taketext)

    const goHome = () =>{
        navigate('/')
    }

    



    


    return (
        <Container className='flexbox'>
            <div className='Write-Box'>
                <div className='Write-page'>
                    <div className="mb-3 flexbox Write-title" >
                        <div className='text-area' name="title">
                            {taketext.title}
                        </div>
                    </div>

                    <div className="mb-3 flexbox Write-text">
                        <div className='text-area'  name="content">
                            {taketext.content}
                        </div>
                    </div>

                    <div className='Write-btn'>
                        <button className="btn-hover color-9 " >저장</button>
                        <button className="btn-hover color-9" onClick={goHome}>삭제</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SelectedPage
