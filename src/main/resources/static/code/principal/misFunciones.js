
//var mySocket = new WebSocket("ws://140.238.155.132:8080/webSocket");
var cont = 0;
var unaFicha;

var idClient = localStorage.getItem("idClient");

var mySocket = new WebSocket("ws://localhost:8080/webSocket/"+idClient);

pintarTabla();

/*---------------Logica para el socket--------------------*/
mySocket.onopen = function (e){
    console.log(e)
    //console.log("Coneccion Satisfactoria");
    //obtenerCliente();
}

mySocket.onmessage = function (e){
    let info = JSON.parse(e.data)
    let mensaje = info.msg.text;
    let nombreUsuario = info.msg.usuario.name;
    $("#conversacion").append(nombreUsuario+": "+mensaje+"<br>");
}

async function sendText() {
    const user = await obtenerCliente(idClient);
    let msg = {
        text: $("#message").val(),
        usuario: user
    };
    mySocket.send(JSON.stringify({msg}));
}

async function obtenerCliente(idCLiente){
    return $.ajax({
        url:"/api/Client/"+idCLiente,
        type:"GET",
        datatype:"JSON",
        success: await function(respuesta){
            return respuesta
        }
    });
}

/*---------------Logica para ventanas emergentes--------------------*/

function cerrarVentanas(){
    var divs = document.getElementsByClassName("ventanaEmergentes")
    Array.from(divs).forEach((x) => {
        if (x.style.display === "block") {
          x.style.display = "none";
        }
      })
}

function abrirUsuario(){
    if(document.getElementById("ventanaUser").style.display =="block"){
        document.getElementById("ventanaUser").style.display="none";  
    }else{
        cerrarVentanas();
        document.getElementById("ventanaUser").style.display="block";
    }
}

function abrirMensajes(){
    if(document.getElementById("ventanaMessages").style.display=="block"){
        document.getElementById("ventanaMessages").style.display="none";
    }else{
        cerrarVentanas();
        document.getElementById("ventanaMessages").style.display="block";
    }
}

function abrirNotificaciones(){
    
    if(document.getElementById("ventanaNoti").style.display=="block"){
        document.getElementById("ventanaNoti").style.display="none";

    }else{
        cerrarVentanas();
        document.getElementById("ventanaNoti").style.display="block";
    }
}

function abrirConversacion(nomUser){
    let conversa = `
        <div class="ventanaConversacion">
            <div class="cabeceraConversacion" onclick="accionConversacion()"> <a href="www.google.co">Juan Arias</a></div>
            <div id= "conversacion" class="contenidoConversacion">
                <input type="text" class="inputMensaje" id="message" placeholder="Escribe algo...">
                <button class="enviarMensaje" onclick="sendText()">Enviar</button>
            </div>
        </div>`
    $("#contenidoDer").append(conversa);
    console.log(nomUser);
}

function accionConversacion(){
    if(document.getElementById("conversacion").style.display=="block"){
        document.getElementById("conversacion").style.display="none";

    }else{
        document.getElementById("conversacion").style.display="block";
    }
}


/*---------------Logica para pintar las fichas--------------------*/

function obtenerFicha(idEquipo, idJugador){
    $.ajax({
        url:"/api/Equipo/"+idEquipo,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta.fichas[idJugador]);
            return respuesta.fichas[idJugador];
        },
        error:function(xhr, respuesta){
            alert("Error de peticion");
        }
    });
}

function pintarFicha(){
    cont=cont+1; // Es el identifiacador de cada fila de paquetes
    let fila = '<div class="filaCaramelos" id="fila'+cont+'"></div>';
    $("#caramelos").append(fila);
    for(i = 0; i<5;i++){
        console.log("Entra: "+i);
        let url = 'src="'+obtenerCaramelo()+'"';
        let tarjeta = `
        <div class="cardbox">
            <div class="card">
                <div class="cardbody">
                    <img class="cardImgage"`+url+`alt="Jugador">
                    <h2 id="nombre"> Nombre </h2>  
                    <p id="Posicion">posicion</p>
                    <p id="Numero Ficha">numero ficha</p>
                </div>
                <div class="back"> </div>
            </div>
        </div>;`
        $("#fila"+cont).append(tarjeta);
    }
}

function obtenerCaramelo(){
    let url = "../images/";
    let num = Math.floor((Math.random() * 180) + 1);
    agregarFicha(num);
    url  += num + ".png";
    return url
}

function agregarFicha(idFicha){
    $.ajax({ 
        url:"/api/Client/saveFicha/"+idCLiente+"/"+idFicha+"/",
        datatype:"JSON",
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

/*----------------- Logica para pintar las tablas -----------------*/

function pintarTabla(){
    $.ajax({
        url:"/api/Fichas/all",
        type:"GET",
        datatype:"JSON",
        success:function(fichas){
            console.log("entraa");
            for(let i = 0; i<180 ; i++){
                let columna = `<tr class='fila'>
                <td id="Equipo">`+fichas[i].equipo.name+`</td>
                <td id="Nombre">`+fichas[i].name+`</td>
                <td id="Posicion">`+fichas[i].posicion+`</td>
                <td id="nficha">`+fichas[i].id+`</td>
                </tr>`
                $("#tablaFichas").append(columna);
            }
        }
    });
}


/*
function traerInformacion(casaca){
    $.ajax({
        url:"/api/Fichas/"+casaca,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           console.log(respuesta)
        },
        error:function(xhr, respuesta){
            //alert("Error de peticion")
        }
    });
}
*/



