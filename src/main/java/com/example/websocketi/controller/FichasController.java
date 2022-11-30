package com.example.websocketi.controller;

import com.example.websocketi.model.Fichas;
import com.example.websocketi.service.FichasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Fichas")
public class FichasController {

    @Autowired
    private FichasService fichasService;

    @GetMapping("/all")
    public List<Fichas> getAll(){ return fichasService.getAll(); }

    @GetMapping("/{id}")
    public Optional<Fichas> getCostume(@PathVariable("id") int id){ return fichasService.getFicha(id); }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Fichas save(@RequestBody Fichas d){ return fichasService.save(d); }

    @PostMapping("/saveAll")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Fichas> saveAll(@RequestBody List<Fichas> f){ return (List<Fichas>) fichasService.saveAll(f);}

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Fichas update(@RequestBody Fichas c){
        return fichasService.update(c);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return fichasService.delete(id);
    }
}
