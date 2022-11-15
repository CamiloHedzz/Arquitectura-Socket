//var mySocket = new WebSocket("ws://140.238.155.132:8080/webSocket");
var mySocket = new WebSocket("ws://localhost:8080/webSocket");
var cont = 0;

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

function obtenerEquipo(idEquipo, idJugador){
    $.ajax({
        url:"/api/Equipo/"+idEquipo,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta.items)
            console.log(idJugador)
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });

}


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

function pintarFicha(){
    traerInformacion();
    cont=cont+1; // Es el identifiacador de cada fila de paquetes
    let fila = '<div class="filaCaramelos" id="fila'+cont+'"></div>';
    $("#caramelos").append(fila);
    for(i = 0; i<5;i++){
        let url = 'src="'+obtenerCaramelo()+'"';
        let tarjeta = `
        <div class="cardbox">
            <div class="card">
                <div class="cardbody">
                    <img class="cardImgage"`+url+`alt="Jugador">
                    <h2 id="nombre">Nombre</h2>  
                    <p id="Equipo">Equipo</p>
                    <p id="Posicion">Posicion</p>
                    <p id="Numero Ficha">Numero Ficha</p>
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
    let casaca = Math.floor((Math.random() * 11) + 1);
    let equipo = Math.floor((Math.random() * 5) + 1);
    obtenerEquipo(equipo, casaca);
    //traerInformacion(casaca);
    switch (equipo) {
        case 1:
            url+="Ecuador/";
            break;
        case 2:
            url+="Inglaterra/";
            break;
        case 3:
            url+="Mexico/";
            break;
        case 4:
            url+="Francia/";
            break;
        case 5:
            url+="Espana/";
            break;
    }
    url  += casaca+".jpg";
    return url
}






