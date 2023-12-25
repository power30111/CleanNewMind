package practice.demo.Configure.ChatHandler;


import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;
import practice.demo.domain.state.ErrorCode;

import java.nio.charset.StandardCharsets;

@Component
public class ChatErrorHandler extends StompSubProtocolErrorHandler {

    public ChatErrorHandler() {
        super();
    }

    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]> clientMessage, Throwable ex) {
        //클라이언트의 메시지 처리중 에러가 발생했을때 호출되는 메서드
        if(ex.getCause().getMessage().equals("jwt")){   //해당 예외의 메시지를 가져온후 처리.
            return jwtException(clientMessage,ex);
        }

        if(ex.getCause().getMessage().equals("error")){ //위와 동일
            return messageException(clientMessage,ex);
        }

        return super.handleClientMessageProcessingError(clientMessage,ex);  //만일 둘다 아닌 예외가 발생했을경우 따로처리
    }

    private Message<byte[]> jwtException(Message<byte[]> clientMessage, Throwable ex) {
        return errorMessage(ErrorCode.INVALID_TOKEN);
    }

    private Message<byte[]> messageException(Message<byte[]> clientMessage, Throwable ex) {
        return errorMessage(ErrorCode.INVALID_MESSAGE);
    }

    private Message<byte[]> errorMessage(ErrorCode errorCode){
        String code = errorCode.getMessage();

        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.ERROR);
        //errorCode 를 기반으로 에러 코드와 예외 메시지를 생성한뒤, 이를 StompHeaderAccessor 를 사용하여 에러 응답으로 반환.
        accessor.setMessage(String.valueOf(errorCode.getStatus()));
        accessor.setLeaveMutable(true);

        return MessageBuilder.createMessage(code.getBytes(StandardCharsets.UTF_8),accessor.getMessageHeaders());

    }


}
