function limpiarPantalla(){
    $(".registro").empty();
    let content ="<h3 class='iniciarSesion'>Registrate</h3>";
    content +=`
    <input class = "inputInicio" type="text" id="nombre" placeholder="Nombre">
    <input class = "inputInicio" type="text" id="correo" placeholder="Correo">
    <input class = "inputInicio" type="text" id="usuario" placeholder="Usuario">
    <input class = "inputInicio" type="password" id="password" placeholder="Contraseña">
    <button class="signup" onclick='agregarUsuario()'>Registrarse</button>`
    $(".registro").append(content);
}

function agregarUsuario(){
    let dataToSend = JSON.stringify(obtenerDatos());
    console.log(dataToSend)
    $.ajax({
        url:"/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json",
        data:dataToSend,
        success:function(respuesta){
            location.reload();
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

function iniciarSesion(){
    let name = $("#nombre").val()
    let data ={
        usuario:$("#nombre").val()
    }
    let dataToSend = JSON.stringify(name);
    $.ajax({
        url:"/api/Client/ingresar/"+name,
        datatype:"JSON",
        data:dataToSend,
        success:function(){
            console.log("Entraaaa")
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}



function obtenerDatos(){
    let data = {
        name:$("#nombre").val(),
        email:$("#correo").val(),
        usuario:$("#usuario").val(),
        password:$("#password").val(),
    };
    return data;
}