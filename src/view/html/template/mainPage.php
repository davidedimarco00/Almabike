<?php
if(isset($_SESSION["Nome"]) && isset($_SESSION["Cognome"])) {
    include 'privateContext.php'; 
    include 'publicContext.php';
    include 'myRoutes.php'; 
    include 'mapContext.php';
    include 'graphContext.php';
}
else {
   include 'publicContext.php';
   include 'mapContext.php';
   include 'graphContext.php';
}
?>