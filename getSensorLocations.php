<?php

// assign your post value
$inputvalues = $_POST;

$errors = false;
$result = false;

$mysqli = new mysqli("localhost", "root", "", "almabikedatabase", 3306);

 /* check connection */
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    // escape your values
    foreach ($inputvalues as $key => $value) {
        if(isset($value) && !empty($value)) {
            $inputvalues[$key] = $mysqli->real_escape_string( $value );
        } else {
            $errors[$key] = 'The field '.$key.' is empty';
        }
    }

if( !$errors ) {
        // select your query
        $addresult = "
            SELECT `latitude`, `longitude` 
            FROM `positions` 
            WHERE `deviceid` = '" . $inputvalues['id'] . "'

         ";
         
//$returnResult = array();
         if( $result = $mysqli->query($addresult) ) {
            // collect results
            while($row = $result->fetch_all())
            {
                // assign to new array
                // make returnResult an array for multiple results
                $returnResult = $row;
            }
        }
    }

    // close connection
    mysqli_close($mysqli);

    // print result for ajax request
    echo json_encode(['result' => $returnResult, 'errors' => $errors]);

    exit;
?>
