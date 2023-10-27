package practice.demo.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practice.demo.Repository.MemberRepository;
import practice.demo.domain.Member;
import practice.demo.exception.IncorrectPasswordException;
import practice.demo.exception.UserNotFoundException;

import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    public Boolean LoginCheck(String userId, String password){
        Optional<Member> member = memberRepository.findByUserId(userId);
        if(member.isPresent()) {
            Member m1 = member.get();
            if(m1.checkPassword(password)){
                return true;
            }else{
                throw new IncorrectPasswordException("비밀번호가 틀립니다.");
            }
        }else{
            throw new UserNotFoundException("유저 아이디가 존재하지않습니다.");
        }
    }

    public Long JoinMember(Member member){
        memberRepository.save(member);
        return member.getId();
    }


}
