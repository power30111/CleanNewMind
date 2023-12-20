package practice.demo.Controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import practice.demo.Configure.SecurityUtil;
import practice.demo.Service.AuthService;
import practice.demo.Service.MemberService;
import practice.demo.domain.DTO.MemberRequestDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.domain.DTO.MemberUpdateDto;
import practice.demo.domain.DTO.TokenDto;

@Controller
@RequestMapping("user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto){
        log.info("회원가입 요청이 들어옴.");
        log.info(memberRequestDto.getEmail());
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto){
        log.info("로그인 요청이 들어옴.");
        log.info(memberRequestDto.getName(),memberRequestDto.getUserId(),memberRequestDto.getPassword());
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    @GetMapping("/IsLogin")
    @ResponseBody
    public HttpStatus isLogin(){
        log.info("로그인되어있는지에 대한 검증요청");

            try{
                SecurityUtil.getCurrentMemberId();
            }catch (Exception e){
                return HttpStatus.BAD_REQUEST;
            }
        log.info("검증성공");
        return HttpStatus.OK;
    }

    @PostMapping("/accountUpdate")
    @ResponseBody
    public HttpStatus accountUpdate(@RequestBody MemberUpdateDto memberUpdateDto){
        try {
            if (memberUpdateDto.getUserId() != null) {
                log.info("아이디 변경요청이 들어왔습니다.");
                memberService.changeMemberId(memberUpdateDto.getUserId());
            }
            if (memberUpdateDto.getExPassword() != null && memberUpdateDto.getNewPassword() != null) {
                log.info("비밀번호 변경요청이 들어왔습니다.");
                memberService.changeMemberPassword(memberUpdateDto.getExPassword(), memberUpdateDto.getNewPassword());
            }
            if (memberUpdateDto.getName() != null) {
                log.info("이름변경 요청이 들어왔습니다.");
                memberService.changeMemberName(memberUpdateDto.getName());
            }
            if (memberUpdateDto.getEmail() != null) {
                log.info("이메일 변경 요청이 들어왔습니다.");
                memberService.changeMemberEmail(memberUpdateDto.getEmail());
            }
        }catch (Exception e){
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.OK;
    }

    @GetMapping("/getMyInfo")
    public ResponseEntity<MemberResponseDto> getMyInfo(){
        return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

}
