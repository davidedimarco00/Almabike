<div class= "row">

  <div class="col-md-6 mt-2">
    <div class="card dashboard-card mb-2">
      <div class="card-body">
        <h5 class="card-title">Grafico Sensore</h5>
        <small text="muted">Qui puoi visualizzare il grafico in base ai filtri selezionati. Nei bottoni sottostanti puoi
          selezionare gli orari notturni: dalle 00:00 alle 06:00 e dalle 18:00 alle 00:00 e giornalieri: tra le 06:00 e le 18:00. In
          questo caso il valore mostrato è il valore medio notturno e giornaliero per i filtri selezionati.</small>

        <!----   <div class="text-end">
                  <button id="colorZone" class="btn btn-primary" >Mappa con zone colorate</button>
              </div> ---->

        <div class="d-flex flex-column justify-content-center mt-2">
          <div class="d-flex justify-content-center">
            <button id="dayChart" class="btn mr-2 btn-light btn-outline-warning" title="Visualizza i valori medi giornalieri">
              <i class="fa-solid fa-sun"></i>
            </button>
            <button id="nightChart" class="btn mr-2 btn-light btn-outline-dark" title="Visualizza i valori medi notturni">
              <i class="fas fa-moon"></i>
            </button>
          </div>
        </div>




        <div class="flex-column align-items-center justify-content-center">
          <canvas id="myChart">

          </canvas>
        </div>

        <div class="d-flex justify-content-center">
          <div class="btn-group d-flex justify-content-between" data-toggle="buttons">
            <label class="btn mr-2 btn-outline-primary active">
              <input type="radio" name="grafico" id="lineButton" autocomplete="off" checked>
              <i class="fas fa-chart-line"></i> Linee
            </label>
            <label class="btn mr-2 btn-outline-danger active ">
              <input type="radio" name="grafico" id="barButton" autocomplete="off">
              <i class="fas fa-chart-bar"></i> Barre
            </label>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="col-md-6 mt-2 mb-2">
      <div class="row h-100">

    


        <div class="col-md-12 d-flex   align-content-stretch">
          <div class="row">

            <?php
            $ids = array('sensor', 'measurements', 'lastMeasurement', 'firstMeasurements', 'maxSoundLevel', 'averageSoundLevel', 'minSoundLevel');
            $labels = array('Sensore', 'Numero di rilevazioni', 'Ultima Rilevazione', 'Prima Rilevazione', 'Misurazione massima', 'Misurazione media', 'Misurazione minima');

            for ($i = 0; $i < count($labels); $i++): ?>
              <div class="col-md-4 <?php if ($i > 2) {
                echo 'mt-2';
              } ?>">
                <div class="card dashboard-card w-100 h-100 p-2">
                  <div class="card-body w-100 d-flex flex-column align-items-center justify-content-center text-center">
                    <h6 class="card-title">
                      <?php echo $labels[$i] ?>
                    </h6>
                    <h4 class="label label-default my-auto" id="<?php echo $ids[$i] ?>">Scegli un sensore</h4>
                  </div>
                </div>
              </div>

            <?php endfor; ?>
          </div>
        </div>
      </div>
    </div>
</div>



