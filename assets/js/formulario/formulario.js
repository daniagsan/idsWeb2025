$(document).ready(function() {

    $(document).on("keypress", function (e) {
        console.log("Evento keypress global detectado:", e);
    });

    $('input[placeholder="Enter your name"]').on("keypress", function(e) {

        console.log("Tecla presionada en el campo 'Enter your name':", String.fromCharCode(e.which));
    });

    $('input[placeholder="Create password"]').on("keypress", function(e) {
        const char = String.fromCharCode(e.which);
        if (char === ' ') { 
            e.preventDefault();
            console.log("No se permiten espacios en el campo de contraseña.");
        }
    });

    $('input[placeholder="Enter your email"]').on("keypress", function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            e.preventDefault(); 
            console.log("Solo se permiten números en el campo de email (para este ejemplo).");
        }
    });
});