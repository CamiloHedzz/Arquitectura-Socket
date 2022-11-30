package com.example.websocketi.controller;


import com.example.websocketi.model.Client;
import com.example.websocketi.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Client")
public class ClientController {

    @Autowired
    private ClientService clientService;
    @GetMapping("/all")
    public List<Client> getClients(){
        return clientService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Client> getClient(@PathVariable("id") int clientId) {
        return clientService.getClient(clientId);
    }

    @GetMapping("ingresar/{user}/{password}")
    public Client getClient(@PathVariable("user") String userClient, @PathVariable("password") String userPassword) {
        return clientService.getClient(userClient, userPassword);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save(@RequestBody Client client) {
        return clientService.save(client);
    }

    @GetMapping("/saveFicha/{idClient}/{idFicha}")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveFicha(@PathVariable("idClient") int idCLient, @PathVariable("idFicha") int idFicha) {
        clientService.saveFichas(idCLient,idFicha);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Client update(@RequestBody Client client) {
        return clientService.update(client);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int clientId) {
        return clientService.deleteClient(clientId);
    }

}
