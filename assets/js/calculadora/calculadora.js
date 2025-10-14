const botones = document.querySelectorAll('.panelBotonesGrid button');
const inputContenido = document.getElementById('inputContenido');

let contenidoString = "";

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        let proceso = boton.textContent.trim();
        
        switch(proceso.toUpperCase()){
            case "CE":
                console.log("entra CE");
                inputContenido.value = "";
                contenidoString = "";
                break;

            case "C":
                console.log("entra CE");
                inputContenido.value = "";
                contenidoString = "";
                break;
            
            case "=":
                let cantidadCifras = 0;
                let operaciones = new Array();
                //evalua las operaciones que hay y las guarda en un array
                for( let i = 0; i < contenidoString.length; i++){
                    if(!/[1-9]/.test(contenidoString[i])){
                        cantidadCifras++;
                        console.log(cantidadCifras);
                        operaciones.push(contenidoString[i]);
                    }
                }

                //aqui va a guardar las cifras en cada index del array almacen cifras


                break;
            
            default:
                contenido = boton.textContent.trim();
                contenidoString = contenidoString + contenido;
                inputContenido.value = contenidoString;
                break;
        }
        
    });
});