package practice.demo.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
public class Comment {

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    private String name;
    private String content;

    public Comment() {
    }

}
