<?php
    //initialize database (connection)
    require_once 'bootstrap.php';

    //Base Template
    //All the base param of the page on site

    //page's title
    $templateParams["titolo"] = "Login page";
    //page request
    $templateParams["pagereq"] = "template/loginPageTemplate.php";

    //require all css of the site and the specific page array contains all the css to implement
    $templateParams["css"] = array("css/loginPage.css", "css/header.css", "css/footer.css" );  //, "css/header.css", "css/footer.css");

    require 'template/base.php';
?>
