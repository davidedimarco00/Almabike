

<?php

    require_once "bootstrap.php";

    /*$bar = isset($_POST["selectSensor"]) ? $_POST["selectSensor"] : null;

    echo $bar;*/

    $data = $dbh -> getMeasurementCoord($_POST["sensorName"]);
    $returnResult = array();
        // collect results
        foreach ($data as $row) {
            array_push($returnResult ,$row);
        }

    echo json_encode(['result' => $returnResult]);
    exit;

    ?>