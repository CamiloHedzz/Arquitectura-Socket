//var mySocket = new WebSocket("ws://140.238.155.132:8080/webSocket");
var mySocket = new WebSocket("ws://localhost:8080/webSocket");
var cont = 0;
var unaFicha;

mySocket.onopen = function (e){
    console.log(e)
    console.log("Coneccion Satisfactoria");
    //obtenerCliente();
}

mySocket.onmessage = function (e){
    console.log(e.data)
    let myTable = e.data;
    $("#conversacion").append(myTable+"<br>");
}

function sendText() {
    let msg = {
        type: "message",
        text: $("#message").val()
    };
    mySocket.send(msg.text, {}, JSON.stringify({'name': $("#name").val()}));
}

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
    mySocket.send( "A un usuario le ha salido un nuevo jugador!");
}

function obtenerCaramelo(){
    let url = "/images/";
    let casaca = Math.floor((Math.random() * 9) + 1);
    let equipo = Math.floor((Math.random() * 4) + 1);
    let nombresEquipos = ["Ecuador/","Inglaterra/","Mexico/","Francia/","Espana/"];
    url  += nombresEquipos[equipo] + casaca + ".jpg";
    unaFicha = obtenerFicha(equipo, casaca);
    return url
}


/*
function obtenerCliente(idCLiente){
    $.ajax({
        url:"/api/Client/"+idCLiente,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          console.log(respuesta)
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

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



