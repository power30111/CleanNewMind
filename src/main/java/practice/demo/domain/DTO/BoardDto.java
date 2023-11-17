package practice.demo.domain.DTO;


import lombok.Builder;
import lombok.Getter;
import practice.demo.domain.Board;

@Getter
@Builder
public class BoardDto {

    private Long id;
    private String writer;
    private String title;
    private String content;

    public BoardDto() {
    }

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

    public static BoardDto of(Board board) {
        return BoardDto.builder()
                .id(board.getId())
                .writer(board.getMember().getUserId())
                .title(board.getTitle())
                .content(board.getContent())
                .build();
    }
}
