<?php
session_start();

require_once("phpUtils/functions.php");
require_once("db/database.php");

$dbh = new DatabaseHelper("localhost", "root", "", "almabikedatabase", 3306);


?>
