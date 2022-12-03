let idClient = localStorage.getItem("idClient");

obtenerCliente()

function obtenerCliente(){
    $.ajax({
        url:"/api/Client/"+idClient,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            document.getElementById("nombre").innerHTML=respuesta.name;
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

function abrirEquipo(idEquipo){
    /*let fila = '<div class="filaCaramelos" id="fila'+cont+'"></div>';
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
    }*/

    fichas = obtenerFichas();

    if(document.getElementById("contenidoFichas").style.display=="none"){
        document.getElementById("contenidoFichas").style.display="block";
    }else{
        document.getElementById("contenidoFichas").style.display="none"
    }

    console.log(fichas);

    for(let i = 0; i<fichas.length;i++){
        let parrafo = '<p class="misCaramelos">'+respuesta.fichas[i].name+'</p>';
        $("contenidoFichas").append(parrafo);
    }
}

async function obtenerFichas(){
    return $.ajax({
        url:"/api/Client/"+idClient,
        type:"GET",
        datatype:"JSON",
        success: await function(respuesta){
            return respuesta
        }
    });
}