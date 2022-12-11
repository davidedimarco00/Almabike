<?php

/*
This class contains all the functions for require data from database
Database must be connect on 3306 port and its name is "almabikeDatabase".
Database is a local database.
*/

class DatabaseHelper {
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port) {
        $this->db = new mysqli($servername, $username, $password, "almabikeDatabase", $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $db->connect_error);
            echo "Connessione al database fallita";
        }
    }
}

?>
