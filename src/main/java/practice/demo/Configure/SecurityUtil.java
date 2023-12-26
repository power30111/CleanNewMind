package practice.demo.Configure;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Key;

public class SecurityUtil {
    //유저 정보가 저장되는 시점을 다루는 클래스
    //Request가 들어오면 JwtFilter의 doFilter에서 저장되는데, 거기서 인증정보를 꺼낸뒤 그안의 id를 반환한다.
    private SecurityUtil(){
    }

    public static Boolean isAnonymousUser(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();   //현재 사용자 인증정보를 가져온다.
        if (authentication.getName().equals("anonymousUser")){
            return true;
        }else{
            return false;
        }
    }

    public static Long getCurrentMemberId(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();   //현재 사용자 인증정보를 가져온다.

        if(authentication == null || authentication.getName() == null){             //인증정보가 없거나, null일경우
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");   //예외발생 #RuntimerException은 바꿔야하긴함..
        }
        return Long.parseLong(authentication.getName());        //인증정보의 이름을 Long 형태로 반환.
    }
}
