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
    const token = useSelector((state) => state.token);
    const inputRef = useRef(null);  // Ref 생성
    const [open, setOpen] = useState(false);

    //웹소켓 변수 
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);


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
            </div>
            
            <div className='chat-bot' onSubmit={sendMessage}>
                <input 
                    alt='입력창'
                    value={chat.text} 
                    onChange={handleInputChange}>
                </input>
                <button type='submit'>전송</button>
            </div>
        </div>

    </div>
)
}

export default Chat