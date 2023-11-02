package practice.demo.Service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import practice.demo.Configure.SecurityUtil;
import practice.demo.Repository.MemberRepository;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.domain.Member;
import practice.demo.exception.IncorrectPasswordException;
import practice.demo.exception.UserNotFoundException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberResponseDto getMyInfoBySecurity(){
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }



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

    public Optional<Member> findByUserId(String userId){
        return memberRepository.findByUserId(userId);
    }



    @Transactional
    public MemberResponseDto changeMemberId(String userId, String name) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
        member.setUserId(userId);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public MemberResponseDto changeMemberPassword(String userId, String exPassword, String newPassword) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        member.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDto.of(memberRepository.save(member));
    }

}
