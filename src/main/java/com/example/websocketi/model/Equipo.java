package com.example.websocketi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "equipo")
public class Equipo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String imagen;

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "equipo")
    @JsonIgnoreProperties("equipo")
    private List<Fichas> fichas;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public List<Fichas> getFichas() {
        return fichas;
    }

    public void setFichas(List<Fichas> fichas) {
        this.fichas = fichas;
    }


}
