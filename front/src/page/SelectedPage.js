import React from 'react'
import axios from 'axios'
import {Form, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/'
import { useEffect } from 'react';
import ImageDecoding from '../component/ImageDecoding'
import Chat from '../component/Chat';
import { ShowContent } from '../redux/actions/ShowContent'


const SelectedPage = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const takeboard = useSelector((state) => state.takeboard)
    const comment = useSelector((state)=>state.comment)
    const commentList = useSelector((state)=>state.commentList)
    const id = useSelector((state) => state.urlid);
    const getStatus = useSelector((state)=>state.getStatus)
    const isimage = useSelector((state) => state.isimage);
    

        // Axios 인스턴스 생성 및 기본 URL 설정
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });

    useEffect(() => {
        dispatch(ShowContent.image(takeboard))
    }, []);


    const takeContent=[]
        takeContent.push(takeboard.content)

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
        api.get(`/board/list/${id}/delete`,{headers: {
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

        api.post(`/board/comment/${id}`, comment.content, {
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

        api.get(`/board/list/${id}`,{headers: {
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
                            {takeboard.title}
                        </div>
                    </div>

                    <div className=" flexbox Write-text selectedpage-content">
                            <div  className="text-area" name="content">
                                {takeboard.content.map((item) => (
                                    <div key={item.order} className="text-area" name="content">
                                        {item && ( // item이 정의되어 있는지 확인
                                            <div>
                                                    <div>
                                                        {item.text}
                                                        {isimage?  <ImageDecoding base64Data={item.image}/>:<div style={{display:'none'}}></div>}
                                                    </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                    </div>

                    <Form className='flexbox comment-submit' onSubmit={handleSubmit}>
                        <input type='text'  className='comment-inputbox underline'placeholder='댓글 입력' name="content" value={comment.content} onChange={handleInputChange} />
                        <button type="submit" className="color-9 comment-btn" >등록</button>
                    </Form>

                    {getStatus === 200 && (
                        <div className='Write-btn'>
                            <button className="btn-hover color-9" onClick={rewrite}>수정</button>
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
            <Chat/>
        </Container>
    )
}

export default SelectedPage

/*
{takeContent.map((item) => (
                            <div key={item.order} className="text-area" name="content">
                                {item && ( // item이 정의되어 있는지 확인
                                    <div>
                                        {isimage ? (
                                            <div>
                                                {takeboard.text}
                                                {isimage && <ImageDecoding base64Data={takeboard.image} />}
                                            </div>
                                        ) : (
                                            <div>
                                                {takeboard.content[0].text}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}


    {takeboard.content[0].text}
    {takeboard.content[0].image && <ImageDecoding base64Data={takeboard.content[0].image} />}
*/