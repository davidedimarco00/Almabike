<?php //error_reporting(E_ALL); ini_set('display_errors', 1);

    function registerLoggedUser($logininfo) {
    
            $_SESSION["Email"] = $logininfo["Email"];
            $_SESSION["Nome"] = $logininfo["Nome"];
            $_SESSION["Cognome"] = $logininfo["Cognome"];
            $_SESSION["Username"] = $logininfo["Username"];
    }

    function isUserLoggedIn(){
        return isSet($_SESSION["Cognome"]) && isSet($_SESSION["Username"]) && isSet($_SESSION["Nome"]) && isSet($_SESSION["Email"]);
    }

    function logUserOut(){
        $_SESSION["Email"] = NULL;
        $_SESSION["Nome"] = NULL;
        $_SESSION["Cognome"] = NULL;
        $_SESSION["Username"] = NULL;
        session_destroy();
    }

    
?>
