package practice.demo.domain.DTO;

import lombok.Data;

@Data
public class BoardSearchCond {

    private String boardName;
    private String writerName;

    //page -> 페이지
    //bn -> 게시글 제목(board name)
    //wn -> 작성자 이름(writer name)


    public BoardSearchCond(String boardName, String writerName) {
        this.boardName = boardName;
        this.writerName = writerName;
    }
}
