package practice.demo.domain;

public enum StatusEnum {
    OK(200,"OK"),
    BAD_REQUEST(400,"BAD_REQUEST"),
    NOT_FOUNT(404,"NOT_FOUND");
    int StatusCode;
    String code;

    StatusEnum(int statusCode, String code) {
        this.StatusCode = statusCode;
        this.code = code;
    }
}
