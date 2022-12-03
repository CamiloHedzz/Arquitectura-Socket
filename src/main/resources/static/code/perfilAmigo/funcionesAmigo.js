var idClient = localStorage.getItem("idClient"); //El que inicio sesión
var idAmigo = localStorage.getItem("idAmigo");   //El perfil del amigo


var mySocket = new WebSocket("ws://localhost:8080/webSocket/"+idClient);


/*---------------Logica para el socket--------------------*/

mySocket.onopen = function (e){
    //console.log(e)
    //console.log("Coneccion Satisfactoria");
    //obtenerCliente();
}

mySocket.onmessage = function (e){
    let info = JSON.parse(e.data)
    let mensaje = info.msg.text;
    let nombreUsuario = info.msg.usuario.name;
    $("#conversacion").append(nombreUsuario+": "+mensaje+"<br>");
}

async function obtenerCliente(idCLiente){
    return $.ajax({
        url:"/api/Client/"+idCLiente,
        type:"GET",
        datatype:"JSON",
        success: await function(respuesta){
            
        }
    });
}

/*---------------Logica pintar el nombre del usuario--------------------*/

pintarUsuario();

async function pintarUsuario(){
    const user = await obtenerCliente(idAmigo);
    document.getElementById("nombreUsuario").innerHTML= user.name;
}

/*---------------Logica para enviar notificacion de seguimiento--------------------*/

function agregarAmigo(){
    $.ajax({
        url:"/api/Client/saveAmigo/"+idClient+"/"+idAmigo+"/",
        success:function(respuesta){
            document.getElementById("agregarAmigo").style.display="none";
            let btnEnviarMensaje = ` 
            <button type="button"  id = "enviarMensaje" class="btn btn-dark" onclick="abrirBanMensaje()">
                Enviar Mensaje
            </button>`
            $("#contenedorBotonAmigo").append(btnEnviarMensaje);
            enviarNotificacion();
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}


async function enviarNotificacion() {
    const user = await obtenerCliente(idClient);
    let msg = {
        text: ", Te ha empezado a seguir!",
        usuario: user,
        tipo: "notificacion",
        destino: idAmigo
    };
    mySocket.send(JSON.stringify({msg}));
}

mySocket.onmessage = function (e){
    let info = JSON.parse(e.data)
    let mensaje = info.msg.text;
    let nombreUsuario = info.msg.usuario.name;
    let destino = info.msg.destino;
    if(info.msg.tipo=="notificacion"){
        console.log("Notificacion desde"+idClient+" de amigo para: "+destino);
        if(idClient==info.msg.destino){
            const user = obtenerCliente(idClient);
            let noti =` 
            <div class="nuevaNotificacion">`+
                nombreUsuario +", ha empezado a seguirte!"+`
            </div>`
            $("#noti").append(noti);
        }
    }
}
