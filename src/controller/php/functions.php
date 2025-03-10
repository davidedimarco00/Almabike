<?php
function registerLoggedUser($logininfo)
{

    $_SESSION["Email"] = $logininfo["Email"];
    $_SESSION["Nome"] = $logininfo["Nome"];
    $_SESSION["Cognome"] = $logininfo["Cognome"];
    $_SESSION["Username"] = $logininfo["Username"];
}

function isUserLoggedIn()
{
    return isset($_SESSION["Cognome"]) && isset($_SESSION["Username"]) && isset($_SESSION["Nome"]) && isset($_SESSION["Email"]);
}

function logUserOut()
{
    $_SESSION["Email"] = NULL;
    $_SESSION["Nome"] = NULL;
    $_SESSION["Cognome"] = NULL;
    $_SESSION["Username"] = NULL;
    session_destroy();
}
?>