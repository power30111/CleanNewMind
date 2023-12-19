package practice.demo.Controller;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import practice.demo.Repository.BoardRepository;
import practice.demo.Repository.MemberRepository;
import practice.demo.Service.BoardService;
import practice.demo.Service.ContentService;
import practice.demo.Service.MemberService;
import practice.demo.domain.Board;
import practice.demo.domain.Content;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.BoardSearchCond;
import practice.demo.domain.DTO.ContentDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.domain.Member;
import practice.demo.domain.state.Message;
import practice.demo.domain.state.StatusEnum;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Controller
@Slf4j
public class TestController {

    @Autowired
    MemberService memberService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    BoardService boardService;
    @Autowired
    ContentService contentService;

    @Autowired
    BoardRepository boardRepository;

    @GetMapping("/test/findUser")
    public List<Member> testFindUser(){
        log.info("유저 찾기");

        return memberRepository.findAll();
    }

    @GetMapping("/test/getInfoMe")
    public ResponseEntity<MemberResponseDto> getMyInfo(){
        MemberResponseDto memberResponseDto = memberService.getMyInfoBySecurity();
        log.info("현재 자신의 정보를 조회하려함 "+" 현재 아이디의 Name = "+memberResponseDto.getName());
        log.info("현재 아이디의 UserId = "+memberResponseDto.getUserId());
        return ResponseEntity.ok(memberResponseDto);
    }

//    @GetMapping("/test/mapping")
//    public void mapping(){
//        Member member = new Member("아이디","비밀번호","이름","이메일",Role.ROLE_USER);
//        memberService.JoinMember(member);
//        Board board = new Board(member,"제목입니당","여기에 게시판에서 작성한 글이 들어갈 예정입니다.");
//        boardService.saveBoard(board);
//        log.info(board.toString());
//    }

    @GetMapping("/test/Page")
    public Page<BoardDto> searchBoard(BoardSearchCond cond, Pageable pageable){
        log.info(cond.getBoardName()+"+"+cond.getWriterName()+" 의 조건으로 검색된 게시글들");
        return boardRepository.searchPage(cond,pageable);
    }

//    @GetMapping("/test/boardList")
//    public void boardList(){
//        for(Board board : boardService.getBoardList()){
//            BoardDto boardDto = new BoardDto(board.getId(),board.getMember().getUserId(),board.getTitle(),board.getContent());
//            log.info(String.valueOf(boardDto.getId()));
//            log.info(boardDto.getWriter());
//            log.info(boardDto.getTitle());
//            log.info(boardDto.getContent());
//        }
//    }

    @Getter
    @Setter
    public static class testBoardDto{
        private Long order;
        private String text;
        private List<ContentDto> image;

    }
    private static HttpHeaders getHttpHeaders() {
        HttpHeaders headers= new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        return headers;
    }

    private static Message getMessage(StatusEnum statusEnum, String message){
        Message nowMessage = new Message();
        nowMessage.setStatus(statusEnum);
        nowMessage.setMessage(message);
        return nowMessage;
    }



}
