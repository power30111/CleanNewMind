package practice.demo.domain;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Content {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long contentOrder;

    private String text;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "Board_id")
    private Board board;

    @Builder
    public Content(Long contentOrder, String text, String imageUrl,Board board) {
        this.contentOrder = contentOrder;
        this.text = text;
        this.imageUrl = imageUrl;
        this.board = board;
    }

    public Content(Long contentOrder, String text, String imageUrl) {
        this.contentOrder = contentOrder;
        this.text = text;
        this.imageUrl = imageUrl;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
