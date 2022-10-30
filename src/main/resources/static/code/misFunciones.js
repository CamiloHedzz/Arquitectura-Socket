var mySocket = new WebSocket("ws://152.67.43.252:8085/webSocket");


mySocket.onopen = function (e){
    console.log(e)
    console.log("Coneccion Satisfactoria")
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

function traerInformacion(){
    $.ajax({
        url:"/api/Fichas/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          console.log("Base de datos insertada");
          console.log(respuesta)

        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

function pintarFicha(){
   traerInformacion();
    let url = 'src="'+obtenerCaramelo()+'"';
    console.log(url)
    let card = '<div class=\"card\" style=\"width: 18rem;\">';
    card+='<img class="card-img-top" '+url.toString()+' alt="Card image cap">';
    card+= `<div class="card-body">
                <h5 class="card-title">Jugador</h5>
                <p class="card-text">Felicitaciones!</p>
                
            </div>
            </div>
            <br>`
    console.log(card)
    $("#caramelos").append(card);
    mySocket.send( "A un usuario le ha salido un nuevo jugador!");
}

function obtenerCaramelo(){
    let url = "/images/";
    let casaca = Math.floor((Math.random() * 18) + 1);
    switch (Math.floor((Math.random() * 6) + 1)) {
        case 1:
            url+="Ecuador/";
            break;
        case 2:
            url+="Inglaterra/";
            break;
        case 3:
            url+="Argentina/";
            break;
        case 4:
            url+="Mexico/";
            break;
        case 5:
            url+="Francia/";
            break;
        case 6:
            url+="España/";
            break;
    }
    url  += "("+casaca.toString()+").jpg";
    return url
}






