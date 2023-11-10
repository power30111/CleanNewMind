import React from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/'
import { useEffect } from 'react'



const SelectedPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const id = useParams();

    const text = useSelector((state) => state.text);

    const goHome = () =>{
        navigate('/')
    }

    const selectid=(()=>{
        dispatch({type:"selectid",payload:{id}})
    })
    useEffect(()=>{
        selectid()
    },[])

    


    return (
        <Container className='flexbox'>
            <div className='Write-Box'>
                <div className='Write-page'>
                    <div className="mb-3 flexbox Write-title" >
                        <div className='text-area' name="title">
                            {text.title}
                        </div>
                    </div>

                    <div className="mb-3 flexbox Write-text">
                        <div className='text-area'  name="content">
                            {text.content}
                        </div>
                    </div>

                    <div className='Write-btn'>
                        <button class="btn-hover color-9 " >저장</button>
                        <button class="btn-hover color-9" onClick={goHome}>삭제</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SelectedPage
