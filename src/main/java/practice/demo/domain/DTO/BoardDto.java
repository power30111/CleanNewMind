package practice.demo.domain.DTO;


import lombok.Getter;
import practice.demo.domain.Member;

import java.time.LocalDateTime;

@Getter
public class BoardDto {

    private Long id;
    private String writer;
    private String title;
    private String content;

    public BoardDto(Long id, String writer, String title, String content) {
        this.id = id;
        this.writer = writer;
        this.title = title;
        this.content = content;
    }

    public BoardDto(Long id, String writer, String title) {
        this.id = id;
        this.writer = writer;
        this.title = title;
    }

    public BoardDto() {
    }
}
