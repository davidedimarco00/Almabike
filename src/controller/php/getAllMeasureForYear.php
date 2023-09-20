 
<?php
    //This script get all the position of readings
    require_once "../../../bootstrap.php";
    $data = $dbh -> getAllMeasureForYear($_POST['selectedSensor'], $_POST['year']);
    $returnResult = array();
        // collect results
        foreach ($data as $row) {
            array_push($returnResult ,$row);
        }
    echo json_encode(['result' => $returnResult]);
    exit;

?>