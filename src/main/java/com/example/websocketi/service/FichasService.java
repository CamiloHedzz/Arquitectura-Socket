package com.example.websocketi.service;

import com.example.websocketi.model.Fichas;
import com.example.websocketi.repository.FichasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FichasService {

    @Autowired
    private FichasRepository disfrazRepository;

    public List<Fichas> getAll(){ return disfrazRepository.getAll(); }

    public Optional<Fichas> getDisfraz(int id){ return disfrazRepository.getDisfraz(id); }

    public Fichas save(Fichas d){
        if(d.getId()==null){
            return disfrazRepository.save(d);
        }else {
            Optional<Fichas> e = disfrazRepository.getDisfraz(d.getId());
            if(e.isPresent()){
                return d;
            }else {
                return disfrazRepository.save(d);
            }
        }
    }

    public Fichas update(Fichas costume){
        if(costume.getId()!=null){
            Optional<Fichas> e = disfrazRepository.getDisfraz(costume.getId());
            if (e.isPresent()){if (costume.getName()!=null){
                    e.get().setName(costume.getName());
                }
                if (costume.getPosicion()!=null){
                    e.get().setPosicion(costume.getPosicion());
                }
                disfrazRepository.save(e.get());
                return e.get();
            }else {
                return costume;
            }
        }else {
            return costume;
        }
    }

    public boolean delete(int id){
        boolean flag=false;
        Optional<Fichas> e = disfrazRepository.getDisfraz(id);
        if(e.isPresent()){
            disfrazRepository.delete(e.get());
            flag = true;
        }
        return flag;
    }


}
