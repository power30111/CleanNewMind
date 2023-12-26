package practice.demo.Configure;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import practice.demo.Configure.ChatHandler.ChatErrorHandler;
import practice.demo.Configure.ChatHandler.ChatPreHandler;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class ChatConfig implements WebSocketMessageBrokerConfigurer {
    //상속받음으로써 stomp 에 대한 설정가능

    private final ChatPreHandler chatPreHandler;

    private final ChatErrorHandler chatErrorHandler;




    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //stomp 접속을 위한 Endpoint 설정.
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
        registry.setErrorHandler(chatErrorHandler);
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //클라이언트 에서 보내는 send 요청 처리
        registry.setApplicationDestinationPrefixes("/pub");

        //spring 에서 제공하는 내장 broker 사용. queue -> 1:1, topic -> 1:N
        registry.enableSimpleBroker("/sub","/sub/list");

    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(chatPreHandler);

    }
}
