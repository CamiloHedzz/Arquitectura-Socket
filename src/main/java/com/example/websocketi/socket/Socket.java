package com.example.websocketi.socket;

import com.example.websocketi.model.Client;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.GeneratedValue;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Slf4j
@Component
//@ServerEndpoint(value = "/webSocket/{idUser}")
@ServerEndpoint(value = "/webSocket")

public class Socket {
    private Session session;
    public static Set<Socket> listeners = new CopyOnWriteArraySet<>();

    public Client unClient;

    HashMap<Session, String> myHm = new HashMap<>();

    private static ArrayList<Session> client = new ArrayList<>();
    @OnOpen
    @GetMapping("/{id}")
    public void onOpen(Session session) throws InterruptedException {
        String k = session.getPathParameters().get("idUser");
        System.out.println(k);
        myHm.put(session, k);
        this.session = session;
        client.add(session);
        listeners.add(this);
        log.info(String.format("New session connected! Connected listeners: %s", listeners.size()));

    }

    @OnMessage //Allows the client to send message to the socket.
    public void onMessage(Session session, String message) {
        broadcast(message);
    }

    @OnClose
    public void onClose(Session session) {
        listeners.remove(this);
        log.info(String.format("Session disconnected. Total connected listeners: %s", listeners.size()));
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        log.info(String.format("Paila perro"));
    }

    public static void broadcast(String message) {
        for (Socket listener : listeners) {
            listener.sendMessage(message);
        }
    }

    private void sendMessage(String message) {
        try {
            this.session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            log.error("Caught exception while sending message to Session Id: " + this.session.getId(), e.getMessage(), e);
        }
    }
}