package practice.demo.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDTO {

    private String id;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public ChatRoomDTO(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public static ChatRoomDTO create(String name){
        String roomId = UUID.randomUUID().toString();
        return new ChatRoomDTO(roomId,name);
    }
}
