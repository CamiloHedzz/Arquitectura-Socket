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
    private FichasCrudRepository disfrazCrudRepository;

    public List<Fichas> getAll(){ return (List<Fichas>) disfrazCrudRepository.findAll();}

    public Fichas save(Fichas d){ return disfrazCrudRepository.save(d); }

    public void delete(Fichas d){ disfrazCrudRepository.delete(d);}

    public Optional<Fichas> getDisfraz(int id){ return disfrazCrudRepository.findById(id);}
}
