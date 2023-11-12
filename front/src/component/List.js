import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import axios from 'axios'



const List = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector((state) => state.token)
    const taketext = useSelector((state)=>state.taketext)

    const {id, title, writer} =props


    const detailPage = (()=>{
        navigate(`/board/list/${id}`)
        dispatch({type:'urlid',payload:id})

        axios.get(`http://localhost:8080/board/list/${id}`,{headers: {
            Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
        }})
        .then((response) => {
            if (response.status === 200) {
                console.log("글 조회 성공")
                console.log("글 수신",response)
                dispatch({type:"takecontent",payload:response.data})
                console.log("taketext",taketext)
        }
            else {
            alert('글 조회 실패');
            console.log("글 수신",response)

            }
        })
        .catch(error => {
            console.error('글 조회 실패 : ', error);
            console.log("url아이디",id)

        });


    })

    return (
        <div className='flexbox list' onClick={detailPage}>
            <div className='list-No'>{id}</div>
            <div className='list-title'>{title}</div>
        </div>
    )
}

export default List

