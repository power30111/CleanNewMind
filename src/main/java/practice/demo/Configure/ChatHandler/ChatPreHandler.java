package practice.demo.Configure.ChatHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import practice.demo.Configure.SecurityUtil;
import practice.demo.domain.state.Role;
import practice.demo.jwt.TokenProvider;

import java.util.List;


@Configuration
@Slf4j
@RequiredArgsConstructor
public class ChatPreHandler implements ChannelInterceptor {

    private final TokenProvider tokenProvider;
    long memberId = 0L;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel){
        try{
            // StompHeaderAccessor를 통해 메시지의 헤더 정보를 얻는다.
            StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
            
            //Command(메시지 타입)확인
            StompCommand command = headerAccessor.getCommand();

            if(command.equals(StompCommand.UNSUBSCRIBE) || command.equals(StompCommand.MESSAGE) ||
                    (command.equals(StompCommand.CONNECTED) || command.equals(StompCommand.SEND))){
                return message;
            } else if (command.equals(StompCommand.ERROR)) {
                // ERROR Command인 경우 예외를 던진다.
                throw new MessageDeliveryException("error");
            }

            //Authorization 헤더 확인
            String authorizationHeader = headerAccessor.getFirstNativeHeader("Authorization");
            if(authorizationHeader == null){
                log.info("chat header가 없는 요청입니다.");
                throw new MalformedJwtException("jwt");
            }

            // Token 분리 및 유효성 검사
            String token = "";

            String authorizationHeaderStr = authorizationHeader.replace("[","").replace("]","");
            if(authorizationHeaderStr.startsWith("Bearer ")){
                token = authorizationHeaderStr.replace("Bearer ","");
            }else{
                log.error("Authorization 헤더 형식이 다릅니다. : {}",authorizationHeaderStr);
                throw new MalformedJwtException("jwt");
            }

            //JWT 에서 MemberId를 얻는다.
            memberId = SecurityUtil.getCurrentMemberId();

            //Token 유효성 검사
            boolean isTokenValid = tokenProvider.validateToken(token);

            // 토큰이 유효한 경우 인증 정보 설정
            if(isTokenValid){
                setAuthentication(message,headerAccessor);
            }
        }catch (MessageDeliveryException e){
            //메시지 에러 발생
            log.error("메시지 에러 발생",e);
            throw new MessageDeliveryException("error");
        }
        //최종적으로 처리된 메시지 반환.
        return message;
    }

    private void setAuthentication(Message<?> message, StompHeaderAccessor headerAccessor) {
        //JWT에서 얻은 MemberId를 사용하여 인증토큰생성
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                memberId, null, List.of(new SimpleGrantedAuthority(Role.ROLE_USER.name()))
        );
        //SecurityContextHolder에 인증 정보 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // StompHedaerAccessor에 사용자 정보 설정
        headerAccessor.setUser(authentication);
        
        
    }
}
