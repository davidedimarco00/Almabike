<div class="col-md-12">
        <div class="card dashboard-card mb-3">
          <div class="card-body">
            <h5 class="card-title">Grafico Sensore</h5>
            <small text="muted">Qui puoi visualizzare il grafico in base ai filtri selezionati. Nei bottoni sottostanti puoi selezionare gli orari notturni e giornalieri rispettivamente tra le 18:00 e le 06:00 e le 06:00 e le 18. In questo caso il valore mostrato è il valore medio notturno e giornaliero per i filtri selezionati.</small>

         <!----   <div class="text-end">
                <button id="colorZone" class="btn btn-primary" >Mappa con zone colorate</button>
            </div> ---->

            <div class="d-flex flex-column justify-content-center mt-2">
              <div class="d-flex justify-content-center">
                  <button class="btn mr-2 btn-light btn-outline-warning" title="Visualizza i valori medi giornalieri">
                      <i class="fa-solid fa-sun"></i>
                  </button>
                  <button class="btn mr-2 btn-light btn-outline-dark" title="Visualizza i valori medi notturni">
                      <i class="fas fa-moon"></i>
                  </button>
              </div>
          </div>




            <div class="flex-column align-items-center justify-content-center">
              <canvas id="myChart">

              </canvas>
             </div>

             <div class="d-flex justify-content-center">
             <div class="btn-group d-flex justify-content-between" data-toggle="buttons" >
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