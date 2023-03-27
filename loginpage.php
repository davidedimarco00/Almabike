<?php
    //initialize database (connection)
    require_once 'bootstrap.php';

    //Base Template
    //All the base param of the page on site

    //page's title
    $templateParams["titolo"] = "Login page";
    //page request
    $templateParams["pagereq"] = "src/view/html/template/loginPageTemplate.php";

    //require all css of the site and the specific page array contains all the css to implement
    $templateParams["css"] = array("src/view/css/loginPage.css", "src/view/css/header.css", "src/view/css/footer.css" );  //, "css/header.css", "css/footer.css");

    require 'src/view/html/template/base.php';
?>
