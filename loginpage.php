<?php
    require_once 'bootstrap.php';
    //check if user is logged in
    //LOGIN
    if(isSet($_POST["emailOrUsername"]) && isSet($_POST["password"]) && !isSet($_POST["name"])) {

        $login_result = $dbh->checkLogin($_POST["emailOrUsername"], hash("md5", $_POST["password"]));
        if(count($login_result)!=0 ){
            registerLoggedUser($login_result[0]);
            $templateParams["email"]=$_POST["emailOrUsername"];
            $templateParams["formmsg"] = "Login Avvenuto Con Successo.";
        }else{
            $templateParams["formmsg"] = "Login Fallito";
        }
    }

    if(isUserLoggedIn() && !empty($login_result)){
        header("location: index.php?formmsg=".$templateParams["formmsg"]);
    }

    //Base Template
    //All the base param of the page on site

    //page's title
    $templateParams["titolo"] = "Login page";
    //page request
    $templateParams["pagereq"] = "src/view/html/template/loginPage.php";

    //require all css of the site and the specific page array contains all the css to implement
    $templateParams["css"] = array("src/view/css/styles.css", "src/view/css/style.css", "src/view/css/loginPage.css", "src/view/css/header.css", "src/view/css/footer.css" );

    require 'src/view/html/template/base.php';
?>
