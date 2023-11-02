package practice.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import practice.demo.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    Optional<Member> findByUserId(String userid);
    boolean existsByUserId(String id);
}
