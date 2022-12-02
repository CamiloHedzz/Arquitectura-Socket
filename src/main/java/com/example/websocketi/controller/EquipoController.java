package com.example.websocketi.controller;


import com.example.websocketi.model.Client;
import com.example.websocketi.model.Equipo;
import com.example.websocketi.service.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Equipo")
public class EquipoController {

    @Autowired
    private EquipoService equipoService;

    @GetMapping("/all")
    public List<Equipo> getAll(){ return equipoService.getAll(); }
    @GetMapping("/{id}")
    public Optional<Equipo> getEquipo(@PathVariable("id") int equipoId) {
        return equipoService.getEquipo(equipoId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Equipo save(@RequestBody Equipo c){ return equipoService.save(c); }

    @PostMapping("/saveAll")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Equipo> saveAll(@RequestBody List<Equipo> e){return (List<Equipo>) equipoService.saveAll(e); }
    
}
