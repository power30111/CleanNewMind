package practice.demo.Controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import practice.demo.Service.AuthService;
import practice.demo.Service.MemberService;
import practice.demo.domain.DTO.MemberRequestDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.domain.DTO.TokenDto;
import practice.demo.domain.Member;
import practice.demo.domain.Role;

@Controller
@RequestMapping("user")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000") // 특정 출처만 허용
@RequiredArgsConstructor
public class UserController {

    private final MemberService memberService;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto){
        log.info("회원가입 요청이 들어옴.");
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto){
        log.info("로그인 요청이 들어옴.");
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }



//    @PostMapping("/loginV1")
//    public ResponseEntity<String> loginUser(@RequestParam("id") String userId,
//                                            @RequestParam("password") String password){
//        log.info("로그인 요청들어옴.");
//        memberService.LoginCheck(userId,password);
//        log.info("로그인 성공");
//        return ResponseEntity.status(HttpStatus.OK).body("로그인 요청이 성공하였습니다.");
//    }

//    @PostMapping("/loginV2")
//    public ResponseEntity<String> loginUserV2(@RequestBody LoginDTO loginDTO){
//        log.info("로그인 요청들어옴");
//        memberService.LoginCheck(loginDTO.getId(),loginDTO.getPassword());
//        log.info("로그인 요청 성공함");
//        return ResponseEntity.status(HttpStatus.OK).body("로그인 요청이 성공하였습니다.");
//    }

//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody Member inputMember){
//        //임시회원. 데이터 전달용도의 객체를 따로 만들어야하나? 일단 보류
//
//        log.info("회원가입 요청이 들어왔습니다.");
//
//        Member member = new Member(inputMember.getUserId(),
//                inputMember.getPassword(),inputMember.getName(),inputMember.getEmail(),Role.ROLE_USER);
//        member.setRole(Role.ROLE_USER);
//
//        memberService.JoinMember(member);
//
//        log.info("유저 회원가입이 완료되었습니다.");
//
//        return ResponseEntity.status(HttpStatus.OK).body("회원가입이 정상적으로 완료되었습니다.");
//    }
}
