var letter = "Hola coomoe ss";

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
    $.ajax({
        url:"/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json",
        data:dataToSend,
        success:function(respuesta){
            console.log(respuesta)
            location.reload();
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

function iniciarSesion(){
    $.ajax({
        url:"/api/Client/ingresar/"+$("#nombre").val()+"/"+$("#password").val(),
        datatype:"JSON",
        success:function(respuesta){
            if(respuesta.usuario != null){
                localStorage.setItem("idClient", respuesta.idClient);
                window.open("/code/principal/paginaPrincipal.html", "_self");

            }else{
                alert("No existe el usuario o la contraseña es incorrecta")
            }
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
        password:$("#password").val()
    };
    return data;
}