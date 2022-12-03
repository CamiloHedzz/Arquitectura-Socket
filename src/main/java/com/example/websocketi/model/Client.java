package com.example.websocketi.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.websocket.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "client")
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idClient;

    private String name;

    private String email;

    private String usuario;

    private String password;

    private ArrayList<Integer> idAmigos = new ArrayList<>();

    public transient Session session;

    @ManyToMany
    @JsonIgnoreProperties("clientes")
    @JoinTable(name = "fichas_usuarios",
            joinColumns = @JoinColumn(name = "usuarioId"),
            inverseJoinColumns = @JoinColumn(name = "fichasId"))
    private List<Fichas> fichas;

    public Integer getIdClient() {
        return idClient;
    }

    public void setIdClient(Integer idClient) {
        this.idClient = idClient;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public List<Fichas> getFichas() {
        return fichas;
    }

    public void setFichas(List<Fichas> fichas) {
        this.fichas = fichas;
    }

    public ArrayList<Integer> getIdAmigos() {
        return idAmigos;
    }

    public void setIdAmigos(ArrayList<Integer> idAmigos) {
        this.idAmigos = idAmigos;
    }
}