package practice.demo.Controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import practice.demo.Service.MemberService;
import practice.demo.domain.Member;

@Controller
@RequestMapping("user")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000") // 특정 출처만 허용
public class UserController {

    @Autowired
    MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam("id") String userId,
                                            @RequestParam("password") String password){
        memberService.LoginCheck(userId,password);
        log.info("로그인 요청들어옴.");
        return ResponseEntity.status(HttpStatus.OK).body("로그인 요청이 성공하였습니다.");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam("id") String userId,
                                               @RequestParam("password") String password,
                                               @RequestParam("name") String userName,
                                               @RequestParam("Email") String Email){
        Member member = new Member(userId,password,userName,userName);
        memberService.JoinMember(member);
        return ResponseEntity.status(HttpStatus.OK).body("회원가입이 정상적으로 완료되었습니다.");
    }

}
