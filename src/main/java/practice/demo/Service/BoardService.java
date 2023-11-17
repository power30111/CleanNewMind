package practice.demo.Service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practice.demo.Repository.BoardRepository;
import practice.demo.domain.Board;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.MemberResponseDto;
import practice.demo.exception.UserNotFoundException;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private MemberService memberService;

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
                .orElseThrow(() -> new RuntimeException("해당 게시글의 정보가 없습니다."));
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
}
