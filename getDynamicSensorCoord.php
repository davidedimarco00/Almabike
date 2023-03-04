 
<?php
    //This script get all the measurement by sensorName
    require_once "bootstrap.php";
    $data = $dbh -> getMeasurementCoord($_POST["sensorName"]);
    $returnResult = array();
        // collect results
        foreach ($data as $row) {
            array_push($returnResult ,$row);
        }
    echo json_encode(['result' => $returnResult]);
    exit;

?>