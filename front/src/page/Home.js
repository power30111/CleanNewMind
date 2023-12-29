import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-regular-svg-icons';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import List from '../component/List';
import Paging from '../component/Paging';


const Home = () => {

    // Axios 인스턴스 생성 및 기본 URL 설정
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });
    

    const [page,setpage] = useState(1);
    const data = useSelector((state) => state.data)
    const paging = useSelector((state) => state.paging)
    const searchValue = useSelector((state) => state.searchValue)
    const [OpenChat, setOpenChat] = useState(false);
    const chat = useSelector((state)=>state.chat);
    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.token);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goWrite = () =>{
        navigate('/Write')
    }

    //웹소켓 변수 
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);


    /*페이징*/

  // 페이징 처리 함수
    const handlePageChange = (selectedPage) => {
        setpage(selectedPage);
    };

    /*검색창 */

    //검색 선택박스
    const [selectedValue, setSelectedValue] = useState("boardName"); // 선택한 값을 상태로 관리

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // 선택한 값을 업데이트
    };

    //검색어
    const handleInputChange = (e) => {
        const { value } = e.target
        dispatch({type:'searchValue',payload:value})
    };


    
    // 검색 및 페이징 정보를 이용하여 데이터를 가져오는 함수
    const fetchData = (searchquery) => {
    
        api.get(`/board/list/Page?page=${page}&${searchquery}`)
        .then((response) => {
            dispatch({ type: 'boardlist', payload: response.data.content });
            dispatch({ type: 'paging', payload: response.data});
        })
        .catch((error) => {
            console.error('요청 실패: ', error);
        });
    };
    // 게시글 조회 및 검색어 변경 시 fetchData 호출
    useEffect(() => {
        fetchData();
    }, [page]);


      // 검색 버튼 클릭 시
    const handleSearch = () => {
        setpage(1); // 검색 시 페이지를 1로 초기화

        // 검색 버튼을 클릭했을 때에만 쿼리를 업데이트
        let searchType = "boardName"; // 기본값
        let encodedSearchValue = encodeURIComponent(searchValue);
    
        let searchquery = `${selectedValue}=${encodedSearchValue}`;
    
        if (selectedValue === "boardName") {
            searchType = "boardName";
        } else if (selectedValue === "writerName") {
            searchType = "writerName";
        } else if (selectedValue === "제작") {
            encodedSearchValue = encodeURIComponent(searchValue);
            searchquery = `boardName=${encodedSearchValue}&writerName=${encodedSearchValue}`;
        }

        fetchData(searchquery);
    };

//chat

const handleButtonClick = () => {
    setOpenChat(prevState => !prevState);
    };

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






    return (
        <Container>
            <div className='hometop'>
                <h1 className='hometop-text'>게시글</h1>
            </div>

            <div className='listbox'>
                <div className='boardlist'>
                    <div className='listtop-title'>
                        <div className='list-No'>No</div>

                        <div className='list-title'>제목</div>
                        
                        <div className='list-writer'>작성자</div>
                    </div>

                    <div className='max'>
                        {data && data.map((item) => (
                            <List key={item.id} {...item}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className='homebot'>

                <div className='homebot-write'>
                    <div className='flexbox'>
                        <button className="btn-hover color-9" onClick={goWrite}>글쓰기</button>
                    </div>
                </div>

                <div className='flexbox'>
                    <div className='homebot-search'>
                        <Form.Select className='homebot-select' onChange={handleSelectChange} value={selectedValue}>
                            <option value="boardName">제목</option>
                            <option value="writerName">작성자</option>
                            <option value="제작">제목 + 작성자</option>
                        </Form.Select>
                        <input  name="search" placeholder='검색창' onChange={handleInputChange}/>
                        <button className="search-btn color-9" onClick={handleSearch}>검색</button>
                    </div>
                </div>
                
                <Paging onPageChange={handlePageChange} totalElements={paging.totalElements} page={page} />
            </div>

            <div className='chatposition'>

                {OpenChat? 
                <div className=''></div> :
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
                            <FontAwesomeIcon className='chaticon' onClick={handleButtonClick} icon={faComment} size='xl' style={{color: "#6996e2",}} /> 
                        </div>
                    </div>
                }

                {OpenChat?
                    <FontAwesomeIcon className='chaticon' onClick={handleButtonClick} icon={faComment} size='xl' style={{color: "#6996e2",}} /> 
                    : <div style={{display:'none'}}></div> 
                }

            </div>
        </Container>
        
    )
}

export default Home
