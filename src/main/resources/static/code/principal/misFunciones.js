//var mySocket = new WebSocket("ws://140.238.155.132:8080/webSocket");
var cont = 0;
var unaFicha;

let idClient = localStorage.getItem("idClient");

var mySocket = new WebSocket("ws://localhost:8080/webSocket/"+idClient);

pintarTabla();

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
    if(info.msg.tipo=="mensaje"){
        $("#conversacion").append(nombreUsuario+": "+mensaje+"<br>");
    }else if(info.msg.tipo=="notificacion"){
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

async function sendText() {
    const user = await obtenerCliente(idClient);
    console.log(user)
    let msg = {
        text: $("#message").val(),
        usuario: user,
        tipo: "mensaje"
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

function abrirConversacion(){
    let conversa = `
        <div class="ventanaConversacion">
            <div class="cabeceraConversacion" onclick="accionConversacion()"> <a href="../perfilAmigo/PerfilAmigo.html">Juan Arias</a></div>
            <div id= "conversacion" class="contenidoConversacion">
                <input type="text" class="inputMensaje" id="message" placeholder="Escribe algo...">
                <button class="enviarMensaje" onclick="sendText()">Enviar</button>
            </div>
        </div>`
    $("#contenidoDer").append(conversa);
}

function accionConversacion(){
    if(document.getElementById("conversacion").style.display=="block"){
        document.getElementById("conversacion").style.display="none";
    }else{
        document.getElementById("conversacion").style.display="block";
    }
}

/*---------------Logica para pintar las fichas--------------------*/

var nombre="", posicion="", id=0, fecha="";

function obtenerFicha(idFicha){
    $.ajax({
        async: false,
        url:"/api/Fichas/"+idFicha,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            id = respuesta.id;
            nombre = respuesta.name;
            posicion = respuesta.posicion;
            fecha = respuesta.fecha_nacimiento;   
        },
        error:function(xhr, respuesta){
            alert("Error de peticion");
        }
    });
}

function agregarFicha(idFicha){
    $.ajax({ 
        url:"/api/Client/saveFicha/"+idClient+"/"+idFicha+"/",
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

function pintarFicha(){
    cont=cont+1; 
    let fila = '<div class="filaCaramelos" id="fila'+cont+'"></div>';
    $("#caramelos").append(fila);
    for(i = 0; i<5;i++){
        let url = 'src="'+obtenerCaramelo()+'"';
        let tarjeta = `
        <div class="cardbox">
            <div class="card">
                <div class="cardbody">
                    <img class="cardImgage"`+url+`alt="Jugador">
                </div>
                <div class="back"> 
                    <h2 id="nombre">`+nombre+`</h2>  
                    <p id="Posicion">`+posicion+`</p>
                    <p id="Numero Ficha">`+id+`</p>
                    <p id="Fecha Nacimiento">`+fecha+`</p>
                </div>
            </div>
        </div>`
         $("#fila"+cont).append(tarjeta);
    }
    pintarAbierta();
    //mySocket.send( "A un usuario le ha salido un nuevo jugador!");
}

function obtenerCaramelo(){
    let url = "../../images/";
    let num = Math.floor((Math.random() * 180) + 1);
    agregarFicha(num);
    obtenerFicha(num);
    if(num>=109){
        url  += num + ".png";
    }else{
        url  += num + ".jpg";
    }
    return url
}

/*----------------- Logica para pintar las tablas -----------------*/

function pintarTabla(){
    $.ajax({
        url:"/api/Fichas/all",
        type:"GET",
        datatype:"JSON",
        success:function(fichas){
            for(let i = 0; i<180 ; i++){
                let columna = `<tr id="`+i+`"class='fila'>                
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

function pintarAbierta(){
    $.ajax({
        url:"/api/Client/"+idClient,
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            let fichas = [];
            for(let i = 0; i<respuesta.fichas.length;i++){
                fichas.push(respuesta.fichas[i].id);
            }
            fichas.sort((a,b)=>a-b);
            for(let i = 0 ; i<fichas.length ; i++){
                if((fichas[i])==(fichas[i-1])){
                    document.getElementById(fichas[i]-1).style.backgroundColor ="#dad865";
                }else{
                    document.getElementById(fichas[i]-1).style.backgroundColor = "#2e8c42";
                }
            }
        }
    });
}



/*-----------------Logica para el buscador-----------------*/

function obtenerUsername(){
    let username = $("#search").val();
    $.ajax({
        url:"/api/Client/obtener/"+username,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            for(i = 0; i<respuesta.length;i++){
                let infoVentana = `
                <div id="`+respuesta[i].idClient+`" onclick="abrirPerAmigo(`+respuesta[i].idClient+`)" class="usuarioEncontrado">
                <h1 class="nomUsuarioEnc">`+ respuesta[i].name+`</h1>
                <h5>Fichas Encontradas: `+respuesta[i].fichas.length+`</h5>
                </div>`
                $("#ventanaBuscador").append(infoVentana);
            }
            
        },
        error:function(xhr, respuesta){
            $("#ventanaBuscador").append("No encontramos a nadie :(");
        }
    });
}

/*-----------------Logica para el buscador-----------------*/

function abrirPerAmigo(idAmigo){
    localStorage.setItem("idAmigo", idAmigo);
    window.open("/code/perfilAmigo/PerfilAmigo.html", "_self");
}

function buscar(e){
    if(e.key=='Enter'){
        if(document.getElementById("ventanaBuscador").style.display==""){
            document.getElementById("ventanaBuscador").style.display="block";
        }
        document.getElementById('ventanaBuscador').innerHTML = '';
        obtenerUsername();
        
    }
}