<?php
//This script get all the position of readings
require_once "../../../bootstrap.php";
$data = $dbh->getAllMeasureForDayBetweenHpurs($_POST['selectedSensor'], $_POST['date'], $_POST['starthour'], $_POST['endhour']);
$returnResult = array();
// collect results
foreach ($data as $row) {
    array_push($returnResult, $row);
}
echo json_encode(['result' => $returnResult]);
exit;
?>