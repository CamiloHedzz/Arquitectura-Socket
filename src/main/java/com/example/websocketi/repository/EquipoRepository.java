package com.example.websocketi.repository;

import com.example.websocketi.model.Equipo;
import com.example.websocketi.repository.crudRepository.EquipoCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EquipoRepository {

    @Autowired
    private EquipoCrudRepository categoriasCrudRepository;

    public List<Equipo> getAll(){ return (List<Equipo>) categoriasCrudRepository.findAll(); }

    public Equipo save(Equipo c){ return categoriasCrudRepository.save(c); }

    public List<Equipo> saveAll(List<Equipo> equipos){ return (List<Equipo>) categoriasCrudRepository.saveAll(equipos);}

    public void delete(Equipo c){ categoriasCrudRepository.delete(c);}

    public Optional<Equipo> getCategoria(int id){
        return categoriasCrudRepository.findById(id);
    }
}
