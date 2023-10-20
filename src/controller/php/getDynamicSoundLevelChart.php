<?php
    require_once "../../../bootstrap.php";
    //THIS SCRIPT PROVIDE SOUND LEVEL BY ALL SENSOR

    $data = $dbh -> getDataforChart($_POST["typeofdate"], $_POST["datepicker"]);
    $returnResult = array();
        // collect results
        foreach ($data as $row) {
            array_push($returnResult ,$row);
        }
    echo json_encode(['result' => $returnResult]);
   

?>