<?php

/*
This class contains all the functions for require data from sensors' database
Database must be connect on 3306 port and its name is "almabikedatabase".
Database is a local database.
*/

class DatabaseHelper {
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port) {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);

        if ($this->db->connect_error) {
            die("Connection failed: " + $this->$db->connect_error);
            echo "Connessione al database fallita";
        }
    }


    public function getAllDevicesName() {
        $query = "SELECT `Name` FROM `devices`";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getInitialYear() {
        $query = "SELECT YEAR(MIN(`Time`)) as initialYear FROM `readings`;";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $res=json_encode($result);
        return $result->fetch_all(MYSQLI_ASSOC);
    }


































    public function getDataforChart($cat, $r) { //cat è la categoria di grafico mentre r l'intervallo definito per ogni tipologia
        /*$query = "SELECT Nome, Cognome, Nickname, isVend FROM utente WHERE Nickname=? AND password=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$user, $pass);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);*/

        

        switch ($cat){
            case 'annual':
                return $this->getDataByYear($r);
            case 'daily':
                return $this->getDataByDay($r);
            case 'monthly':
                return $this->getDataByMonth($r);
            case 'weekly':
                break;
        }
        
    }


    public function getDataByYear($year) {
        $query = "SELECT `ID_device`,`Time`,`Noise_dBA` FROM `readings` WHERE YEAR(`Time`) = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$year);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDataByDay($date) {
        $query = "SELECT `Time`, `ID_device`, `Noise_dBA` from readings where DATE(`Time`) = ?;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$date);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDataByMonth($date) {
        $query = "SELECT `Time`, `ID_device`, `Noise_dBA` from readings where DATE(`Time`) = ?;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$month);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDataByWeek($date) {
        $query = "SELECT `Time`, `ID_device`, `Noise_dBA` from readings where DATE(`Time`) = ?;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$month);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    




    /*SENSORS POSITION QUERY*/

    public function getMeasurementCoord($sensorName) {
        $query = "SELECT DISTINCT CAST(`GPS_Latitude`*100000 as DECIMAL) AS lati, CAST(`GPS_Longitude`*100000 as DECIMAL) as longi
        FROM `readings` 
        WHERE `ID_device`=?
        GROUP BY lati, longi
        HAVING COUNT(`GPS_Latitude`) = 1 and COUNT(`GPS_Longitude`) = 1;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$sensorName);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    
}

?>
