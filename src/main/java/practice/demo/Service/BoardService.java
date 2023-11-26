package practice.demo.Service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import practice.demo.Configure.SecurityUtil;
import practice.demo.Repository.BoardRepository;
import practice.demo.Repository.CommentRepository;
import practice.demo.domain.Board;
import practice.demo.domain.Comment;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.CommentDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.exception.BoardNotFoundException;
import practice.demo.exception.UserNotFoundException;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BoardService {
    private BoardRepository boardRepository;
    private MemberService memberService;
    private CommentRepository commentRepository;

    public List<Board> getBoardList(){
        return boardRepository.findAll();
    }
    public Long saveBoard(Board board){
        boardRepository.save(board);
        return board.getId();
    }
    public Optional<Board> findOne(Long id){
        return boardRepository.findById(id);
    }
    public BoardDto getBoardDto(Long id){
        return boardRepository.findById(id)
                .map(BoardDto::of)
                .orElseThrow(() -> new BoardNotFoundException("해당 게시글의 정보가 없습니다."));
    }
    public void deleteBoard(Long id){
        boardRepository.deleteById(id);
    }
    public Boolean equalsWriter(Long boardId){
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        Board board = findOne(boardId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지않습니다."));

        if(myInfoBySecurity.getUserId().
                equals(board.getMember().getUserId())){
            log.info("인증 요청한 UserId와 board를 작성한 UserId가 동일합니다.");
            return true;
        }else{
            log.info("인증 요청한 UserId와 board를 작성한 UserId가 동일하지않습니다.");
            return false;
        }
    }
    @Transactional
    public void update(Long boardId, BoardDto updateBoardDto){
        Board board = findOne(boardId).orElseThrow(() -> new BoardNotFoundException("해당 게시글이 존재하지않습니다."));
        if(equalsWriter(boardId)){
            board.updateBoard(updateBoardDto.getTitle(),updateBoardDto.getContent());
            log.info(boardId + "게시글이 정상적으로 수정되었습니다.");
        }else {
            log.info(boardId + "해당 게시글의 작성자와 요청자간 ID가 서로 다릅니다.");
        }
    }
    @Transactional
    public void writeComment(CommentDto commentDto,Long boardId){
        commentRepository.save(
            Comment.builder()
                    .board(boardRepository.getReferenceById(boardId))
                    .member(memberService.findById(SecurityUtil.getCurrentMemberId())
                            .orElseThrow(() -> new RuntimeException("인증정보에서 해당 유저를 찾을수없습니다.")))
                    .content(commentDto.getContent())
                    .build());
    }
}
