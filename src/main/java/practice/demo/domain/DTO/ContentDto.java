package practice.demo.domain.DTO;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import practice.demo.Service.ContentService;
import practice.demo.domain.Board;
import practice.demo.domain.Content;

@Getter
@Setter
public class ContentDto {

    private Long order;
    private String text;
    private String image;

    public static Content toEntity(ContentDto contentDto, Board board){
        return Content.builder()
                .contentOrder(contentDto.getOrder())
                .text(contentDto.getText())
                .imageUrl(ContentService.getImageUrl(
                        contentDto.getOrder(),
                        board.getUuid()))
                .build();
    }
    public static ContentDto of(Content content){
        return ContentDto.builder()
                .order(content.getContentOrder())
                .text(content.getText())
                .imageEncodeBase64(ContentService.imageUrlToEncode(content.getImageUrl()))
                .build();
    }

    @Builder
    public ContentDto(Long order, String text, String imageEncodeBase64) {
        this.order = order;
        this.text = text;
        this.image = imageEncodeBase64;
    }
}
