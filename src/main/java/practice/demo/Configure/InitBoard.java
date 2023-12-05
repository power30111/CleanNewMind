package practice.demo.Configure;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import practice.demo.Repository.MemberRepository;
import practice.demo.Service.BoardService;
import practice.demo.Service.MemberService;
import practice.demo.domain.Board;
import practice.demo.domain.Member;
import practice.demo.domain.state.Role;

@Component
@RequiredArgsConstructor
public class InitBoard {

    private final InitBoardService initBoardService;

    @PostConstruct
    public void init(){
        initBoardService.init();
    }

    @Component
    static class InitBoardService{
        @Autowired
        MemberRepository memberRepository;

        @Autowired
        BoardService boardService;

        @PersistenceContext
        private EntityManager em;

        @Transactional
        public void init(){

            for (int i = 0; i<100; i++) {
                String testUserId = i+"번쨰 테스트회원";
                String testPassword = i+"a";
                String name = i+"번";
                String email = i+"@test.com";
                Member member = new Member(testUserId,testPassword,name,email, Role.ROLE_USER);
                memberRepository.save(member);

                String content = i+" 번쨰 테스트게시글 내용입니다!";

                Board board = new Board(member,i+"번쨰 테스트 게시글",content);
                boardService.saveBoard(board);

            }

        }

    }

}
