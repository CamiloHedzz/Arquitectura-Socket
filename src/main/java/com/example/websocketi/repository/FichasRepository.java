package com.example.websocketi.repository;

import com.example.websocketi.model.Fichas;
import com.example.websocketi.repository.crudRepository.FichasCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class FichasRepository {

    @Autowired
    private FichasCrudRepository fichasCrudRepository;

    public List<Fichas> getAll(){ return (List<Fichas>) fichasCrudRepository.findAll();}

    public Fichas save(Fichas d){ return fichasCrudRepository.save(d); }

    public List<Fichas> saveAll(List<Fichas> fichas){ return (List<Fichas>) fichasCrudRepository.saveAll(fichas) ;}

    public void delete(Fichas d){ fichasCrudRepository.delete(d);}

    public Optional<Fichas> getFicha(int id){ return fichasCrudRepository.findById(id);}
}
