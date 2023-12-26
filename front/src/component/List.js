import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import axios from 'axios'
import { ShowContent } from '../redux/actions/ShowContent'



const List = (props) => {

        // Axios 인스턴스 생성 및 기본 URL 설정
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const takeboard = useSelector((state)=>state.takeboard)
    const commentList = useSelector((state) => state.commentList)
    const paging = useSelector((state)=>state.paging)
    const isimage = useSelector((state)=>state.isimage)
    const {id, title, writer} =props


    const selectedPage = (()=>{

        // Axios 인스턴스 생성 및 기본 URL 설정
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });

        dispatch({type:'urlid',payload:id})

        console.log("페이징",paging)

        api.get(`/board/list/${id}`,{headers: {
            Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
        }})
        .then((response) => {
                console.log("글 조회 성공")
                console.log("글 수신",response)
                dispatch({type:"getStatus", payload:200})
                dispatch({type:"takecontent",payload:response.data})
                dispatch({type:"getcommentList",payload:response.data.commentList})
                dispatch({type:"urlid",payload:id})
                dispatch(ShowContent.image(takeboard))
                console.log(response.status)
                console.log("taketext",takeboard)
                console.log("taketext",commentList)
                console.log("url아이디",id)
                console.log('isimage',isimage)
                navigate(`/board/list/${id}`)
                
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
                console.log("taketext",takeboard)
                console.log("taketext",commentList)
                console.log("url아이디",id)
                navigate(`/board/list/${id}`)

            }

        });
    })

    return (
        <div>
            <div className='listtop-title' onClick={selectedPage}>
                <div className='list-No'>{id}</div>
                <div className='list-title'>{title}</div>
                <div className='list-writer'>{writer}</div>
            </div>
        </div>
    )
}

export default List

