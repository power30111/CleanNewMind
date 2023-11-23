import React from 'react'
import { Form,  Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const  Repairpage= () => {

    /* 리듀서 */
    const user = useSelector((state) => state.user);
    const repair = useSelector((state)=>state.repair)


    const dispatch = useDispatch()

    /* 정보저장 */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({type:'userInfo',payload:{ name, value }});
        dispatch({type:"testPassword", payload:True})
    };
    /*회원가입 성공시 로그인창으로 이동*/
    const navigate = useNavigate()

    const Mypage = ()=>{
        navigate('/Mypage')
    }
    
        /* 클릭이벤트 유저정보 전달(수정 필) */
/*        const handleSubmit=(e)=>{
            e.preventDefault();
    
            axios.get('http://localhost:8080/user/signup',user)
            .then((response) => {
                if (response.status === 200) {
                alert('회원조회 성공');
                console.log("회원조회 성공")
                goLogin()

    
                } else {
                alert('회원조회 실패');
                }
            })
            .catch((error) => {
            console.error('회원조회 에러', error);
            console.log(user)
            });
        }*/

    const comparePassword = () =>{
        if (user.password == repair.password) {
            dispatch({type:"testPassword", payload:True})
        }
    }
    return (
        <Container className='flexbox' >
            <Form className='Box userinfo' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formID">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="text" placeholder="Password" name="password" value={user.password} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="testpassword" value={repair.password} onChange={handleInputChange} /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name="name" value={user.name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="Email" value={user.Email} />
                </Form.Group >
                
                <div className='Loginbtn'>
                    <button className="btn-hover color-9" type='submit' onClick={Mypage}>repair</button>
                </div>
    
            </Form>
        </Container>
    )
}



export default Repairpage