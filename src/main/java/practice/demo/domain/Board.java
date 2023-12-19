package practice.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@ToString
public class Board extends BaseEntity{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private String title;

    @OneToMany(mappedBy = "board",fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    @OrderBy("contentOrder")
    private List<Content> contentList = new ArrayList<>();

    //댓글이 작성되면 바로보이도록 EAGER. 게시글이 삭제될시 같이 없어지도록 cascade REMOVE.
    @OneToMany(mappedBy = "board",fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    @OrderBy("id")
    private List<Comment> commentList = new ArrayList<>();

    private String uuid = UUID.randomUUID().toString();

    public Board() {
    }

    public Board(Member member, String title, List<Content> contentList) {
        this.member = member;
        this.title = title;
        this.contentList = contentList;
    }
    public void updateBoard(String title, List<Content> contentList){
        this.title = title;
        this.contentList = contentList;
    }
    public Board(Member member, String title) {
        this.member = member;
        this.title = title;
    }

    public Board(Member member, String title, List<Content> contentList, String uuid) {
        this.member = member;
        this.title = title;
        this.contentList = contentList;
        this.uuid = uuid;
    }
}
