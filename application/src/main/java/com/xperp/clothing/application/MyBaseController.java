package com.xperp.clothing.application;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@RestController
@RestControllerAdvice
public class MyBaseController {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public String onIllegalFields(MethodArgumentNotValidException exception, HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        String error = exception.getBindingResult().getFieldErrors()
                .stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(" "));
        return error;
    }

    @ExceptionHandler(RuntimeException.class)
    public void onException(RuntimeException e, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getOutputStream().write(e.getMessage().getBytes(StandardCharsets.UTF_8));
    }
}
