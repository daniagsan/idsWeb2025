<?php

class ConnectionController {
    private $HOST = 'localhost';
    private $USER = 'root';
    private $PASS = '';
    private $DBNM = 'mi_proyecto';

    public function connect(){
        
        $conn = new mysqli($this->HOST, $this->USER, $this->PASS, $this->DBNM);

        if(!$conn->connect_error){
            return $conn;
        }

        return null;

    }
}

?>