package practice.demo.Service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import practice.demo.Configure.SecurityUtil;
import practice.demo.Repository.BoardRepository;
import practice.demo.Repository.CommentRepository;
import practice.demo.domain.Board;
import practice.demo.domain.Comment;
import practice.demo.domain.Content;
import practice.demo.domain.DTO.*;
import practice.demo.exception.BoardNotFoundException;
import practice.demo.exception.UserNotFoundException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
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
        if(!SecurityUtil.isAnonymousUser()) {
            MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
            Board board = findOne(boardId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지않습니다."));

            if (myInfoBySecurity.getUserId().
                    equals(board.getMember().getUserId())) {
                log.info("인증 요청한 UserId와 board를 작성한 UserId가 동일합니다.");
                return true;
            } else {
                log.info("인증 요청한 UserId와 board를 작성한 UserId가 동일하지않습니다.");
                return false;
            }
        }
        return false;
    }
    @Transactional
    public void update(Long boardId, BoardDto updateBoardDto){
        Board board = findOne(boardId).orElseThrow(() -> new BoardNotFoundException("해당 게시글이 존재하지않습니다."));

        List<Content> contentList = updateBoardDto.getContent().stream().
                map((ContentDto contentDto) -> ContentDto.toEntity(contentDto, board))
                .toList();

        //List<ContentDto> -> List<Content> 로 변경해줘!;
        board.updateBoard(updateBoardDto.getTitle(),contentList);

        log.info(boardId + "게시글이 정상적으로 수정되었습니다.");

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

    public Page<BoardDto> searchPage(BoardSearchCond cond, Pageable pageable){
       return boardRepository.searchPage(cond,pageable);
    }
}
