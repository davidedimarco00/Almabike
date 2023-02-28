

<?php
    require_once "bootstrap.php";

    $sensorName=$_REQUEST["sensorName"];


    $data = $dbh -> getMeasurementCoord($sensorName);
    
   
    

    $featureCollection = [ "type"=>"FeatureCollection", "features"=>[] ];
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

    $_SESSION["arr"] = $featureCollection;
    

    ?>

    
    
