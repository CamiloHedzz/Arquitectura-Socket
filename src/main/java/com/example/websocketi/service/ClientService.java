package com.example.websocketi.service;


import com.example.websocketi.model.Client;
import com.example.websocketi.model.Fichas;
import com.example.websocketi.repository.ClientRepository;
import com.example.websocketi.repository.FichasRepository;
import com.example.websocketi.socket.Socket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private FichasRepository fichasRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int clientId) {
        return clientRepository.getClient(clientId);
    }

    public Client save(Client client){
        Socket.broadcast("socketClient");
        if(client.getIdClient()==null){
            return clientRepository.save(client);
        }else{
            Optional<Client> e= clientRepository.getClient(client.getIdClient());
            if(!e.isPresent()){
                return clientRepository.save(client);
            }else{
                return client;
            }
        }
    }

    public void saveFichas(int idClient, int idFicha){
        Optional<Client> client = clientRepository.getClient(idClient);
        Optional<Fichas> ficha = fichasRepository.getFicha(idFicha);
        if(ficha.isPresent()){
            client.get().getFichas().add(ficha.get());
        }
        clientRepository.save(client.get());
    }

    public Client update(Client client){
        if(client.getIdClient()!=null){
            Optional<Client> e= clientRepository.getClient(client.getIdClient());
            if(e.isPresent()){
                if(client.getName()!=null) {
                    e.get().setName(client.getName());
                }
                clientRepository.save(e.get());
                return e.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }

    public boolean deleteClient(int clientId) {
        Boolean aBoolean = getClient(clientId).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public Client getClient(String user, String password) {
        return clientRepository.getUser(user, password);
    }

}
