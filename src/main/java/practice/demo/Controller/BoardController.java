package practice.demo.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import practice.demo.domain.DTO.BoardSearchCond;
import practice.demo.domain.DTO.CommentDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.domain.Member;
import practice.demo.domain.state.Message;
import practice.demo.domain.state.StatusEnum;

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
            BoardDto boardDto = BoardDto.builder()
                    .id(board.getId())
                    .title(board.getTitle())
                    .writer(board.getMember().getUserId())
                    .build();
            boardList.add(boardDto);
        }
        return boardList;
    }

    @GetMapping("/list/Page")
    public Page<BoardDto> searchBoard(BoardSearchCond cond, Pageable pageable){
        log.info(cond.getBoardName()+"+"+cond.getWriterName()+" 의 조건으로 검색된 게시글들");
        return boardService.searchPage(cond,pageable);
        /**
         * Pageable 관련.
         * getTotalPages -> 총 페이지 수
         * getTotalElements -> 전체 개수
         * getNumber -> 현재 페이지 번호
         * getSize -> 페이지당 데이터 개수
         * hasNext() -> 다음 페이지 존재여부
         * isFirst() -> 시작 페이지(0) 여부
         */
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
    public ResponseEntity<?> readBoard2(@PathVariable String receiveBoardId){
        log.info(receiveBoardId + " 번호의 게시글 조회 요청");
        long boardId = Long.parseLong(receiveBoardId.strip());
        BoardDto boardResponseDto = boardService.getBoardDto(boardId);

        if (boardService.equalsWriter(boardId)) {
            return ResponseEntity.ok(boardResponseDto);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(boardResponseDto);
        }
    }
    @GetMapping("/list/{receiveBoardId}/delete")
    public ResponseEntity<Message> deleteBoard(@PathVariable String receiveBoardId){
        long boardId = Long.parseLong(receiveBoardId.strip());
        log.info(boardId+" 번호의 게시글 삭제 요청");
        HttpHeaders headers = getHttpHeaders();
        if(boardService.equalsWriter(boardId)){
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
    @PostMapping("/comment/{receiveBoardId}")
    public HttpStatus writeComment(@PathVariable String receiveBoardId, @RequestBody CommentDto commentDto){
        long boardId = Long.parseLong(receiveBoardId.strip());
        log.info(boardId + " 게시글 댓글 작성");
        try {
            boardService.writeComment(commentDto, boardId);
        }catch (RuntimeException e){
            return HttpStatus.BAD_REQUEST;
        }
        log.info("댓글작성 로직끝");
        return HttpStatus.OK;
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