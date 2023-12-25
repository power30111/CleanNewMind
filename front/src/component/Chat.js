import React, { useState, useRef, useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';


const Chat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const chat = useSelector((state)=>state.chat);
    const preveiwBox = useSelector((state)=>state.preveiwBox);
    const token = useSelector((state) => state.token);
    const [images, setImage] = useState(null);
    const [previewImages, setPreviewImage] = useState(null);
    const inputRef = useRef(null);  // Ref 생성
    const [open, setOpen] = useState(false);

    //웹소켓 변수 
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);


    useEffect(() => {
        // 화면 전환 시에 실행할 작업
        dispatch({type:'preveiwBox',payload:false})
        setImage(null);
        setPreviewImage(null);
    
      }, [navigate]); // location.key가 변경될 때마다 useEffect가 실행됩니다.


    //웹소켓 연결 
    
    useEffect(() => {
        // SockJS를 사용하여 WebSocket 연결
        const socket = new SockJS('http://localhost:8080/websocket-endpoint');
        const stomp = Stomp.over(socket);
    
        // WebSocket 연결 시
        stomp.connect({}, () => {
            console.log('WebSocket 연결 성공 ');
            setStompClient(stomp);
        
            // /topic/public 토픽을 구독하여 새로운 메시지 수신
            stomp.subscribe('/topic/public', (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
    
        // 컴포넌트 언마운트 시 WebSocket 연결 해제
        return () => {
            stomp.disconnect();
        };
    }, []);

    // 메시지 전송 함수
    const sendMessage = () => {
        // /app/chat.sendMessage 엔드포인트로 메시지 전송
        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({ content: chat.text }));
        dispatch({type:'chat-text',payload:''})
    };


    const  handleInputChange = (e) => {
        const {value} = e.target;
        dispatch({ type: 'chat-text', payload: value });
    };

    const  handlereceiverChange = (e) => {
        const {value} = e.target;
        dispatch({ type: 'chat-receiver', payload: value });
    };

    const closePreview = () =>{
        setImage(null);
        setPreviewImage(null);
        dispatch({type:'preveiwBox',payload:false})
    }

    const handleImageDrop = (e) => {
        e.preventDefault();
    
    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
        const file = files[0]; // 여기서는 첫 번째 파일만 다룸
        const imageURL = URL.createObjectURL(file);

        setImage(file);
        setPreviewImage(imageURL);
        dispatch({type:'preveiwBox',payload:true})
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

        if (newImages.length > 0) {
            for (let i = 0; i < newImages.length; i++) {
                
                try {
                    const base64Image = await encodeImageToBase64(newImages[i]);
                    const message = chat.text.replace(/<[^>]+>/g, ''); // 정규 표현식을 사용하여 HTML 태그 제거
                    const data ={
                        text: message,
                        image: base64Image,
                    }
                    return data;// 어레이 반환 
                } catch (error) {
                    console.error('이미지를 Base64로 인코딩하는 동안 에러 발생:', error);
                }
            }
        } else if (newImages.length === 0) {
            const message = chat.text.replace(/<[^>]+>/g, ''); // 정규 표현식을 사용하여 HTML 태그 제거
            const data ={
                text: message,
                image: 'null',
            }
            return data;// 어레이 반환 
        }
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (images.length > 0) {
            const setData = {
                content : await readyformdata(images)
            }
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
                
            } catch (error) {
                console.log('전송 실패');
                console.error('에러', error);
                console.log(setData)
            }
        }else if (images.length ===0) {

            const formDataArray = await readyformdata(images);
            const setData = {
                content : formDataArray
            }
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
        
            } catch (error) {
                console.log('전송 실패');
                console.error('에러', error);
                console.log(setData)
            }
        }
    };
return (
    <div className='flexbox'>
        <div className='chat-Box'>

            <div className='chat-top'>
                <div className='chat-recipient'>
                    {open ?  
                        <input value={chat.receiver} onChange={handlereceiverChange} alt='상대방 '></input> : <div>{chat.receiver}</div> 
                    }
                    {open?
                        <button 
                            onClick={()=>{
                                setOpen(!open);
                            }}>저장
                        </button> :
                        <button 
                        onClick={()=>{
                            setOpen(!open);
                            }}>변경
                        </button>}
                </div>
            </div>

            <div className='chat-main'>


                <div className='chat-content-left'>
                    <div className='chat-content-1'>내용 </div>
                </div>
                
                <div className='chat-content-right'>
                    <div className='chat-content-2'>내용 </div>
                </div>

                <div>
                    {messages.map((message, index) => (
                        <div className='chat-content-2' key={index}>{message.content}</div>
                    ))}
                </div>

                    {preveiwBox ?
                        <div className='previewBox'>
                            <span onClick={closePreview}>x</span>
                            {<img 
                                className='chat-image'
                                src={previewImages}
                                alt="Preview"
                                style={{ maxWidth: '50%', maxHeight: '10%', marginRight: '10px' }}
                            />}
                        </div>
                        :
                        <div></div>
                    }

            </div>
            
            <div className='chat-bot' onDrop={handleImageDrop} onSubmit={sendMessage}>
                <input 
                    alt='입력창'
                    ref={inputRef}
                    value={chat.text} 
                    onDragOver={(e) => e.preventDefault()}
                    onChange={handleInputChange}>
                </input>
                <button type='submit'>전송</button>
            </div>
        </div>

    </div>
)
}

export default Chat