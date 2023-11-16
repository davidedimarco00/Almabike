<?php
//This script return all main stats: min, max and average and insert the result into cards.
// it refers to all history
require_once "../../../bootstrap.php";
$data = $dbh->getAllStatsFromSensor($_POST['sensorName']);
$returnResult = array();
// collect results
foreach ($data as $row) {
    array_push($returnResult, $row);
}
echo json_encode(['result' => $returnResult]);
exit;

?>