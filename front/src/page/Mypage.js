import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Form,  Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Mypage = () => {

    /* 리듀서 */
    const edit = useSelector((state) => state.edit);
    const token = useSelector((state) => state.token)
    const editField = useSelector((state) => state.editField)
    const testpassword = useSelector((state) => state.testpassword);
    const modalIsOpen = useSelector((state)=>state.modalIsOpen)

    const dispatch = useDispatch()

    /*회원가입 성공시 로그인창으로 이동*/
    const navigate = useNavigate()

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
        }
        else {
            dispatch({type:"testPassword", payload: true})
        }
    }
    
    const deleteedit = () =>{
        dispatch({type:"delete-edit"})
    }


    useEffect(()=>{
        axios.get('http://localhost:8080/user/getMyInfo',{
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
        
        /* 클릭이벤트 유저정보 전달(수정 필) */
        const handleSubmit=(e)=>{
            e.preventDefault();
            comparePassword()
        
            if (testpassword == true) {
                axios.get('http://localhost:8080/user/accountUpdate',edit,{
                    headers: {
                        Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
                    }
                })
                .then((response) => {
                    alert('변경 성공');
                    console.log("회원 정보 수정 성공")
                    deleteedit()
                })
                .catch((error) => {
                    console.error('변경 에러', error);
                    console.log(edit)
                    deleteedit()
                });
            }
            else {
                alert ('비밀번호가 일치 하지 않습니다.')
                console.log(edit)
                dispatch({type:"testPassword", payload: true})
                deleteedit()
            }
        }


    return (
        <Container className='flexbox-column infobox'>
            <div className='Box userinfo'>
                <div className="mb-3 mypage-text" controlId="formID">
                    <label className='mypage-text-label'>아이디</label>
                    <div>{edit.userId}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('아이디')}>Edit</button>
                </div>

                

                <div className="mb-3 mypage-text" controlId="formName">
                    <label className='mypage-text-label'>이름</label>
                    <div>{edit.name}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('이름')}>Edit</button>
                </div>

                <div className="mb-3 mypage-text" controlId="formEmail">
                    <label className='mypage-text-label'>이메일</label>
                    <div>{edit.email}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('이메일')}>Edit</button>
                </div>

            </div>
            <div className='mypage-box'>
                <div className=" mypage-text" controlId="formPassword">
                    <label className='mypage-text-label'>비밀번호</label>
                    <div type='password'>********</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('비밀번호')}>Edit</button>
                </div>
            </div>


        {/*팝업창*/}
        
        <Modal isOpen={modalIsOpen}  shouldCloseOnOverlayClick={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    width: '15%',
                    height: '40%',
                    margin: 'auto',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            }}
            
        >

        {editField === '아이디' && (
            <Form.Group className="" controlId="formId">
                <div className='editField-title'>{editField} 변경</div>
                <Form.Label className=''>아이디</Form.Label>
                <Form.Control className='' type="text" placeholder="Enter Id" name="userId" value={edit.userId} onChange={handleInputChange} />
                <div className='editField-btn-duo'>
                    <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                    <div className='editField-btn-right' onClick={handleSubmit}>변경</div>
                </div>
            </Form.Group>
        )}

        {editField === '이름' && (
            <Form.Group  controlId="formName">
                <div className='editField-title'>{editField} 변경</div>
                <Form.Label className=''>이름</Form.Label>
                <Form.Control className='' type="text" placeholder="Enter Name" name="name" value={edit.name} onChange={handleInputChange} />
                <div className='editField-btn-duo'>
                    <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                    <div className='editField-btn-right' onClick={handleSubmit}>변경</div>
                </div>
            </Form.Group>
            )}

        {editField === '이메일' && (
            <Form.Group  controlId="formEmail">
                <div className='editField-title'>{editField} 변경</div>
                <Form.Label className=''>이메일</Form.Label>
                <Form.Control className='' type="email" placeholder="Enter Email" name="Email" value={edit.email} onChange={handleInputChange} />
                <div className='editField-btn-duo'>
                    <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                    <div className='editField-btn-right' onClick={handleSubmit}>변경</div>
                </div>
            </Form.Group >
                    )}

        {editField === '비밀번호' && (
            <div>
                <div className='editField-title'>{editField} 변경</div>
                <Form>
                    <Form.Group controlId="formPassword">
                        <Form.Label className=''>새 비밀번호</Form.Label>
                        <Form.Control className='' type="password" placeholder="newPassword" name="password" value={edit.password} onChange={handleInputChange} />
                    </Form.Group>
        
                    <Form.Group className="" controlId="formPassword">
                        <Form.Label className=''>재확인</Form.Label>
                        <Form.Control className='' type="password" placeholder="newPassword" name="newPassword" value={edit.newPassword} onChange={handleInputChange} /> 
                    </Form.Group>

                    <div className='editField-btn-duo'>
                        <div className='editField-btn-left' onClick={closeModal}>닫기</div>
                        <div className='editField-btn-right' onClick={handleSubmit}>변경</div>
                    </div>

                    {testpassword && (
                        <div style={{ color: 'skyblue', marginBottom: '10px' }}>
                            새 비밀번호와 재확인 비밀번호가 일치하지 않습니다.
                        </div>
                    )}
                </Form>
            </div>
            )}
        </Modal>
    </Container>
)}

export default Mypage
