const inputs = document.querySelectorAll('#form .form_input');
const emailInput = document.getElementById('inputMail');
const submitButton = document.getElementById('registerButton');

var flag = false;

inputs.forEach(input => {
    input.addEventListener('keydown', function(event){
    
    const inputId = input.id;
    const inputValue = input.value.trim();
    const key = event.key;
    const regExNumbers = /[0-9]/g;
    const arroba = /@/;

    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft','ArrowRigth'];

    if(allowedKeys.includes(key)){
        return;
    }

    console.log(`Validando tecla "${key}" el input: ${inputId}`);

    switch(inputId){
        case "inputName":
            if(regExNumbers.test(key)){
                event.preventDefault();   
                //input.value = inputValue.replace(regExNumbers, '');
            }
            break;
        case "inputPassword":
            if(key === ' '){
                console.log("Se presiono espacio");
                event.preventDefault();
            }

            break;
        case "inputPassConfirm":
            if(key === ' '){
                console.log("Se presiono espacio");
                event.preventDefault();
            }
            break;
    } 

    });
});

emailInput.addEventListener('blur', function(event){
    let finder = ""
        finder = emailInput.value.trim();

    

    for(let i = 0; i < finder.length; i++){
        if(/@/.test(finder[i]) || /\./.test(finder[i])){
            console.log("Se encontró un arroba o un punto");
            flag = true;
        }
    }

    if(!flag){
        emailInput.style.borderColor = 'red';
    }

});

submitButton.addEventListener('click', () => {
    if(!flag){
        console.log("Revisar campos");
    }
})