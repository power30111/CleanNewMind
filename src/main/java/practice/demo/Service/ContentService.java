package practice.demo.Service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import practice.demo.Repository.ContentRepository;
import practice.demo.domain.Board;
import practice.demo.domain.Content;
import practice.demo.domain.DTO.BoardDto;
import practice.demo.domain.DTO.ContentDto;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Slf4j
@Service
public class ContentService {
    @Autowired
    private ContentRepository contentRepository;

    static Path currentPath = Paths.get("");
    static String path = currentPath.toAbsolutePath().toString()+"_ImageFolder/";

    public static String getImageUrl(Long order,String uuid){
        return path+uuid+order+".png";
    }

    /**
     * 이미지 URL 을 조회해서 encode된 파일로 반환해주는 메서드.
     * @param imageUrl
     * @return imageEncodeBase64;
     */
    public static String imageUrlToEncode(String imageUrl){
        try{
            byte[] imageBytes = Files.readAllBytes(Paths.get(imageUrl));

            return Base64.getEncoder().encodeToString(imageBytes);

        }catch (IOException e){
            log.info("이미지 인코딩중 예외발생");
            e.printStackTrace();
            return "";
        }

    }

    public void saveAllImageInFolder(BoardDto boardDto,String uuid){
        log.info("일단 saveAllImageFolder 에 들어옴");
        List<ContentDto> contentDtoList = boardDto.getContent();

        for (ContentDto contentDto : contentDtoList) {
            String imageEncodeBase64 = contentDto.getImage();
            byte[] decodedImage = Base64.getDecoder().decode(imageEncodeBase64);

            String imageUrl = getImageUrl(contentDto.getOrder(), uuid);

            try (FileOutputStream fileOutputStream = new FileOutputStream(imageUrl)) {
                fileOutputStream.write(decodedImage);
                log.info("이미지 저장완료. 이미지경로 : "+imageUrl);
            } catch (IOException e) {
                log.info("이미지 저장중 예외");
                throw new RuntimeException(e);
            }
        }
    }

    @Transactional
    public void saveAllEntity(List<Content> contentList,Board board) {
        for (Content content : contentList) {
            content.setBoard(board);
        }
        contentRepository.saveAll(contentList);
    }
}
