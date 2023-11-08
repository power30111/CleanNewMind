import {React} from 'react'
import axios from 'axios';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';


const Write = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const goHome = () =>{
        navigate('/')
    }



    /*useEffect(() => {
    if (token!=null){

        axios.get('', {
            headers: {
            Authorization: `Bearer ${token}` // Bearer 토큰 방식 사용
            }
        })
        .then(response => {
            console.log('토큰 넣기 성공:');
        })
        .catch(error => {
            console.error('토큰 넣기 실패 : ', error);
        });


    }
    else{

    }
},[]);
*/


    return (
        <Container className='flexbox'>
            <div className='Write-Box'>
                <div className='Write-page'>
                    <div className='flexbox Write-title'>
                        <textarea className='text-area' placeholder='제목'></textarea>
                    </div>

                    <div className='flexbox Write-text'>
                        <textarea className='text-area' placeholder='내용'></textarea>
                    </div>

                    <div className='Write-btn'>
                        <button class="btn-hover color-9 " type='submit'>저장</button>
                        <button class="btn-hover color-9" onClick={goHome}>취소</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Write