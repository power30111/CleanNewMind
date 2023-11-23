package practice.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;
import practice.demo.domain.state.Role;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
public class Member extends BaseEntity{

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String userId;
    private String password;
    private String name;
    private String Email;

    @OneToMany(mappedBy = "member")
    private List<Board> boardList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;    //권한
    public Member(){
    }

    public Member(String userid, String password, String name, String email,Role role) {
        this.userId = userid;
        this.password = password;
        this.name = name;
        this.Email = email;
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
        Email = email;
    }
}
