import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import axios from 'axios'



const List = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector((state) => state.token)
    const taketext = useSelector((state)=>state.taketext)

    const {id, title, writer, index} =props


    const selectedPage = (()=>{
        navigate(`/board/list/${id}`)
        dispatch({type:'urlid',payload:id})

        axios.get(`http://localhost:8080/board/list/${id}`,{headers: {
            Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
        }})
        .then((response) => {
                console.log("글 조회 성공")
                console.log("글 수신",response)
                dispatch({type:"takecontent",payload:response.data})
                dispatch({type:"urlid",payload:id})
                console.log("taketext",taketext)
                console.log("url아이디",id)
        })
        .catch(error => {
            console.error('글 조회 실패 : ', error);
            console.log("url아이디",id)

        });
    })

    return (
        <div>
            <div className='listtop-title' onClick={selectedPage}>
                <div className='list-No'>{index + 1}</div>
                <div className='list-title'>{title}</div>
            </div>
        </div>
    )
}

export default List

