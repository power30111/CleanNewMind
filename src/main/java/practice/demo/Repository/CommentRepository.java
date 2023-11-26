package practice.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import practice.demo.domain.Comment;

public interface CommentRepository extends JpaRepository<Comment,Long> {

}
