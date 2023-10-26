package practice.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class TestController {

    @GetMapping("/test/api1")
    @ResponseBody
    public String testApi1(Model model){
        log.info("check");
        return "testApi1";
    }

}
