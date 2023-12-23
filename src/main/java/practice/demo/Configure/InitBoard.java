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
import practice.demo.domain.Content;
import practice.demo.domain.Member;
import practice.demo.domain.state.Role;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitBoard {
    /*
    테스트용 게시글들 양산하는 곳.
     */

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


                String text = i+" 번쨰 테스트게시글 내용입니다!";
                List<Content> contentList = new ArrayList<>();
                Content content = new Content(1L,text,"");
                contentList.add(content);

                Board board = new Board(member,i+"번쨰 테스트 게시글",contentList);
                boardService.saveBoard(board);

            }

            Path currentPath = Paths.get("");
            String path = currentPath.toAbsolutePath().toString();

            File file = new File(path+"_ImageFolder");

            if(!file.exists()){
                //경로에 폴더가 없을경우 폴더생성
                file.mkdir();
            }



        }

    }

}
