<?php

    private $HOST = 'localhost';
    private $USER = 'root';
    private $PASS = '';
    private $DBNM = 

    function connect(){
        
        $conn = new mysqli ($this->HOST,$this->USER,$this->PASS,$this->DBNM);

        if($conn){
            return $conn;
        }

        retur null;

    }

?>