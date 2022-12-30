<!DOCTYPE html>
<html lang="en">
  <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Bootstrap CSS importa tutti i css -->
        <?php if(isset($templateParams["css"])): ?>
          <?php for($i = 0; $i < count($templateParams["css"]); $i++): ?>
            <link href="<?php echo $templateParams["css"][$i] ?>" rel="stylesheet" type="text/css">
          <?php endfor; ?>
        <?php endif; ?>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
         integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
          <!-- Leaflet CSS importa tutti i css di leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" 
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin=""/>

        <!-- Leaflet js script -->
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
        <title><?php echo $templateParams["titolo"]; ?></title>
        <link rel="icon" type="image/x-icon" href="favicon/favicon.ico">
      
        
        
  </head>

    <body>
      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS (at the end of file) -->
      <script src="js/jquery-1.11.3.min.js" type="text/javascript"></script>

      <main>
        <header>

        
          <nav class="navbar navbar-expand-lg navbar-dark fixed-bottom" id="mainNav">

              <div class="container-fluid px-6 px-lg-4">
              <a class="navbar-brand" href="#">
              <a class="navbar-brand" href="#page-top"> Almabike Map</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse"
                   data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" 
                   aria-label="Toggle navigation">
                      Menu
                      <i class="fas fa-bars"></i>
                  </button>


                  <div class="collapse navbar-collapse" id="navbarResponsive">
                      <ul class="navbar-nav me-auto">
                          <li class="nav-item"><a class="nav-link" href="#about">Info</a></li>
                          <li class="nav-item"><a class="nav-link" target="_blank" href="https://site.unibo.it/multicampus-sostenibile/it/mobilita/almabike">Vai ad Almabike</a></li>
                          <li class="nav-item"><a class="nav-link" href="#signup">Contatti</a></li>
                          <li class="nav-item"><a class="nav-link" href="./loginpage.php">Area riservata</a></li>
                      </ul>

                      <ul class="navbar-nav mr-auto">
                          <li class="nav-item"><a class="nav-link" href="#about">Passa alla modalità scura</a></li>
                          
                          <li class="nav-item"><a class="nav-link" href="#about">Qualcosa</a></li>
                      </ul>
                  </div>
              </div>
              </div>
          </nav>
       

        </header>

        <!-- qua va il codice dinamico -->
        <!-- INCLUDE IL TEMPLATE  -->

        <div>
          <?php
            if(isset($templateParams["pagereq"])){
              require($templateParams["pagereq"]);
            }
          ?>
        </div>

      </main>



      
      <footer class="justify-content-between align-items-center py-3 border-top" id="myFooter">
        <div class="col-md-4 d-flex align-items-center mx-2">
         
        </div>
      </footer>

    </body>
    
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"  integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script type="text/javascript "src="javascript/ajaxutils.js"></script>
    <script type="text/javascript "src="js/mainpage.js"></script>
    
</html>
