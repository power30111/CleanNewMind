import React from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/'
import { Await } from 'react-router-dom'


const SelectedPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)


    const id = useSelector((state) => state.taketext.id);
    const taketext = useSelector((state)=>state.taketext)
    console.log("url아이디",id)

    const deletelist = (() => {
        axios.get(`http://localhost:8080/board/list/${id}/delete`,{headers: {
            Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
        }})
        .then((response) => {
            if (response.status === 200) {
                alert('글 삭제 성공')
                console.log("글 삭제 성공")
                navigate('/') 
        }
            else {
            alert('글 삭제 실패');
            }
        })
        .catch(error => {
            console.error('글 삭제 실패 : ', error);
        });
    })

    const goHome = async() =>{
        deletelist()
    }
    /*
    const Retouch = () =>{
        navigate('/')
    }*/

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
                        <button className="btn-hover color-9 " >수정</button>
                        <button className="btn-hover color-9" onClick={goHome}>삭제</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SelectedPage
