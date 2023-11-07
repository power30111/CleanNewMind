package practice.demo.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import practice.demo.Service.BoardService;
import practice.demo.Service.MemberService;
import practice.demo.domain.Board;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.domain.Member;

import java.util.*;

@Slf4j
@Controller
@RequestMapping("board")
@ResponseBody
public class BoardController {
    @Autowired
    BoardService boardService;
    @Autowired
    MemberService memberService;

    @GetMapping("/list")
    public List<BoardDto> boardDtoList() {
        List<BoardDto> boardList = new ArrayList<>();
        for (Board board : boardService.getBoardList()) {
            BoardDto boardDto = new BoardDto(board.getId(),
                    board.getMember().getUserId(),
                    board.getTitle());
            boardList.add(boardDto);
        }
        return boardList;
    }
    @PostMapping("/write")
    public void writeBoard(@RequestBody BoardDto boardDto){
        log.info("게시글 작성 요청이 들어옴");
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        Optional<Member> member = memberService.findByUserId(myInfoBySecurity.getUserId());
        if(member.isPresent()){
            Board board = new Board(member.get(), boardDto.getTitle(), boardDto.getContent());
            boardService.saveBoard(board);
            log.info("게시글 작성이 완료되었습니다.");
        }else{
            log.info("member를 조회할수없습니다.");
        }
    }
    @GetMapping("/list/{boardId}")
    public BoardDto readBoard(@PathVariable Long boardId){
        log.info(boardId+" 번호의 게시글 조회 요청");
        if(boardService.findOne(boardId).isPresent()) {
            Board board = boardService.findOne(boardId).get();
            return new BoardDto(board.getId(),board.getMember().getName(),board.getTitle(),board.getContent());
        }else{
            throw new RuntimeException("해당 번호의 게시글이 존재하지않습니다.");
        }
    }
}