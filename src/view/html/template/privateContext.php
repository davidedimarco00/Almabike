<div class="profile-container pl-4 pt-4">
  <div class="row align-items-start justify-content-start">
    <div class="col-md-1 text-center align-self-center">
      <i class="fas fa-user fa-3x"></i>
    </div>
    <div class="col-md-11 text-left">
      <h4>Ciao,
        <?php echo $_SESSION["Nome"] . ' ' . $_SESSION["Cognome"] ?>
      </h4>
      <a class="text-dark" href='index.php?action=logout'>Logout</a>
      <p><strong>Sensore equipaggiato: </strong><strong id="sensorNameLbl">
          <?php echo $dbh->getSensorAssociatedWithUser($_SESSION['Nome'] . "." . $_SESSION["Cognome"])[0]['deviceName'] ?>
        </strong>
    </div>
  </div>
</div>



<div class="dashboard-selector mt-2 mb-2 mx-4">
  <div class="row  align-items-center">
    <div class="col-6 d-flex  align-items-center">
      <button type="button" id="dashboardBtn"
        class="btn selectorbtn btn-light btn-outline-light btn-block text-dark">Dashboard</button>
    </div>
    <div class="col-6 d-flex  align-items-center">
      <button type="button" id="myRouteBtn" class="btn selectorbtn btn-light btn-outline-light btn-block text-dark">I
        miei percorsi</button>
    </div>
  </div>
</div>