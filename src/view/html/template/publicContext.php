<div class="mycontainer-public">





  <small text="muted">Nella seguente dashboard puoi selezionare i filtri di tuo interesse da visualizzare sulla mappa. La mappa visualizza i dati globali del sensore senza tenere in considerazione i filtri.
    Puoi cliccare su una zona per visualizzare la dashboard relativa all'area selezionata. Nella parte inferiore della pagina sono presenti i dati globali del sensore scelto e il grafico con i dati opportunamente filtrati.</small>

  <div class="row mt-4">
    <div class="col-md-12">
      <div class="card dashboard-card">
        <div class="card-body">
          <h5 class="card-title">Scegli il sensore e i filtri</h5>
         


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

            <p> Disponibilità dati:<span id ="status-message"></span></p>

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




    
  </div>


</div>