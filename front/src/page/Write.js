import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageDrop } from 'quill-image-drop-module';

// 나머지 코드는 이전과 동일
ReactQuill.Quill.register('modules/imageDrop', ImageDrop);

const Write = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const text = useSelector((state) => state.text);
    const token = useSelector((state) => state.token);
    const quillRef = useRef(null);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);



    const goHome = () => {
        navigate('/');
    };
    

    //제목 수정 
    const handleInputChange = (e) => {
        const {value} = e.target;
        dispatch({ type: 'title', payload: value });
    };
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

    // 사진을 인코딩 하는 함수
    const encodeImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            //사진을 읽기
            const reader = new FileReader();
            //사진 읽기 성공시 
            reader.onload = () => {
                // result 속성에 Base64 인코딩된 문자열
                const base64Image = reader.result.split(',')[1];
                console.log(base64Image)
                resolve(base64Image);
            };
            //읽기에 실패시 실행
            reader.onerror = (error) => {
                reject(error);
            };
    
            reader.readAsDataURL(file);
        });
    };

    const readyformdata = async (newImages) => {
        //폼데이터 어레이 생성
        const formDataArray = [];

        if (newImages.length > 0) {
            for (let i = 0; i < newImages.length; i++) {
                
                try {
                    const base64Image = await encodeImageToBase64(newImages[i]);
                    const message = text.content.replace(/<[^>]+>/g, ''); // 정규 표현식을 사용하여 HTML 태그 제거
                    const data ={
                        order: i,
                        text: message,
                        image: base64Image,
                    }
                    formDataArray.push(data); // 어레이에 데이터 전달
                } catch (error) {
                    console.error('이미지를 Base64로 인코딩하는 동안 에러 발생:', error);
                }
            }
        } else if (newImages.length === 0) {
            const data ={
                order: '0',
                text: text.content,
                image: 'null',
            }
            formDataArray.push(data);//어레이에 데이터 전달 
        }
        return formDataArray;// 어레이 반환 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (images.length > 0) {
            const formDataArray = await readyformdata(images);
            const dataToSend = []
            const setData = {
                title : text.title,
                content : formDataArray
            }
            dataToSend.push(setData)
            // 이미지 인코딩이 완료된 상태이므로 서버로 전송
            try {
                const response = await axios.post('http://localhost:8080/board/write', setData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                console.log('전송 성공');
                console.log('응답 데이터:', response.data);
                console.log(setData)
                goHome()
            } catch (error) {
                console.log('전송 실패');
                console.error('에러', error);
                console.log(setData)
            }
        }else if (images.length ===0) {

            const formDataArray = await readyformdata(images);
            const dataToSend = []
            const setData = {
                title : text.title,
                content : formDataArray
            }
            dataToSend.push(setData)
            // 보낼 데이터를 완성후 전송 
            try {
                const response = await axios.post('http://localhost:8080/board/write', setData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                console.log('전송 성공');
                console.log('응답 데이터:', response.data);
                console.log(setData)
                goHome()
            } catch (error) {
                console.log('전송 실패');
                console.error('에러', error);
                console.log(setData)
            }
        }
    };


    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
        // 이미지 드롭 모듈 활성화
        imageDrop: true,
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'link',
        'image',
    ];

    // useEffect를 사용하여 컴포넌트가 마운트될 때 Quill 모듈 설정
    useEffect(() => {
        if (quillRef.current) {
            quillRef.current.getEditor().enable(true);
        }
    }, []);

    return (
        <Container className="flexbox">
            <Form className="Write-Box" onSubmit={handleSubmit}>
                <Form.Group className="Write-page">
                    <Form.Group className="flexbox Write-title">
                        <Form.Control
                            className="text-area"
                            placeholder="제목"
                            name="title"
                            value={text.title}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="flexbox Write-text">
                        <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={text.content}
                            onChange={handleEditorChange}
                            modules={modules}
                            formats={formats}
                        />
                    </Form.Group>

                    <div className="Write-btn">
                        <button className="btn-hover color-9" type="submit">
                            저장
                        </button>
                        <button className="btn-hover color-9" onClick={goHome}>
                            취소
                        </button>
                    </div>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Write;