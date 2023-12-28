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
        log.info("Chat Enter : {}", chatRequest.getSender());

        chatRequest.setContent(chatRequest.getSender() + "님이 채팅방에 참여하였습니다.");

        template.convertAndSend("/topic/room1",chatRequest.getContent());
    }
    @MessageMapping("/chat/message")
    public void chat(@Payload ChatRequest chatRequest,SimpMessageHeaderAccessor headerAccessor){

        log.info(chatRequest.getSender()+" --chatting >> "+chatRequest.getContent());

        template.convertAndSend("/topic/room1",chatRequest.getContent());
    }

    @MessageMapping("/chat/unSub")
    public void chatOut(@Payload ChatRequest chatRequest){
        log.info("Chat Out : {}",chatRequest.getSender());

        chatRequest.setContent(chatRequest.getSender() + "님이 채팅방에서 나갔습니다.");

        template.convertAndSend("/topic/room1",chatRequest.getContent());
    }





}