package com.example.websocketi.service;

import com.example.websocketi.model.Equipo;
import com.example.websocketi.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipoService {

    @Autowired
    private EquipoRepository categoriaRepository;

    public List<Equipo> getAll(){ return categoriaRepository.getAll(); }

    public Optional<Equipo> getCategoria(int id){ return categoriaRepository.getCategoria(id); }

    public Equipo save(Equipo c){
        if(c.getId()==null){
            return categoriaRepository.save(c);
        }else {
            Optional<Equipo> e = categoriaRepository.getCategoria(c.getId());
            if(e.isPresent()){
                return c;
            }else {
                return categoriaRepository.save(c);
            }
        }
    }

    public Equipo update(Equipo category){
        if(category.getId()!=null){
            Optional<Equipo> e = categoriaRepository.getCategoria(category.getId());
            if (e.isPresent()){
                if (category.getName()!=null){
                    e.get().setName(category.getName());
                }
                categoriaRepository.save(e.get());
                return e.get();
            }else {
                return category;
            }
        }else {
            return category;
        }
    }

    public boolean delete(int id){
        boolean flag=false;
        Optional<Equipo> e = categoriaRepository.getCategoria(id);
        if(e.isPresent()){
            categoriaRepository.delete(e.get());
            flag = true;
        }
        return flag;
    }

}
