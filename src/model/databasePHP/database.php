<?php

/*
This class contains all the functions for require data from sensors' database
Database must be connect on 3306 port and its name is "almabikedatabase".
Database is a local database.
*/

class DatabaseHelper
{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port)
    {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);

        if ($this->db->connect_error) {
            die("Connection failed: " + $this->$db->connect_error);
            echo "Connessione al database fallita";
        }
    }


    public function getAllDevicesName()
    {
        $query = "SELECT `Name` FROM `devices`";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getInitialYear()
    {
        $query = "SELECT YEAR(MIN(`Time`)) as initialYear FROM `readings`;";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $res = json_encode($result);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkLogin($user, $pass)
    {
        $query = "SELECT Nome, Cognome, Email, Username  FROM users WHERE (Username=? OR Email=?) AND Psw=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $user, $user, $pass);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getDataforChart($cat, $r)
    { //cat è la categoria di grafico mentre r l'intervallo definito per ogni tipologia
        /*$query = "SELECT Nome, Cognome, Nickname, isVend FROM utente WHERE Nickname=? AND password=?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss',$user, $pass);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);*/
        switch ($cat) {
            case 'annual':
                return $this->getDataByYear($r);
            case 'daily':
                return $this->getDataByDay($r);
            case 'monthly':
                return $this->getDataByMonth($r);
            case 'weekly':
                return $this->getDataByWeek($r);

        }

    }


    public function getDataByYear($year)
    {
        $query = "SELECT DISTINCT `ID_device`,`Time`,`Noise_dBA`, CAST(`GPS_Latitude`*100000 as DECIMAL) AS lati, CAST(`GPS_Longitude`*100000 as DECIMAL) as longi 
        FROM `readings` WHERE YEAR(`Time`) = ?  GROUP BY lati, longi
        HAVING COUNT(`GPS_Latitude`) = 1 and COUNT(`GPS_Longitude`) = 1;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $year);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }



    public function getDataByDay($date)
    {
        $query = "SELECT `ID_device`,`Time`,`Noise_dBA`, CAST(`GPS_Latitude`*1000000 as DECIMAL) AS lati, CAST(`GPS_Longitude`*1000000 as DECIMAL) as longi 
        FROM `readings` WHERE DATE(`Time`) = ? ;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $date);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDataByMonth($yearAndMonth)
    {
        $dateParts = explode("-", $yearAndMonth);
        $year = $dateParts[0];
        $month = $dateParts[1];

        $query = "SELECT DISTINCT `ID_device`,`Time`,`Noise_dBA`, CAST(`GPS_Latitude`*100000 as DECIMAL) AS lati, CAST(`GPS_Longitude`*100000 as DECIMAL) as longi 
        FROM `readings` WHERE YEAR(`Time`) = ? AND MONTH(`Time`)=? GROUP BY lati, longi
        HAVING COUNT(`GPS_Latitude`) = 1 and COUNT(`GPS_Longitude`) = 1;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $year, $month);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);




    }


    /*SENSORS POSITION QUERY*/


    public function getMaxRecordLocationForSensor($sensorName)
    {
        $query = "SELECT `GPS_Latitude` as lati, `GPS_Longitude` as longi, MAX(`Noise_dBA`) 
        from `readings`
        where `ID_device`=?";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $sensorName);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getMeasurementCoord($sensorName)
    {
        $query = "SELECT DISTINCT CAST(`GPS_Latitude`*100000 as DECIMAL) AS lati, CAST(`GPS_Longitude`*100000 as DECIMAL) as longi, `Noise_dBA` 
        FROM `readings` 
        WHERE `ID_device`=?
        GROUP BY lati, longi
        HAVING COUNT(`GPS_Latitude`) = 1 and COUNT(`GPS_Longitude`) = 1;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $sensorName);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    public function getPositions()
    {
        $query = "SELECT DISTINCT ID_Device, CAST(`GPS_Latitude`*100000 as DECIMAL) AS lati, CAST(`GPS_Longitude`*100000 as DECIMAL) as longi, `Noise_dBA` 
        FROM `readings`
        WHERE `Noise_dBA` <> 0
        AND `GPS_Latitude` <> 0
        AND `GPS_Longitude` <> 0
        GROUP BY lati, longi, `Noise_dBA`;";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getNightPositions()
    {
        $query = "SELECT DISTINCT `Time`,ID_Device, CAST(`GPS_Latitude`*100000 as DECIMAL) AS lati, CAST(`GPS_Longitude`*100000 as DECIMAL) as longi, `Noise_dBA` 
        FROM `readings`
        WHERE TIME(`Time`) BETWEEN '18:00' AND '00:00'
        OR  TIME(`Time`) BETWEEN '00:00' AND '06:00'
        AND `Noise_dBA` <> 0 
        AND `GPS_Latitude` <> 0
        and `GPS_Longitude` <> 0
        GROUP BY lati, longi, `Noise_dBA` ;";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    //Queries on single sensor
    public function getSensorAssociatedWithUser($username)
    {
        $query = "SELECT `deviceName` 
        from `users_bike` A JOIN `bike_device` B 
        on A.codBicicletta = B.codBicicletta 
        where A.username = ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }


    /* LA QUERY CORRETTA DA APPLICARE PER I FILTRI ORARI E DI DATA èLA SEGUENTE:
    
            SELECT * FROM `readings` WHERE `ID_device`='A080' AND Time between '2022-06-06 16:00:00' and '2022-06-06 17:00:00';
    
    */







    public function getAllMeasureForDay($sensor, $day)
    {
        $query = "SELECT DISTINCT `GPS_Latitude` AS lati, `GPS_Longitude` as longi, `Noise_dBA` as Noise_dBA  , DATE_FORMAT(`Time`, '%H:%i:00') AS Hour   FROM `readings`
        WHERE (MINUTE(`Time`) = 0 OR MINUTE(`Time`) = 30 )
        AND DATE(`Time`) = ? and `ID_device`=? GROUP BY Hour ORDER BY Hour;";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $day, $sensor);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllMeasureForDayBetweenHpurs($sensor, $day, $startHour, $endHour)
    {
        $query = "SELECT DISTINCT `GPS_Latitude` AS lati, `GPS_Longitude` as longi, `Noise_dBA`, `Time`, DATE_FORMAT(`Time`, '%H:%i:00') AS Hour FROM `readings` 
                    WHERE DATE(`Time`) = ?
                    AND TIME(`Time`) BETWEEN ? AND ?
                    AND `ID_device`= ?;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssss', $day, $startHour, $endHour, $sensor);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllMeasureForMonth($sensor, $month)
    {
        $query = "SELECT DATE_FORMAT(`Time`, '%Y-%m-%d') AS Day,
        round(AVG(`Noise_dBA`), 2) AS DailyAverageNoise
        FROM `readings`
        WHERE DATE_FORMAT(`Time`, '%Y-%m') = ?
        AND `ID_device` = ?
        GROUP BY Day
        ORDER BY Day;";



        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $month, $sensor);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllMeasureForYear($sensor, $year)
    {
        $query = "SELECT DATE_FORMAT(`Time`, '%Y-%m') AS Month,
            round(AVG(`Noise_dBA`), 2) AS MonthlyAverageNoise
            FROM `readings`
            WHERE DATE_FORMAT(`Time`, '%Y') = ?  
            AND `ID_device` = ?
            GROUP BY Month
            ORDER BY Month;";


        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $year, $sensor);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }



    /*TUTTE LE STATISTICHE SUL SENSORE*/
    public function getAllStatsFromSensor($sensor)
    {
        $query = "SELECT `ID_device`,
                round(MAX(`Noise_dBA`), 2) AS MaxNoise,
                round(MIN(`Noise_dBA`), 2) AS MinNoise,
                round(AVG(`Noise_dBA`), 2) AS AvgNoise,
                DATE_FORMAT(MAX(`Time`), '%d-%m-%Y') AS LastDate,
                DATE_FORMAT(MIN(`Time`), '%d-%m-%Y') AS FirstDate,
                COUNT(*) AS Total
                FROM `readings`
                WHERE `ID_device` = ? AND `Noise_dBA` <> 0
                GROUP BY `ID_device`;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $sensor);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getAllValuesFromSensor($sensor)
    {
        $query = "SELECT `ID_device`,
                            `Time`,
                            `Noise_dBA`,`GPS_Latitude`, `GPS_Longitude`
                
                FROM `readings`
                WHERE `ID_device` = ? AND `Noise_dBA` <> 0 and `GPS_Latitude` <> 0 and `GPS_Longitude` <> 0;";

        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $sensor);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }





    public function getNightSoundLevelSensor($sensorName)
    { //la notte va dalle 18 alle 06
        $query = "SELECT * FROM `readings` 
        WHERE `ID_device`=? 
        AND (TIME_FORMAT(`Time`, '%H:%i') >= '18:00' OR TIME_FORMAT(`Time`, '%H:%i') <= '06:00');";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $sensorName);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getDaySoundLevelSensor($sensorName)
    { //il giorno va dalle 06 alle 18
        $query = "SELECT * FROM `readings` 
        WHERE `ID_device`=? 
        AND (TIME_FORMAT(`Time`, '%H:%i') >= '06:00' OR TIME_FORMAT(`Time`, '%H:%i') <= '18:00');";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $sensorName);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

}

?>