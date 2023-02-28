

<?php
    require_once "bootstrap.php";

    $sensorName=$_REQUEST["sensorName"];


    $data = $dbh -> getMeasurementCoord($sensorName);
    //$returnResult = array();
    if($data) {
        // collect results
        while($row = $result->fetch_all())
        {
            echo json_encode($row);
            // assign to new array
            // make returnResult an array for multiple results
            $returnResult = $row;
        }
    }

    echo json_encode(['result' => $returnResult, 'errors' => $errors]);

    exit;

    /*$featureCollection = [ "type"=>"FeatureCollection", "features"=>[] ];
    foreach ($data as $row) {

        $feature = [
            "geometry"=>[
                "type"=> "Point",
                "coordinates"=> [ $row["number1"]/1000, $row["number2"]/1000 ]
            ],
            "properties"=> [
                "species"=>2,
                "id"=>10
            ]
        ];
    
        $featureCollection["features"][] = $feature;
    }

    $_SESSION["arr"] = $featureCollection;*/
    

    ?>

    
    
