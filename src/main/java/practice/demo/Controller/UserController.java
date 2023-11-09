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
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto){
        log.info("회원가입 요청이 들어옴.");
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto){
        log.info("로그인 요청이 들어옴.");
        log.info(memberRequestDto.getName(),memberRequestDto.getUserId(),memberRequestDto.getPassword());
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

}
