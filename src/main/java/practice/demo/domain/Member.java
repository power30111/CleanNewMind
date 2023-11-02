package practice.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@ToString
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String userId;
    private String password;
    private String name;
    private String Email;

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

    public boolean checkPassword(String password){
        return this.password.equals(password);
    }
    public void setRole(Role role){
        this.role = role;

    }

    public void setUserId(String userId){
        this.userId = userId;
    }
    public void setPassword(String pw){
        this.password = pw;
    }
}
