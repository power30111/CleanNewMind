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
            
            alert('회원조회 성공');
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
                    <button className="color-9 mypage-btn" onClick={() => openModal('Id')}>Edit</button>
                </div>

                

                <div className="mb-3 mypage-text" controlId="formName">
                    <label className='mypage-text-label'>이름</label>
                    <div>{edit.name}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('name')}>Edit</button>
                </div>

                <div className="mb-3 mypage-text" controlId="formEmail">
                    <label className='mypage-text-label'>이메일</label>
                    <div>{edit.Email}</div>
                    <button className="color-9 mypage-btn" onClick={() => openModal('Email')}>Edit</button>
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
        
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>

        {editField === 'Id' && (
            <Form.Group className="mb-3 mypage-text" controlId="formId">
                <div>{editField}변경</div>
                <Form.Label className='mypage-text-label'>아이디</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="text" placeholder="Enter Id" name="userId" value={edit.userId} onChange={handleInputChange} />
            </Form.Group>
        )}

        {editField === 'name' && (
            <Form.Group className="mb-3 mypage-text" controlId="formName">
                <div>{editField}변경</div>
                <Form.Label className='mypage-text-label'>이름</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="text" placeholder="Enter Name" name="name" value={edit.name} onChange={handleInputChange} />
            </Form.Group>
            )}

        {editField === 'Email' && (
            <Form.Group className="mb-3 mypage-text" controlId="formEmail">
                <div>{editField}변경</div>
                <Form.Label className='mypage-text-label'>이메일</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="email" placeholder="Enter Email" name="Email" value={edit.Email} onChange={handleInputChange} />
            </Form.Group >
                    )}

        {editField === 'password' && (
            <Form>
                <Form.Group className="mb-3 mypage-text" controlId="formPassword">
                    <Form.Label className='mypage-text-label'>새 비밀번호</Form.Label>
                    <Form.Control className='Edit-inputbox Edit-underline' type="password" placeholder="newPassword" name="password" value={edit.password} onChange={handleInputChange} />
                </Form.Group>
    
                <Form.Group className="mb-3 mypage-text" controlId="formPassword">
                    <Form.Label className='mypage-text-label'>재확인</Form.Label>
                    <Form.Control className='Edit-inputbox Edit-underline' type="password" placeholder="newPassword" name="newPassword" value={edit.newPassword} onChange={handleInputChange} /> 
                </Form.Group>

                {testpassword && (
                    <div style={{ color: 'skyblue', marginBottom: '10px' }}>
                        새 비밀번호와 재확인 비밀번호가 일치하지 않습니다.
                    </div>
                )}
            </Form>
            )}
        </Modal>
    </Container>
)}

export default Mypage
