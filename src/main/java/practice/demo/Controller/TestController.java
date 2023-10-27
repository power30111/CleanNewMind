package practice.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import practice.demo.Repository.MemberRepository;
import practice.demo.Service.MemberService;
import practice.demo.domain.Member;

@Controller
@Slf4j
public class TestController {

    @Autowired
    MemberService memberService;

    @CrossOrigin(origins = "http://localhost:3000") // 특정 출처만 허용
    @GetMapping("/test/api1")
    @ResponseBody
    public String testApi1(Model model){
        log.info("testApi1 작동");
        return "testAPi1 동작";
    }
    @CrossOrigin(origins = "http://localhost:3000") // 특정 출처만 허용
    @GetMapping("/test/user")
    @ResponseBody
    public String testUser1(){
        log.info("테스트용 유저생성");
        Member member = new Member("1234","4321","안경민","asd1234@naver.com");
        memberService.JoinMember(member);
        return "test용 유저생성완료. id = 1234, pw = 4321";
    }
}
