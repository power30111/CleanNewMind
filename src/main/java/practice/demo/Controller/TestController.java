package practice.demo.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class TestController {

    @CrossOrigin(origins = "http://localhost:3000") // 특정 출처만 허용
    @GetMapping("/test/api1")
    @ResponseBody
    public String testApi1(Model model){
        log.info("testApi1 작동");
        return "testAPi1 동작";
    }
}
