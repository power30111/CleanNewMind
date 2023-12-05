import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import axios from 'axios'



const List = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector((state) => state.token)
    const taketext = useSelector((state)=>state.taketext)
    const commentList = useSelector((state) => state.commentList)

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
                dispatch({type:"getStatus", payload:200})
                dispatch({type:"takecontent",payload:response.data})
                dispatch({type:"getcommentList",payload:response.data.commentList})
                dispatch({type:"urlid",payload:id})

                console.log(response.status)
                console.log("taketext",taketext)
                console.log("taketext",commentList)
                console.log("url아이디",id)
                
        })
        .catch(error => {
            console.error('글 조회 실패 : ', error);
            
            if (error.response && error.response.status === 400) {
                console.log("400 응답 처리");

                dispatch({type:"getStatus", payload:400})
                dispatch({type:"takecontent",payload:error.response.data})
                dispatch({type:"getcommentList",payload:error.response.data.commentList})
                dispatch({type:"urlid",payload:id})

                console.log(error.response.status)
                console.log("taketext",taketext)
                console.log("taketext",commentList)
                console.log("url아이디",id)

            }

        });
    })

    return (
        <div>
            <div className='listtop-title' onClick={selectedPage}>
                <div className='list-No'>{index + 1}</div>
                <div className='list-title'>{title}</div>
                <div className='list-writer'>{writer}</div>
            </div>
        </div>
    )
}

export default List

