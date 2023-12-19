package practice.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import practice.demo.domain.Content;

public interface ContentRepository extends JpaRepository<Content,Long> {

}
