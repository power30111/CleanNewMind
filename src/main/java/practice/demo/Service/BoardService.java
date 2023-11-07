package practice.demo.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practice.demo.Repository.BoardRepository;
import practice.demo.domain.Board;

import java.util.List;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;

    public List<Board> getBoardList(){
        return boardRepository.findAll();
    }
    public Long saveBoard(Board board){
        boardRepository.save(board);
        return board.getId();
    }
}
