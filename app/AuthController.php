<?php 
  
/* echo json_encode( $_SERVER ); */
/* var_dump($_GET); */
$username = $_POST['username'];
$password = $_POST['password'];

if($username == "admin"){
    if($password == "12345"){

        header('Location: ../home.html');
    }
}else{
    header('Location: ../login.html');
}



?>