<?php
    require_once "bootstrap.php";

    $availableCategory = array("daily","weekly", "monthly", "annual");  

    $cat=$_REQUEST["q"];
    $range = $_REQUEST["r"];

    if (in_array($cat, $availableCategory)) {

        $data = $dbh -> getDataforChart($cat, $range);

        $output = json_encode($data);
        
        
    }

    foreach($data as $current){

        $item = $current['Noise_dBA'];

        echo "<script>console.log('{$current}' );</script>";
    }



?>