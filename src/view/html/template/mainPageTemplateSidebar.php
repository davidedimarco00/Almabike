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
  
  <div class="row mt-4">
      <div class="col-md-4">
        <div class="card dashboard-card mb-3 h-100">
          <div class="card-body">
            <h5 class="card-title">Scegli il sensore e i filtri</h5>
            <small text="muted">Scegli il sensore per isolare le informazioni riguardanti il sensore, altrimenti scegli i filtri per visualizzare le informazioni globali di tutti i sensori nell'intervallo specificato</small>
          
            
            <div class="d-flex flex-column justify-content-center flex-grow-1">
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

                      <button id="searchChart" class="btn btn-primary mt-2 btn-block">Cerca</button>





                  

                  </form>
                      
               
             </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card dashboard-card mb-3 h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Grafico Sensore</h5>
            <small text="muted">Qui puoi visualizzare il grafico in base ai filtri selezionati.</small>

         <!----   <div class="text-end">
                <button id="colorZone" class="btn btn-primary" >Mappa con zone colorate</button>
            </div> ---->

            <div class="d-flex flex-column align-items-center justify-content-center">
              <div class="d-flex justify-content-between">
                  <button class="btn mr-2 btn-light btn-outline-warning">
                      <i class="fa-solid fa-sun"></i>
                  </button>
                  <button class="btn mr-2 btn-light btn-outline-dark">
                      <i class="fas fa-moon"></i>
                  </button>
              </div>
          </div>




            <div class="d-flex flex-column align-items-center justify-content-center">
              <canvas id="myChart">

              </canvas>
             </div>

             <div class="d-flex justify-content-center flex">
             <div class="btn-group d-flex justify-content-between" data-toggle="buttons" >
              <label class="btn mr-2 btn-outline-primary active">
                  <input type="radio" name="grafico" id="grafico-linee" autocomplete="off" checked>
                  <i class="fas fa-chart-line"></i> Linee
              </label>
              <label class="btn mr-2 btn-outline-danger active ">
                  <input type="radio" name="grafico" id="grafico-istogramma" autocomplete="off">
                  <i class="fas fa-chart-bar"></i> Istogramma
              </label>
              <label class="btn mr-2 btn-outline-danger active ">
                  <input type="radio" name="grafico" id="grafico-torta" autocomplete="off">
                  <i class="fas fa-chart-pie"></i> Torta
              </label>
            </div>
             </div>
             
          </div>
        </div>
      </div>

      <div class="col-md-2">
          <div class="row"> 
                <div class="card dashboard-card mb-3">
                    <div class="card-body text-center">
                      <h6 class="card-title text-center">Storico globale</h6>
                      <div class=" max-sound-card">
                            <p>Colonna globale rispetto a tutti i dati del sensore selezionato<p>
                      </div>
                    </div>
                </div>
           
            </div>
            <div class="row"> 
                <div class="card dashboard-card mb-3">
                    <div class="card-body text-center">
                      <h6 class="card-title text-center">Rilevazione Massima</h6>
                      <div class=" max-sound-card">
                            <h4><span class = "label label-default" id="maxSoundLevel">12dB</span></h4>
                      </div>
                    </div>
                </div>
           
            </div>
            <div class="row"> 
                <div class="card dashboard-card mb-3">
                    <div class="card-body text-center">
                      <h6 class="card-title text-center">Rilevazione Media</h6>
                      <div class=" max-sound-card">
                      <h4><span class = "label label-default" id="averageSoundLevel">12dB</span></h4>
                      </div>
                    </div>
                </div>
           
            </div>
            <div class="row"> 
                <div class="card dashboard-card mb-3">
                    <div class="card-body text-center">
                      <h6 class="card-title text-center">Rilevazione Minima</h6>
                      <div class=" max-sound-card">
                      <h4><span class = "label label-default" id="minSoundLevel">12dB</span></h4>
                      </div>
                    </div>
                </div>
           
            </div>
        </div>
    </div>

      
   
      


      <!-- seconda riga ---->
      <div class="row mt-2">
              <?php 
                  $ids=array('sensor','measurements','lastMeasurement','firstMeasurements','averageMeasurement','prova');

                  $labels=array('Sensore','Numero di rilevazioni','Ultima Rilevazione', 'Prima Rilevazione', 'Misurazioni medie intervallo', 'Prova');

              for ($i=0;$i<6;$i++): ?>
                  <div class="col-md-2">
                  <div class="card dashboard-card mb-3">
                            <div class="card-body text-center">
                              <h6 class="card-title text-center"><?php echo $labels[$i] ?></h6>
                              <div class=" max-sound-card">
                              <h4><span class = "label label-default" id="<?php echo $ids[$i]?>">12dB</span></h4>     
                              </div>
                            </div>
                        </div>
                  </div>
              <?php endfor; ?>
      </div>

                            
              

      




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





    
  


