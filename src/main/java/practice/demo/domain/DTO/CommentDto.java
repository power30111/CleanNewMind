package practice.demo.domain.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import practice.demo.domain.Comment;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class CommentDto {
    //저기서 댓글을 작성했다고 치자. 그럼 작성자 인증정보 + 내용이오겟지?

    private String name;
    private String content;

    public static CommentDto of(Comment comment){
        return CommentDto.builder()
                .name(comment.getMember().getName())
                .content(comment.getContent())
                .build();
    }
    public CommentDto(String content) {
        this.content = content;
    }
}
