package practice.demo.domain;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Slf4j
//@Entity
public class Message {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;        //메세지 번호

    private Integer room;       //해당 채팅방 번호

    @OneToOne(mappedBy = "MEMBER_NAME")
    private Member sender;  // 보낸 회원

    @OneToOne(mappedBy = "MEMBER_NAME")
    private Member receiver; // 받은 회원

    private LocalDateTime sendTime; //보낸 시간

    private String content;     //채팅 내용

    private Boolean read;       //그 문자를 받은 사람이 보았는지 bool

    @Builder
    public Message(Integer room, Member sender, Member receiver, LocalDateTime sendTime, String content, Boolean read) {
        this.room = room;
        this.sender = sender;
        this.receiver = receiver;
        this.sendTime = sendTime;
        this.content = content;
        this.read = read;
    }
}
