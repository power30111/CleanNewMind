package practice.demo.domain.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import practice.demo.domain.Member;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String userId;
    private String name;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .userId(member.getUserId())
                .name(member.getName())
                .build();

    }
}