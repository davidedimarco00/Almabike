<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php for ($i = 0; $i < count($templateParams["css"]); $i++): ?>
    <link href="<?php echo $templateParams["css"][$i] ?>" rel="stylesheet" type="text/css">
  <?php endfor; ?>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">


  <!-- Leaflet CSS importa tutti i css di leaflet -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css" />
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.0/MarkerCluster.Default.min.css" />
  <!-- Leaflet js script -->
  <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>


  <!-- Load Heatmap Feature Layer from CDN -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/leaflet.markercluster.js"></script>
  <title>
    <?php echo $templateParams["titolo"]; ?>
  </title>
  <link rel="icon" type="image/x-icon" href="resources/images/favicon/favicon.ico">

  <!-- Chart.js script -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


  <!-- FONTAWESOME css -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
  <!-- JQuery UI -->
  <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  <script src="https://pagination.js.org/dist/2.6.0/pagination.js"></script>

  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.css" />

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


</head>

<body>


  <div class="wrapper d-flex align-items-stretch">


    <nav id="sidebar" class="active">
      <div class="custom-menu">
        <button type="button " id="sidebarCollapse" class="btn btnMenuToggle custom-tooltip"
          title="Apri/Chiudi il menu">
          <i class="fa fa-bars" id="breadButton" aria-hidden="true"></i>
        </button>
      </div>

      <div class="img bg-wrap text-center py-4">
        <div class="user-logo">
          <div class="img logo"></div>
          <?php if (isset($_SESSION["Nome"]) && $_SESSION["Cognome"]): ?>
            <?php echo "<h3 class='text-dark'>" . $_SESSION["Nome"] . " " . $_SESSION["Cognome"] . "</h3>" ?>
            <?php echo "<h3 class='text-dark'>" . $_SESSION["Email"] . "</h3>" ?>
          <?php else: ?>
          <?php endif; ?>



        </div>
      </div>
      <ul class="list-unstyled">
        <li class="active">
          <a class="sidebar-link" href="index.php"><span class="fa fa-map mr-3"></span>Vai alla Mappa</a>
        </li>


        <li>
          <a class="sidebar-link" href="https://site.unibo.it/multicampus-sostenibile/it/mobilita/almabike"><span
              class="fa fa-bicycle mr-3"></span>Vai al sito Almabike</a>
        </li>

        <li>

          <?php if (isset($_SESSION["Nome"]) && isset($_SESSION["Cognome"])): ?>
            <?php echo "<li><a class='sidebar-link' href='#' id='myRoutebtn'><span class='fa fa-road mr-3'></span>I miei percorsi</a></li>" ?>

          <?php else: ?>

            <?php echo "<li><a class='sidebar-link' href='loginpage.php'><span class='fa fa-lock mr-3'></span>Area riservata</a></li>" ?>
          <?php endif; ?>



        </li>
        <?php if (isset($_SESSION["Nome"]) && $_SESSION["Cognome"]): ?>
          <?php echo "<li><a class='sidebar-link' href='index.php?action=logout'><span class='fa fa-sign-out mr-3'></span>Log out</a></li>" ?>

        <?php else: ?>
        <?php endif; ?>


      </ul>
    </nav>
    <div id="content">
      <div class="container fluid-container mt-3 align-items-start ">
        <div class="row">
          <div class="col-md-6 align-items-start justify-content-start">
            <!-- Colonna sinistra per il titolo della dashboard -->
            <h1 class="title">Dashboard di Almabike</h1>
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-end">
            <!-- Colonna destra per il div della login -->
            <i class="fa-solid fa-user mr-2"></i> <!-- Icona utente con margine a destra -->
            <button class="btn btn-primary">
              <a id="loginLogout" href='loginpage.php' class="text-white"><span id="loginName">Area riservata</span></a>
            </button>
          </div>
        </div>
      </div>
      <?php
      if (isset($templateParams["pagereq"])) {
        require($templateParams["pagereq"]);
      }
      ?>
    </div>

  </div>









































  <!--<div id="sidebarRight" class="order-last active">
   <div class="custom-menu">
      <button type="button" id="sidebarCollapseRight" class="btn btnMenuToggle">
      <i class="fa fa-bars white"></i>
      </button>
   </div>
   <div class="img bg-wrap text-center py-4">
      <div class="user-logo">
         <div class="img logo"></div>
         <?php if (isset($_SESSION["Nome"]) && $_SESSION["Cognome"]) ?>
         <div class="dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <?php /*echo "<h2>"."Benvenuto ".$_SESSION["Nome"]." ".$_SESSION["Cognome"]."</h2>"*/?>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark flex" aria-labelledby="navbarDarkDropdownMenuLink">
               <li><a class="dropdown-item" href="#">Action</a></li>
               <li><a class="dropdown-item" href="#">Another action</a></li>
               <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
            <? php /* else: */?>
            <li class="nav-item"><a class="nav-link" href="./loginpage.php">Area riservata</a></li>
            <?php /* endif;  */?>
         </div>
      </div>
      <ul class="list-unstyled">
         <li class="active">
            <a href="#"><span class="fa fa-home mr-3"></span>Vai alla Mappa</a>
         </li>
      </ul>
   </div>
</div>-->

  <!-- Page Content  -->











  </div>


  <footer class="justify-content-center align-items-center py-3 border-top" id="myFooter">
    <div class="col">
      <p>©Copyright 2023 - ALMA MATER STUDIORUM - Università di Bologna - Via Zamboni, 33 - 40126 Bologna -
        Partita IVA: 01131710376</p>
    </div>
  </footer>




</body>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
  integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous">
  </script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
  integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous">
  </script>




<script type="module" src="src/view/main.js"></script>

<!---jquery --->

<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<!-- JQuery e plugin -->
<script src="plugin/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
<script type="text/javascript" src="src/model/javascript/sidebar.js"></script>
<script src="plugin/leaflet/leaflet-heat.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.js"></script>


</html>