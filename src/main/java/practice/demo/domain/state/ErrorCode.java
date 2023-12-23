package practice.demo.domain.state;

import lombok.Getter;

@Getter
public enum ErrorCode{
    INVALID_MESSAGE(400,"Invalid message"),
    INVALID_TOKEN(401,"Invalid token");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
