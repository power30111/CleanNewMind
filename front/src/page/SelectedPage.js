import React from 'react'
import axios from 'axios'
import {Form, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/'
import { useEffect } from 'react';
import Comment from '../component/Comment'


const SelectedPage = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const text = useSelector((state) => state.text)
    const comment = useSelector((state)=>state.comment)
    const commentList = useSelector((state)=>state.commentList)
    const id = useSelector((state) => state.urlid);
    const getStatus = useSelector((state)=>state.getStatus)


    const goHome = () =>{
        deletelist()
    }
    const rewrite = () =>{
        navigate('/Rewrite')
    }

    const commentReset = ()=>{
        dispatch({type:'comment-reset'})
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({type:'comment',payload:{ name, value }});
    };

    /* 삭제요청 */
    const deletelist = (() => {
        axios.get(`http://localhost:8080/board/list/${id}/delete`,{headers: {
            Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
        }})
        .then((response) => {
                alert('글 삭제 성공')
                console.log("글 삭제 성공")
                navigate('/') 
        })
        .catch(error => {
            console.error('글 삭제 실패 : ', error);
        });
    })

        /* 댓글 달기 */
    const handleSubmit=(e)=>{
        e.preventDefault();

        axios.post(`http://localhost:8080/board/comment/${id}`, comment.content, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
                alert('올리기 성공');
                console.log("올리기 성공")
                console.log('내용:',  comment)  
                commentReset()
                recall()
                
        })
        .catch((error) => {
        console.error('전송 에러', error);
        console.log('내용:',  comment)
        });
    }   
        /* 서버에 전송 후 댓글 받기 */
    const recall = (()=>{

        axios.get(`http://localhost:8080/board/list/${id}`,{headers: {
            Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
        }})
        .then((response) => {
                console.log("댓글 조회 성공")
                console.log("댓글 수신",response)
                dispatch({type:"getcommentList",payload:response.data.commentList})
                console.log("댓글",commentList)
        })
        .catch(error => {
            console.error('댓글 조회 실패 : ', error);
        });
    })
    

    return (
        <Container className='flexbox-column'>
            <div className='Write-Box'>
                <div className='Write-page'>
                    <div className="flexbox Write-title selectedpage-title-size" >
                        <div className='text-area selectedpage-title' name="title">
                            {text.title}
                        </div>
                    </div>

                    <div className=" flexbox Write-text selectedpage-content">
                        <div className='text-area '  name="content">
                            {text.content}
                        </div>
                    </div>

                    <Form className='flexbox comment-submit' onSubmit={handleSubmit}>
                        <input type='text'  className='comment-inputbox underline'placeholder='댓글 입력' name="content" value={comment.content} onChange={handleInputChange} />
                        <button type="submit" className="color-9 comment-btn" >등록</button>
                    </Form>

                    {getStatus === 200 && (
                        <div className='Write-btn'>
                            <button className="btn-hover color-9">수정</button>
                            <button className="btn-hover color-9" onClick={goHome}>삭제</button>
                        </div>
                    )}
                    {getStatus === 400 && <div></div>}

                    <div> 
                        <div className='comment-title'>Comments</div>
                        {commentList.map((Item) => (
                            <div key={Item.id} className='underline'>
                                <div className='comment flexbox'>
                                    <div className='comment-inputbox'>
                                        <div className='comment-name'>{Item.name}</div>
                                        <div>{Item.content}</div>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            

            
        </Container>
    )
}

export default SelectedPage

/*
            <div>
                {data.map((item,) => (
                    <Comment key={item}/>
                ))}
            </div>
*/


/*                        {(istoken&&(
                            <div className='Write-btn'>
                                <button className="btn-hover color-9 " >수정</button>
                                <button className="btn-hover color-9" onClick={goHome}>삭제</button>
                            </div>
                        ))|| (isLogin&&(
                            <div className='Write-btn'>
                                <button className="btn-hover color-9 " >수정</button>
                                <button className="btn-hover color-9" onClick={goHome}>삭제</button>
                            </div>
                        ))||
                            <div></div>
                        }
                        




                                
        useEffect(()=>{
            axios.get('http://localhost:8080/board/comment/{id}')
            .then((response) => {
                    console.log("댓글 조회 성공")
                    dispatch({type:'comment',payload:response.data})
                    console.log("수신",response.data)
                    console.log(data)
            })
            .catch(error => {
                console.error('댓글 조회 실패 : ', error);
                console.log(data)
            });
        },[])



        {commentList.map((commentItem) => (
                            <Comment key={commentItem.name} comment={commentItem} />
                        ))}
*/
