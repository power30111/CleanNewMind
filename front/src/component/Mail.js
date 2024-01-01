import React, { useState, useRef, useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import Chat from '../component/Chat';


const Mail = () => {

    const quillRef = useRef(null);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const token = useSelector((state) => state.token);
    const mail = useSelector((state) => state.mail);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 내용 수정
    const handleEditorChange = (content, delta, source, editor) => {
        dispatch({ type: 'write', payload: { name: 'content', value: content } });

        // 이미지를 드래그하여 놓으면 실행되는 함수
        const container = quillRef.current.getEditor().container;
        // 중복 등록 방지를 위한 이벤트 리스너 제거
        container.removeEventListener('drop', handleImageDrop);
        // 이벤트 리스너 등록
        container.addEventListener('drop', handleImageDrop);
    };

    const handleImageDrop = (e) => {
        e.preventDefault();
        // 들어온 파일 읽기
        const files = e.dataTransfer.files;
    
        if (files.length > 0) {
            const newImages = [...images];
            const newPreviewImages = [...previewImages];
    
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // 이미지 미리보기를 위해 url 설정 
                const imageURL = URL.createObjectURL(file);
                //새로운 이미지를 배열에 추가 
                newImages.push(file);
                //이미지 미리보기를 위한 푸쉬과정 
                newPreviewImages.push(imageURL);
                }
            //미리보기한 이미지를 보기위한 재설정
            setImages(newImages);
            setPreviewImages(newPreviewImages);
        }
    };
    //1. 쪽지 입력창  o
    //2. 기존 메세지 o
    //3. 나와 상대 구분해서 메세지 왼쪽 오른쪽 o
    //4. 


return (
    <div className='flexbox'>
        <div className='mail-Box'>
            <div className='mail-top'>
                <div className=''>
                    <div className='mail-top-title'>제목</div>
                    <input name='title' className='mail-top-input' placeholder='제목'></input>
                </div>

                <div className=''>
                    <div className='mail-top-title'>받는사람</div>
                    <input name='name' className='mail-top-input' placeholder='상대방'></input>
                </div>
            </div>

            <div className='mail-main'>
                <input value={mail.text} placeholder='내용'></input> 
            </div>

            <div className='mail-bot'>
                <button>전송</button>
            </div>

        </div>
        <Chat/>
    </div>
)
}

export default Mail