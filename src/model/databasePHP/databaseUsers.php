<?php

/*
This class contains all the functions for require data from user's database
Database must be connect on 3306 port and its name is "usersdatabase".
Database is a local database.
*/

class DatabaseUserHelper {
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port) {
        $this->db = new mysqli($servername, $username, $password, "usersdatabase", $port);

        if ($this->db->connect_error) {
            die("Connection failed: " . $db->connect_error);
            echo "Connessione al database degli user fallita";
        }
    }


    
}

?>
