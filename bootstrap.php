<?php
session_start();

require_once("src/controller/php/functions.php");
require_once("src/model/databasePHP/database.php");

$dbh = new DatabaseHelper("localhost", "root", "", "almabikedatabase", 3306);

$templateParams["devices"] = $dbh -> getAllDevicesName();
$templateParams["initialYear"] = $dbh -> getInitialYear();


?>
