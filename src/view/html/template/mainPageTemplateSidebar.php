   <!-----<?php /*if(isSet($_GET["formmsg"])): ?>
  <div class="error">
      <h5 class="text-center">Attenzione!</h5>
      <p class="text-center"><?php echo $_GET["formmsg"]; */?></p>
  </div> --->

  
<?php

if(isset($_SESSION["Nome"]) && isset($_SESSION["Cognome"])) { //se ho fatto l'accesso
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