package com.example.websocketi.controller;


import com.example.websocketi.model.Equipo;
import com.example.websocketi.service.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Equipo")
public class EquipoController {

    @Autowired
    private EquipoService categoriaService;

    @GetMapping("/all")
    public List<Equipo> getAll(){ return categoriaService.getAll(); }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Equipo save(@RequestBody Equipo c){ return categoriaService.save(c); }
}
