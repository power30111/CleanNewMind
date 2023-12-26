package practice.demo.Controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import practice.demo.domain.ChatRequest;


@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations template;    //WebSocket을 통해 메시지를 보내는데 사용되는 template

    /**
     * "/chat/enter" 로 들어오는 WebSocket 메시지 매핑
     * @param chatRequest 사용자가 보낸 메시지 내용. (id, sender, content)
     * @param headerAccessor websocket 메시지의 헤더에 접근할수있는 객체.
     */
    @MessageMapping("/chat/enter")
    public void chatEnter(@Payload ChatRequest chatRequest, SimpMessageHeaderAccessor headerAccessor){
        log.info("Chat Enter : {}", chatRequest);

        //채팅방 입장 메시지를 특정 채널에 전송하는 메서드.
        template.convertAndSend("/sub/chat/room/"+chatRequest.getId(),chatRequest);
    }
    @MessageMapping("/chat")
    public void chat(@Payload ChatRequest chatRequest){
        log.info("chat 접속");

        template.convertAndSend("/topic/room1",chatRequest);
    }


}