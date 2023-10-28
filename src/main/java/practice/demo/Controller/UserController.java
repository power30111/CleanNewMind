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

@Controller
@RequestMapping("user")
@Slf4j
public class UserController {

    @Autowired
    MemberService memberService;
    
    @CrossOrigin(origins = "http://localhost:3000") // 특정 출처만 허용
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam("id") String userid,
                                    @RequestParam("password") String password){
        memberService.LoginCheck(userid,password);
        log.info("로그인 요청들어옴.");
        return ResponseEntity.status(HttpStatus.OK).body("로그인 요청이 성공하였습니다.");
    }

}
