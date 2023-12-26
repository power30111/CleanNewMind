package practice.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;
import practice.demo.domain.state.Role;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@ToString
public class Member extends BaseEntity{

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String userId;
    private String password;
    private String name;
    private String email;

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    private List<Board> boardList = new ArrayList<>();

    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;    //권한
    public Member(){
    }

    public Member(String userid, String password, String name, String email,Role role) {
        this.userId = userid;
        this.password = password;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }
    public void setPassword(String pw){
        this.password = pw;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
