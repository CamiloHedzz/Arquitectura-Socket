package com.example.websocketi.controller;

import com.example.websocketi.socket.Socket;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.websocket.EncodeException;
import java.io.IOException;

@Controller
@RequestMapping(value = "/controler")
public class SocketController {
    @RequestMapping(value = "/broadcast")
    public ResponseEntity<String> testSocket(@RequestParam("message") String message) throws IOException, EncodeException {
        System.out.println("Entra al broad");
        Socket.broadcast(message);
        String successMessage = String.format("Operation completed! " +
                "Data broadcast to %s listeners", Socket.listeners.size());
        return new ResponseEntity<>(successMessage, HttpStatus.OK);
    }

    @RequestMapping(value = "/fuction")
    public void imprimir(){
        System.out.println("Funion");
    }
}
