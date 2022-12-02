package com.example.websocketi.service;

import com.example.websocketi.model.Client;
import com.example.websocketi.model.Equipo;
import com.example.websocketi.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipoService {
    @Autowired
    private EquipoRepository equipoRepository;

    public List<Equipo> getAll(){ return equipoRepository.getAll(); }

    public Optional<Equipo> getEquipo(int id){ return equipoRepository.getCategoria(id); }

    public Equipo save(Equipo c){
        if(c.getId()==null){
            return equipoRepository.save(c);
        }else {
            Optional<Equipo> e = equipoRepository.getCategoria(c.getId());
            if(e.isPresent()){
                return c;
            }else {
                return equipoRepository.save(c);
            }
        }
    }

    public List<Equipo> saveAll(List<Equipo> equipos){
        return (List<Equipo>) equipoRepository.saveAll(equipos);
    }

    public Equipo update(Equipo category){
        if(category.getId()!=null){
            Optional<Equipo> e = equipoRepository.getCategoria(category.getId());
            if (e.isPresent()){
                if (category.getName()!=null){
                    e.get().setName(category.getName());
                }
                equipoRepository.save(e.get());
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
        Optional<Equipo> e = equipoRepository.getCategoria(id);
        if(e.isPresent()){
            equipoRepository.delete(e.get());
            flag = true;
        }
        return flag;
    }
}