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
    private FichasService disfrazService;

    @GetMapping("/all")
    public List<Fichas> getAll(){ return disfrazService.getAll(); }

    @GetMapping("/{id}")
    public Optional<Fichas> getCostume(@PathVariable("id") int id){ return disfrazService.getDisfraz(id); }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Fichas save(@RequestBody Fichas d){ return disfrazService.save(d); }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Fichas update(@RequestBody Fichas c){
        return disfrazService.update(c);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return disfrazService.delete(id);
    }






}
