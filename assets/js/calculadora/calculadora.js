const botones = document.querySelectorAll('.panelBotonesGrid button');
const inputContenido = document.getElementById('inputContenido');

let contenidoString = "";
let almacenCifras = new Array();

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        let proceso = boton.textContent.trim();
        
        switch(proceso.toUpperCase()){
            case "CE":
                inputContenido.value = "";
                contenidoString = "";
                almacenCifras = [];
                break;

            case "C":
                inputContenido.value = "";
                contenidoString = "";
                break;
            
            case "=":
                contenidoString = inputContenido.value.trim();
                console.log("Contenido String: ", contenidoString);
                //hacerlo arreglo la cantidad de cifras y ya con eso puedo decidir que hacer con lo demas
                let cifras = new Array();
                let operaciones = new Array();
                let auxHead = 0;
                let auxString;
                let i = 0;
                //evalua las operaciones que hay y las guarda en un array
                while(i< contenidoString.length){
                    if(!/[\d.]/.test(contenidoString[i])){

                        auxString = contenidoString.slice(auxHead,i);

                        /* console.log("AuxString: ", auxString); */

                        //aquí se colocan las cifras
                        cifras.push(contenidoString.slice(auxHead,i));

                        auxHead = i+1;
                        //aqui coloca la operacion
                        operaciones.push(contenidoString[i]);
                    }else if(i === contenidoString.length - 1){
                        cifras.push(contenidoString.slice(auxHead,contenidoString.length));
                    }else if(!/[\d.]/.test(contenidoString.at(-1))){
                        console.log("no numero al final")
                        break;
                    }
                   console.log(i);
                    i++;
                }

/*                 console.log("Cifras: ", cifras,
                            "\nOperaciones:", operaciones
                ); */

                productos(cifras, operaciones);

                break;
            
            default:
                contenido = boton.textContent.trim();
                contenidoString = contenidoString + contenido;
                inputContenido.value = contenidoString;
                break;
        }
        
    });
});

function productos(cifras, operaciones){
    //formatearlo a que solo sean numeros
    let resultado = 0;
    let cifrasRecortadas = cifras;

    for(i = 0; i < operaciones.length; i++){
        //que las operaciones y divisiones sean primero
        switch(operaciones[i]){
            case "+":
                resultado = parseInt(cifras[0]) + parseInt(cifras[1]);
                break;

            case "-":
                resultado = parseInt(cifras[0]) + parseInt(cifras[1]);
                break;

            case "*":
                resultado = parseInt(cifras[0]) + parseInt(cifras[1]);
                break;
            
            case "/":
                resultado = parseInt(cifras[0]) + parseInt(cifras[1]);
                break;
        }
        console.log("Cifras recortadas:",cifras);
        cifras.shift();
    }
    console.log("resultado: ", resultado);

}
