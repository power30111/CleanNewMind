package practice.demo.Configure;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
public class SecurityUtil {
    //유저 정보가 저장되는 시점을 다루는 클래스
    //Request가 들어오면 JwtFilter의 doFilter에서 저장되는데, 거기서 인증정보를 꺼낸뒤 그안의 id를 반환한다.

    private SecurityUtil(){
    }

    public static Boolean isAnonymousUser(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getName().equals("anonymousUser")){
            return true;
        }else{
            return false;
        }
    }

    public static Long getCurrentMemberId(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null){
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }
        return Long.parseLong(authentication.getName());
    }
}
