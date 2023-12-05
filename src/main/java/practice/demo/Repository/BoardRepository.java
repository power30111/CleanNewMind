package practice.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import practice.demo.domain.Board;

public interface BoardRepository extends JpaRepository<Board,Long> ,BoardRepositoryCustom{

}
