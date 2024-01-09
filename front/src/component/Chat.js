import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';


const Chat = () => {

    const dispatch = useDispatch();

    const chat = useSelector((state)=>state.chat);
    const token = useSelector((state) => state.token);
    const [open, setOpen] = useState(false);
    const [OpenChat, setOpenChat] = useState(false);

    //웹소켓 변수 
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);


    //웹소켓 연결 
    
    useEffect(() => {
        // SockJS를 사용하여 WebSocket 연결
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
    
        // WebSocket 연결 시
        stomp.connect({
            //헤더
            Authorization: `Bearer ${token}`
        }, () => {
            console.log('WebSocket 연결 성공 ');
            setStompClient(stomp);
            getmessage(stomp)
        
        },
        (error) => {
            console.error('WebSocket 연결 실패:', error);
            console.log(token)
            // 여기서 에러를 콘솔에 출력하거나 사용자에게 알림을 추가할 수 있습니다.
        }
    );

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
        stomp.disconnect();
    };
}, []);

const getmessage = (stomp) => {
    // /topic/public 토픽을 구독하여 새로운 메시지 수신
    stomp.subscribe('/topic/room1', (message) => {
        const newMessage = JSON.parse(message.body);
        console.log('새로운 메세지', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
};

    // 메시지 전송 함수
    const sendMessage = (e) => {
        e.preventDefault();
        console.log('클릭!')
        // /app/chat.sendMessage 엔드포인트로 메시지 전송
        stompClient.send('/app/chat', {}, JSON.stringify({  content: chat.text }));
        dispatch({type:'chat-text',payload:''})
    };


    const  handletextChange = (e) => {
        const {value} = e.target;
        dispatch({ type: 'chat-text', payload: value });
    };

    const  handlereceiverChange = (e) => {
        const {value} = e.target;
        dispatch({ type: 'chat-receiver', payload: value });
    };
    const handleButtonClick = () => {
        setOpenChat(prevState => !prevState);
        console.log(OpenChat)
        };

return (
    <div className='flexbox'>
        <div className='chatposition'>

        {OpenChat? (
            <div className='chatdiv'>
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
                                <div className='chat-content-right'>
                                    <div className='chat-content-2' key={index}>{message.content}</div>
                                </div>
                                
                            ))}
                        </div>
                    </div>

                    <form className='chat-bot' onSubmit={sendMessage}>
                        <input 
                            alt='입력창'
                            value={chat.text} 
                            onChange={handletextChange}>
                        </input>
                        <button type='submit'>전송</button>
                    </form>

                </div>

                <div className='chatclose'>
                    <FontAwesomeIcon className='chaticon' onClick={handleButtonClick} icon={faXmark} size='xl' style={{color: "#6996e2",}} /> 
                </div>
            </div>)
            :
            (<div></div>)
        }

        {OpenChat?
            <div style={{display:'none'}}></div> 
            :
            <FontAwesomeIcon className='chaticon' onClick={handleButtonClick} icon={faComment} size='xl' style={{color: "#6996e2",}} /> 
        }
    </div>
</div>
)
}

export default Chat
