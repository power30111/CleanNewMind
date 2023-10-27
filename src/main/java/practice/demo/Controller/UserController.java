package practice.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import practice.demo.Service.MemberService;

@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    MemberService memberService;
    @CrossOrigin(origins = "http://localhost:3000") // 특정 출처만 허용
    @PostMapping("/login")
    public String loginUser(@RequestParam("id") String userid,
                            @RequestParam("password") String password){
        memberService.LoginCheck(userid,password);
        return "redirect://";
    }

}
