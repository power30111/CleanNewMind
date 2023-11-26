package practice.demo.domain.DTO;


import lombok.Builder;
import lombok.Getter;
import practice.demo.domain.Board;
import practice.demo.domain.Comment;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class BoardDto {

    private Long id;
    private String writer;
    private String title;
    private String content;

    @Builder.Default
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
}
