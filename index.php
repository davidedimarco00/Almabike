<?php
    
    require_once 'bootstrap.php';
    
    if(isSet($_GET["action"]) && $_GET["action"]=="logout") {
        logUserOut();
    }
    //Base Template
    //All the base param of the page on site

    //page's title
    $templateParams["titolo"] = "homePage";
    //page request
    $templateParams["pagereq"] = "src/view/html/template/mainPageTemplateSidebar.php";

    //require all css of the site and the specific page array contains all the css to implement
    $templateParams["css"] = array("src/view/css/styles.css", "src/view/css/style.css", "src/view/css/header.css", "src/view/css/footer.css");
    
    //session Variables

    require 'src/view/html/template/base.php';
?>
