package practice.demo.Repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.BoardSearchCond;
import practice.demo.domain.DTO.QBoardDto;

import java.util.List;

import static practice.demo.domain.QBoard.*;
import static practice.demo.domain.QMember.*;

public class BoardRepositoryImpl implements  BoardRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public BoardRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public Page<BoardDto> searchPage(BoardSearchCond boardSearchCond, Pageable pageable) {
        List<BoardDto> result = queryFactory
                .select(new QBoardDto(
                        board.id.as("boardId"),
                        member.name.as("writer"),
                        board.title.as("title")
                ))
                .from(board)
                .leftJoin(board.member, member)
                .where(
                        writerNameLike(boardSearchCond.getWriterName()),
                        boardNameLike(boardSearchCond.getBoardName())
                )
                .offset(pageable.getOffset())
                .limit(10)
                .fetch();

        JPAQuery<Long> totalCount = queryFactory
                .select(board.count())
                .from(board)
                .leftJoin(board.member, member)
                .where(
                        writerNameLike(boardSearchCond.getWriterName()),
                        boardNameLike(boardSearchCond.getBoardName())
                );

        return PageableExecutionUtils.getPage(result,pageable,totalCount::fetchOne);

    }

    private BooleanExpression boardNameLike(String boardName) {
        //contains -> like %boardName% 검색
        return StringUtils.hasText(boardName) ? board.title.contains(boardName) : null;
    }

    private BooleanExpression writerNameLike(String writerName) {
        return StringUtils.hasText(writerName) ? member.name.contains(writerName) : null;
    }
}
