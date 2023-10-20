<div class="mycontainer-public">





  <small text="muted">Nella seguente dashboard puoi selezionare i filtri di tuo interesse da visualizzare sulla mappa.
    Clicca su una zona per visualizzare la dashboard relativa all'area selezionata</small>

  <div class="row mt-4">
    <div class="col-md-6">
      <div class="card dashboard-card">
        <div class="card-body">
          <h5 class="card-title">Scegli il sensore e i filtri</h5>
          <small text="muted">Scegli il sensore per isolare le informazioni riguardanti il sensore, altrimenti scegli i
            filtri per visualizzare le informazioni globali di tutti i sensori nell'intervallo specificato</small>


          <div class="d-flex flex-column justify-content-center">
            <form class="sensorsSelection" id="formSensor" action="POST">
              <select class="form-select" aria-label="Sensor selection" id="selectSensor" name="sensorName">
                <option value="" selected> Scegli sensore...</option>
                <option value=""> Sensori disponibili:
                  <? echo count($templateParams["devices"]) ?>
                </option>
                <?php foreach ($templateParams["devices"] as $current): ?>
                  <option id="selectedSensor" value="<?php echo $current['Name'] ?>"
                    name="<?php echo $current['Name'] ?>">
                    Sensore
                    <?php echo $current['Name'] ?>
                  </option>
                <?php endforeach; ?>
              </select>
            </form>

            <p> Stai scegliendo i filtri per il sensore: </p>

            <h6>Tipo:</h6>

            <form id="chartForm" action="POST">

              <div class="form-check form-check-inline">
                <input class="form-check-input active" type="checkbox" id="inputdaily" value="daily" name="typeofdate"
                  checked="true">
                <label class="form-check-label" for="daily">Giornaliero</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inputmonthly" value="monthly" name="typeofdate">
                <label class="form-check-label" for="monthly">Mensile</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inputannual" value="annual" name="typeofdate">
                <label class="form-check-label" for="annual">Annuale</label>
              </div>



              <h6 id="dateLabel">Scegli una data:</h6>


              <input type="date" placeholder="Seleziona anno" class="form-control" id="datepicker" name="datepicker"
                min-value="<?php echo $templateParams["initialYear"][0]['initialYear'] ?>" required></input>

              <h6>Orario:</h6>

              <div class="row rowincard">
                <div class="col-md-6">
                  <input type="time" class="form-control hour-input" id='start-hour' name='starthour' />
                </div>
                <div class="col-md-6">
                  <input type="time" class="form-control hour-input" id='end-hour' name='endhour' />
                </div>

              </div>

              <button id="searchChart" class="btn btn-primary mt-2 btn-block">Cerca</button>

            </form>


          </div>
        </div>
      </div>
    </div>




    <div class="col-md-6">
      <div class="row h-100">
        <div class="col-md-12 d-flex flex-wrap align-content-stretch">
          <div class="row">
            <?php
            $ids = array('sensor', 'measurements', 'lastMeasurement', 'firstMeasurements', 'averageMeasurement', 'prova', 'maxSoundLevel', 'averageSoundLevel', 'minSoundLevel');
            $labels = array('Sensore', 'Numero di rilevazioni', 'Ultima Rilevazione', 'Prima Rilevazione', 'Misurazioni medie intervallo', 'Prova', 'aaa', 'aaaa', 'aaaaa');

            for ($i = 0; $i < 9; $i++): ?>
              <div class="col-md-4 <?php if ($i > 2) {
                echo 'mt-2';
              } ?>">
                <div class="card dashboard-card w-100 h-100 p-2 ">
                  <div class="card-body w-100 d-flex flex-column align-items-center justify-content-center text-center">
                    <h6 class="card-title">
                      <?php echo $labels[$i] ?>
                    </h6>
                    <h4 class="label label-default my-auto" id="<?php echo $ids[$i] ?>">12dB</h4>
                  </div>
                </div>
              </div>

            <?php endfor; ?>
          </div>
        </div>
      </div>
    </div>
  </div>










  <!-- terza riga 

    
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
    </div>---->


</div>