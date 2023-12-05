package practice.demo.domain.DTO;

import lombok.Data;

@Data
public class BoardSearchCond {

    private String boardName;
    private String writerName;

    //page -> 페이지
    //boardName -> 게시글 제목
    //writerName -> 작성자 이름

}
