import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Form,  Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Chat from '../component/Chat';

const Mypage = () => {

        // Axios 인스턴스 생성 및 기본 URL 설정
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });

    /* 리듀서 */
    const myInfo = useSelector((state) => state.myInfo);
    const edit = useSelector((state) => state.edit);
    const token = useSelector((state) => state.token)
    const editField = useSelector((state) => state.editField)
    const testpassword = useSelector((state) => state.testpassword);
    const modalIsOpen = useSelector((state)=>state.modalIsOpen)

    const dispatch = useDispatch()

    /*회원가입 성공시 로그인창으로 이동*/
    //const navigate = useNavigate()

    const openModal=(field)=>{
        dispatch({type : 'openModal', payload : true})
        dispatch({type : 'getEditField', payload : field})
    }
    const closeModal=()=>{
        dispatch({type : 'closeModal', payload : false})
    }

    const comparePassword = () =>{
        if (edit.newPassword !== edit.password) {
            dispatch({type:"testPassword", payload: false})
            console.log('비밀번호 일치하지 않음')
            console.log(testpassword)
        }
        else {
            dispatch({type:"testPassword", payload: true})
            console.log(testpassword)

            dispatch({type:'getmyInfo', payload:updateData})
            

            api.post('/user/accountUpdate',updateData,{
                headers: {
                    Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
                }
            })
            .then((response) => {
                alert('변경 성공');
                console.log("회원 정보 수정 성공")
                console.log(edit)
                deleteedit()
            })
            .catch((error) => {
                console.error('변경 에러', error);
                console.log(edit)
                deleteedit()
            });
        }
        
    }
    
    const deleteedit = () =>{
        dispatch({type:"delete-edit"})
    }


    useEffect(()=>{
        api.get('/user/getMyInfo',{
            headers: {
                Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
            }
        })
        .then((response) => {
            console.log("회원조회 성공", response)
            console.log("회원조회 성공", response.data)
            dispatch({type:'getMyInfo', payload:response.data})
            console.log(edit)
        })
        .catch((error) => {
        console.error('회원조회 에러', error);
        console.log(edit)
        });
    },[])

    /* 정보저장 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({type:'edit',payload:{ name, value }});
        };
    
    // editField에 따라 서버로 전송할 필드를 동적으로 결정합니다.
    const updateData = {
        [editField]: edit[editField],

    };

    /* 클릭이벤트 유저정보 전달(수정 필) */
    const handleSubmit=(e)=>{
        dispatch({type:'getmyInfo', payload:updateData})
        e.preventDefault();
    
            api.post('/user/accountUpdate',updateData,{
                headers: {
                    Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
                }
            })
            .then((response) => {
                alert('변경 성공');
                console.log("회원 정보 수정 성공")
                console.log(edit)
                deleteedit()
            })
            .catch((error) => {
                console.error('변경 에러', error);
                console.log(edit)
                deleteedit()
            });
        }
    


    return (
        <Container className='flexbox-column infobox'>
            <div className='Box userinfo'>
                <div className="mb-3 mypage-text" controlId="formID">
                    <label className='mypage-text-label'>아이디</label>
                    <div>{myInfo.userId}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('userId')}>Edit</button>
                </div>

                

                <div className="mb-3 mypage-text" controlId="formName">
                    <label className='mypage-text-label'>이름</label>
                    <div>{myInfo.name}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('name')}>Edit</button>
                </div>

                <div className="mb-3 mypage-text" controlId="formEmail">
                    <label className='mypage-text-label'>이메일</label>
                    <div>{myInfo.email}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('email')}>Edit</button>
                </div>

            </div>
            <div className='mypage-box'>
                <div className=" mypage-text" controlId="formPassword">
                    <label className='mypage-text-label'>비밀번호</label>
                    <div type='password'>********</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('password')}>Edit</button>
                </div>
            </div>


        {/*팝업창*/}
        
        <Modal isOpen={modalIsOpen}  shouldCloseOnOverlayClick={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    width: '300px',
                    height: '500px',
                    margin: 'auto',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            }}
            
        >

        {editField === 'userId' && (
            <Form.Group className="" controlId="formId">
                <div className='editField-title'>아이디 변경</div>
                <Form.Label className=''>아이디</Form.Label>
                <Form.Control className='' type="text" placeholder="Enter Id" name="userId" value={edit.userId} onChange={handleInputChange} />
                <div className='editField-btn-duo'>
                    <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                    <div className='editField-btn-right' onClick={handleSubmit}>변경</div>
                </div>
            </Form.Group>
        )}

        {editField === 'name' && (
            <Form.Group  controlId="formName">
                <div className='editField-title'>이름 변경</div>
                <Form.Label className=''>이름</Form.Label>
                <Form.Control className='' type="text" placeholder="Enter Name" name="name" value={edit.name} onChange={handleInputChange} />
                <div className='editField-btn-duo'>
                    <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                    <div className='editField-btn-right' onClick={handleSubmit}>변경</div>
                </div>
            </Form.Group>
            )}

        {editField === 'email' && (
            <Form.Group  controlId="formEmail">
                <div className='editField-title'>이메일 변경</div>
                <Form.Label className=''>이메일</Form.Label>
                <Form.Control className='' type="email" placeholder="Enter Email" name="email" value={edit.email} onChange={handleInputChange} />
                <div className='editField-btn-duo'>
                    <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                    <div className='editField-btn-right' onClick={handleSubmit}>변경</div>
                </div>
            </Form.Group >
                    )}

        {editField === 'password' && (
            <div>
                <div className='editField-title'>비밀번호 변경</div>
                <Form>
                    <Form.Group controlId="formPassword">
                        <Form.Label className=''>이전 비밀번호</Form.Label>
                        <Form.Control  type="password" placeholder="exPassword" name="exPassword" value={edit.exPassword} onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label className=''>새 비밀번호</Form.Label>
                        <Form.Control  type="password" placeholder="newPassword" name="newPassword" value={edit.newPassword} onChange={handleInputChange} />
                    </Form.Group>
        
                    <Form.Group className="" controlId="formPassword">
                        <Form.Label className=''>재확인</Form.Label>
                        <Form.Control  type="password" placeholder="password" name="password" value={edit.password} onChange={handleInputChange} /> 
                    </Form.Group>

                    {testpassword && (
                        <div style={{ color: 'skyblue', marginBottom: '10px' }}>
                            새 비밀번호와 재확인 비밀번호가 일치하지 않습니다.
                        </div>
                    )}

                    <div className='editField-btn-duo'>
                        <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                        <div className='editField-btn-right' onClick={comparePassword}>변경</div>
                    </div>

                </Form>
            </div>
            )}
        </Modal>
        <Chat/>
    </Container>
)}

export default Mypage
