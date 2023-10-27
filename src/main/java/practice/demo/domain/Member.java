package practice.demo.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
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
    private String email;
    public Member(){
    }

    public Member(String userid, String password, String name, String email) {
        this.userId = userid;
        this.password = password;
        this.name = name;
        this.email = email;
    }

    public boolean checkPassword(String password){
        return this.password.equals(password);
    }
}
