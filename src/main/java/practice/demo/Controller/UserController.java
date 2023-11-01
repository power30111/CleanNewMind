package practice.demo.Controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import practice.demo.Service.MemberService;
import practice.demo.domain.LoginDTO;
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
        log.info("로그인 요청들어옴.");
        memberService.LoginCheck(userId,password);
        log.info("로그인 성공");
        return ResponseEntity.status(HttpStatus.OK).body("로그인 요청이 성공하였습니다.");
    }

    @PostMapping("/loginV2")
    public ResponseEntity<String> loginUserV2(@RequestBody LoginDTO loginDTO){
        log.info("로그인 요청들어옴");
        memberService.LoginCheck(loginDTO.getId(),loginDTO.getPassword());
        log.info("로그인 요청 성공함");
        return ResponseEntity.status(HttpStatus.OK).body("로그인 요청이 성공하였습니다.");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Member inputMember){
        Member member = new Member(inputMember.getUserId(),
                inputMember.getPassword(),inputMember.getName(), inputMember.getEmail());
        log.info("회원가입 요청이 들어왔습니다.");
        memberService.JoinMember(member);
        log.info("유저 회원가입이 완료되었습니다.");
        return ResponseEntity.status(HttpStatus.OK).body("회원가입이 정상적으로 완료되었습니다.");
    }
}
