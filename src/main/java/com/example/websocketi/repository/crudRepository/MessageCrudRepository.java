package com.example.websocketi.repository.crudRepository;

import com.example.websocketi.model.Client;
import com.example.websocketi.model.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message,Integer> {

}