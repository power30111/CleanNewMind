package practice.demo.domain.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import practice.demo.domain.Member;
import practice.demo.domain.Role;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDto {
    private String userId;
    private String password;
    private String name;
    private String Email;

    public Member toMember(PasswordEncoder passwordEncoder){
        return new Member(userId,passwordEncoder.encode(password),name,Email, Role.ROLE_USER);
    }

    public UsernamePasswordAuthenticationToken toAuthentication(){
        return new UsernamePasswordAuthenticationToken(userId,password);
    }
}
