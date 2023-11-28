import axios from 'axios';
import React from 'react'
import {Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';


const EditId = () => {

    /* 리듀서 */
    const testpassword = useSelector((state) => state.testpassword);
    const edit = useSelector((state) => state.edit);
    const token = useSelector((state) => state.token)
    const ModalIsOpen = useSelector((state)=>state.ModalIsOpen)

    const dispatch = useDispatch()

    /*회원가입 성공시 로그인창으로 이동*/
    const navigate = useNavigate()

    const deleteedit = () =>{
        dispatch({type:"delete-edit"})
    }


        dispatch({type : 'openModal', payload : true})

    

        dispatch({type : 'closeModal', payload : false})



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
                    goHome()
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
        
        <Container className='flexbox infobox' >
        <Form className='Box userinfo' onSubmit={handleSubmit}>

            <Form.Group className="mb-3 mypage-text" controlId="formId">
                <Form.Label className='mypage-text-label'>아이디</Form.Label>
                <Form.Control className='Edit-inputbox Edit-underline' type="text" placeholder="Enter Id" name="userId" value={edit.userId} onChange={handleInputChange} />
            </Form.Group>

            <div className='flexbox'>
                    <button className="btn-hover color-9" type='submit'>Complete!!</button>
            </div>
        </Form>
    </Container>
    )
}

export default EditId

/*
    <div>
        <button onClick={openModal}>모달 열기</button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
        <button onClick={closeModal}>닫기</button>
        </Modal>
    </div>
*/


