   <!-----<?php /*if(isSet($_GET["formmsg"])): ?>
  <div class="error">
      <h5 class="text-center">Attenzione!</h5>
      <p class="text-center"><?php echo $_GET["formmsg"]; */?></p>
  </div> --->

<div id="map">




</div>


<?php if(!isset($_SESSION["Nome"]) && !isset($_SESSION["Cognome"])): ?> <!-- se non ho effettuato l'accesso -->
<div class="mycontainer-public">
  <div class="title-container">
        <h1 class="title">Dashboard</h1>
      <div class="spinner-border text-danger" role="status" id = "loadingSpinner">
        <span class="sr-only">Sto ricevendo dati...</span>
      </div>

  </div>

  <small text="muted">Nella seguente dashboard puoi selezionare i filtri di tuo interesse da visualizzare sulla mappa. Clicca su una zona per visualizzare la dashboard relativa all'area selezionata</small>
  
  <div class="row">
      <div class="col-md-4">
        <div class="card dashboard-card mb-3">
          <div class="card-body">
            <h5 class="card-title">Scegli il sensore e i filtri</h5>
            <small text="muted">Scegli il sensore per isolare le informazioni riguardanti il sensore, altrimenti scegli i filtri per visualizzare le informazioni globali di tutti i sensori nell'intervallo specificato</small>
          
            
            <div class="text-center">
                  <form class="sensorsSelection" id="formSensor" action="POST">
                      <select class="form-select" aria-label="Sensor selection" id="selectSensor" name="sensorName">
                          <option value="" selected> Scegli sensore...</option>
                          <option value=""> Sensori disponibili:
                          <? echo count($templateParams["devices"]) ?>
                          </option>
                          <?php foreach($templateParams["devices"] as $current): ?>
                            <option id="selectedSensor" value="<?php echo $current['Name']?>" name="<?php echo $current['Name']?>">Sensore
                          <?php echo $current['Name']?>
                          </option>
                          <?php endforeach; ?>
                      </select>
                          </form>

                      <p> Stai scegliendo i filtri per il sensore: </p>

                      <h6>Tipo:</h6>

                      <form id="chartForm" action="POST">

                          <div class="form-check form-check-inline">
                            <input class="form-check-input active" type="checkbox" id="inputdaily" value="daily" name="typeofdate" checked="true">
                            <label class="form-check-label" for="daily">Giornaliero</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inputmonthly" value="monthly"  name="typeofdate">
                              <label class="form-check-label" for="monthly">Mensile</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inputannual" value="annual"  name="typeofdate">
                              <label class="form-check-label" for="annual">Annuale</label>
                          </div>
                          
                      

                        <h6 id="dateLabel">Scegli una data:</h6>


                      <input type="date" placeholder="Seleziona anno" class="form-control" id="datepicker"
                      name="datepicker"
                      min-value="<?php echo $templateParams["initialYear"][0]['initialYear']?>"
                      required></input>

                      <h6>Orario:</h6>

                      <div class="row rowincard">
                        <div class="col-md-6">
                                <input type="time" class="form-control hour-input" id ='start-hour' name='starthour' />
                          </div>
                          <div class="col-md-6">
                                <input type="time" class="form-control hour-input" id='end-hour' name='endhour'  />
                          </div>
                      </div>

                    

                      <div class="text-end">
                        <button id="searchChart" class="btn btn-primary">Cerca</button>
                      </div>

                      </form>
                      
               
             </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card dashboard-card mb-3">
          <div class="card-body">
            <h5 class="card-title">Grafico:</h5>
            <small text="muted">Descrizione blablablablablablablablablablablablablablablablablablablablablablablablablablablabla</small>

         <!----   <div class="text-end">
                <button id="colorZone" class="btn btn-primary" >Mappa con zone colorate</button>
            </div> ---->

  

          
            
            <div class="text-center">
              <canvas id="myChart">

                          </canvas>
               
             </div>
          </div>
        </div>
      </div>

      <?php 
      $ids=array('maxSoundLevel', 'minSoundLevel', 'averageSoundLevel');
      $labels=array('massima','minima','media');

      for ($i=0;$i<3;$i++): ?>


    
     
    
      <div class="col-md-2">
        <div class="card dashboard-card mb-3">
          <div class="card-body">
            <h5 class="card-title">Rilevazione <?php echo $labels[$i]?></h5>
            <div class="text-end max-sound-card">
                  <span class="recordLabel" id="<?php echo $ids[$i].'Label'?>">
                    # dB
                  </span>
             </div>
        </div>
      </div>
        <?php if($i==0): ?> <!--- se sono nella prima colonna ---->
          <div class="card dashboard-card mb-3 mt-3">
          <div class="card-body">
            <h5 class="card-title">Rilevazione <?php echo $labels[$i]?></h5>
            <div class="text-end max-sound-card">
                  <span class="recordLabel" id="<?php echo $ids[$i].'Label'?>">
                    # dB
                  </span>
             </div>
        </div>
      </div>
          
        <?php endif;?> <!--- fine prima colonna ---->
            
      
          
      </div>

      <?php endfor; ?>

   
      


      <!-- seconda riga ---->


      <!-- terza riga ---->

    
    <div class="row">
      <div class="col-md-8">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Contenuto Principale</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Sidebar</h5>
            <ul>
              <li>Elemento 1</li>
              <li>Elemento 2</li>
              <li>Elemento 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
  
</div>






























































































































































<?php else: ?>  <!--- devo caricare la dashboard privata e quindi .....--->

  <div class="mycontainer-private">
  <div class="title-container">
        <h1 class="title">Benvenuto nella tua Area Personale</h1>
        <div class="info-icon">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
        </div>

      
  </div>

  <small text="muted">Questa è la tua area riservata. In questa pagina puoi visualizzare i dati di tuo interesse.</small>
  <div class="container mt-5">
  <div>
    <h4 class="alert-heading">Ciao <?php echo $_SESSION['Nome']?>, la tua bici è equipaggiata con il sensore <?php echo $dbh->getSensorAssociatedWithUser($_SESSION['Nome'].".".$_SESSION["Cognome"])[0]['deviceName'] ?> </h4>
    <p>Ecco una panoramica delle ultime attività:</p>
  </div>
</div>

  
<div class="container mt-5">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Data</th>
        <th>Punto di partenza</th>
        <th>Punto di arrivo</th>
        <th>Colonna 4</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Riga 1, Cella 1</td>
        <td>Riga 1, Cella 2</td>
        <td>Riga 1, Cella 3</td>
        <td>Riga 1, Cella 4</td>
      </tr>
      <tr>
        <td>Riga 2, Cella 1</td>
        <td>Riga 2, Cella 2</td>
        <td>Riga 2, Cella 3</td>
        <td>Riga 2, Cella 4</td>
      </tr>
      <tr>
        <td>Riga 3, Cella 1</td>
        <td>Riga 3, Cella 2</td>
        <td>Riga 3, Cella 3</td>
        <td>Riga 3, Cella 4</td>
      </tr>
      <tr>
        <td>Riga 4, Cella 1</td>
        <td>Riga 4, Cella 2</td>
        <td>Riga 4, Cella 3</td>
        <td>Riga 4, Cella 4</td>
      </tr>
      <tr>
        <td>Riga 5, Cella 1</td>
        <td>Riga 5, Cella 2</td>
        <td>Riga 5, Cella 3</td>
        <td>Riga 5, Cella 4</td>
      </tr>
    </tbody>
  </table>
</div>
















  
</div>

<?php endif; ?>





    
  


