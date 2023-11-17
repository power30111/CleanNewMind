package practice.demo.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import practice.demo.Service.BoardService;
import practice.demo.Service.MemberService;
import practice.demo.domain.Board;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.domain.Member;
import practice.demo.domain.Message;
import practice.demo.domain.StatusEnum;

import java.nio.charset.StandardCharsets;
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
    public ResponseEntity<Message> writeBoard(@RequestBody BoardDto boardDto){
        log.info("게시글 작성 요청이 들어옴");
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        Optional<Member> member = memberService.findByUserId(myInfoBySecurity.getUserId());
        HttpHeaders headers = getHttpHeaders();
        if(member.isPresent()){
            Board board = new Board(member.get(), boardDto.getTitle(), boardDto.getContent());
            boardService.saveBoard(board);
            log.info("게시글 작성이 완료되었습니다.");

            Message message = getMessage(StatusEnum.OK,"게시글 작성이 정상적으로 완료되었습니다.");
            return new ResponseEntity<>(message,headers,HttpStatus.OK);

        }else{
            log.info("해당 userId를 찾을수없습니다.");

            Message message = getMessage(StatusEnum.BAD_REQUEST,"작성자가 요청한 인증에서 UserId를 찾을수없습니다.");
            return new ResponseEntity<>(message,headers,HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/list/{receiveBoardId}")
    public ResponseEntity<?> readBoard2(@PathVariable String receiveBoardId) {
        log.info(receiveBoardId + " 번호의 게시글 조회 요청");
        long boardId = Long.parseLong(receiveBoardId.strip());
        BoardDto memberResponseDto = boardService.getBoardDto(boardId);

        if (boardService.equalsWriter(boardId)) {
            return ResponseEntity.ok(memberResponseDto);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(memberResponseDto);
        }
    }
    @GetMapping("/list/{receiveBoardId}/delete")
    public ResponseEntity<Message> deleteBoard(@PathVariable String receiveBoardId){
        long boardId = Long.parseLong(receiveBoardId.strip());
        log.info(boardId+" 번호의 게시글 삭제 요청");
        HttpHeaders headers = getHttpHeaders();
        if(boardService.findOne(boardId).isPresent() && boardService.equalsWriter(boardId)){
            //게시판 ID를 통해 조회가 가능한지? + 게시판을 작성한 UserId와 게시판을 삭제하려는 UserId가 동일한지?
            boardService.deleteBoard(boardId);
            Message message = getMessage(StatusEnum.OK, "게시판 정상적으로 삭제");
            return new ResponseEntity<>(message,headers,HttpStatus.OK);
        }
        Message message = getMessage(StatusEnum.BAD_REQUEST, "게시판 삭제 요청이 실패하였습니다.");
        return new ResponseEntity<>(message,headers,HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/list/{receiveBoardId}/update")
    public ResponseEntity<?> updateBoard(@PathVariable String receiveBoardId, @RequestBody BoardDto boardDto){
        long boardId = Long.parseLong(receiveBoardId.strip());
        log.info("게시글 수정 요청");
        if(boardService.equalsWriter(boardId)){
            boardService.update(boardId,boardDto);
            return ResponseEntity.ok(boardService.getBoardDto(boardId));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(boardService.getBoardDto(boardId));
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