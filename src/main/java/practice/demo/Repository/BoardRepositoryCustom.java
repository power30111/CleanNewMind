package practice.demo.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.BoardSearchCond;
@Repository
public interface BoardRepositoryCustom {


    Page<BoardDto> searchPage(BoardSearchCond boardSearchCond, Pageable pageable);

}
