<?php
    require_once 'bootstrap.php';
    if(isSet($_GET["action"]) && $_GET["action"]=="logout") {
        logUserOut();
    }
    $templateParams["titolo"] = "homePage";
    $templateParams["pagereq"] = "src/view/html/template/mainPage.php";
    $templateParams["css"] = array("src/view/css/styles.css", "src/view/css/style.css", "src/view/css/header.css", "src/view/css/footer.css");
    require 'src/view/html/template/base.php';
?>
