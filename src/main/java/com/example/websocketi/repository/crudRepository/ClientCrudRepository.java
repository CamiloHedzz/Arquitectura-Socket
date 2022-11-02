package com.example.websocketi.repository.crudRepository;

import com.example.websocketi.model.Client;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ClientCrudRepository extends CrudRepository<Client,Integer> {


    //
    //@Query("SELECT c.usuario FROM Client AS c WHERE c.usuario LIKE %?1%")
    @Query("SELECT c.usuario FROM Client AS c WHERE c.usuario =:user")
    public Client getUser(String user);

}