import React from 'react'

const Mail = () => {

    //1. 쪽지 입력창  o
    //2. 기존 메세지 o
    //3. 나와 상대 구분해서 메세지 왼쪽 오른쪽 o
    //4. 
return (
        <div className='mail-Box'>

            <div className='chat-top'>
                <div className='chat-recipient'>상대방</div>
            </div>

            <div className='chat-main'>
                <div className='chat-content-left'>
                    <div className='chat-content-1'>내용 </div>
                </div>
                <div className='chat-content-right'>
                    <div className='chat-content-2'>내용 </div>
                </div>
            </div>
            
            <div className='chat-bot'>
                <input alt='입력창'></input>
                <button>전송</button>
            </div>
        </div>

        
)
}

export default Mail