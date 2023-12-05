package practice.demo.domain.DTO;


import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import practice.demo.domain.Board;
import practice.demo.domain.Comment;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class BoardDto {

    private Long id;
    private String writer;
    private String title;
    private String content;

    private List<CommentDto> commentList = new ArrayList<>();

    public static BoardDto of(Board board) {
        return BoardDto.builder()
                .id(board.getId())
                .writer(board.getMember().getUserId())
                .title(board.getTitle())
                .content(board.getContent())
                .commentList(board.getCommentList().stream().map(CommentDto::of).collect(Collectors.toList()))
                .build();
    }
    @Builder
    public BoardDto(Long id,String writer, String title, String content, List<CommentDto> commentList) {
        this.id = id;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.commentList = commentList;
    }

    @QueryProjection
    public BoardDto(Long id,String writer, String title) {
        this.id = id;
        this.writer = writer;
        this.title = title;
    }

}
