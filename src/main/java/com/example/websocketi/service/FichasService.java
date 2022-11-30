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
    private FichasRepository fichasRepository;

    public List<Fichas> getAll(){ return fichasRepository.getAll(); }

    public Optional<Fichas> getFicha(int id){ return fichasRepository.getFicha(id); }

    public Fichas save(Fichas d){
        if(d.getId()==null){
            return fichasRepository.save(d);
        }else {
            Optional<Fichas> e = fichasRepository.getFicha(d.getId());
            if(e.isPresent()){
                return d;
            }else {
                return fichasRepository.save(d);
            }
        }
    }

    public List<Fichas> saveAll(List<Fichas> fichas){
        return (List<Fichas>) fichasRepository.saveAll(fichas);
    }

    public Fichas update(Fichas costume){
        if(costume.getId()!=null){
            Optional<Fichas> e = fichasRepository.getFicha(costume.getId());
            if (e.isPresent()){if (costume.getName()!=null){
                    e.get().setName(costume.getName());
                }
                if (costume.getPosicion()!=null){
                    e.get().setPosicion(costume.getPosicion());
                }
                fichasRepository.save(e.get());
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
        Optional<Fichas> e = fichasRepository.getFicha(id);
        if(e.isPresent()){
            fichasRepository.delete(e.get());
            flag = true;
        }
        return flag;
    }


}