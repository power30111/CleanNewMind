package practice.demo.domain.DTO;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberUpdateDto {

    private String userId;
    private String exPassword;
    private String newPassword;
    private String Email;
    private String name;


}
