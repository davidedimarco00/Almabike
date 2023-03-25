  <?php if(isSet($_GET["formmsg"])): ?>
  <div class="error">
      <h5 class="text-center">Attenzione!</h5>
      <p class="text-center"><?php echo $_GET["formmsg"]; ?></p>
  </div>
  <?php endif; ?>





  <div class="myContainer">
      <div id="map"></div>
  </div>

  <div class="containerr">
      <div class="row justify-content-end">
          <div class="col-md-3">

              <div class="row justify-content-center">
                  <div class="col-md-6">
                      <div class="card">
                          <img src="resources/images/layers/sat.PNG" class="card-img-top" alt="alt">
                          <div class="card-body">
                              <p class="card-text">Satellite</p>
                          </div>
                      </div>

                  </div>

                  <div class="col-md-6">
                      <div class="card">
                          <img src="resources/images/layers/sat.PNG" class="card-img-top" alt="alt">
                          <div class="card-body">
                              <p class="card-text">Satellite</p>
                          </div>
                      </div>

                  </div>

              </div>

              <div class="card text-center">
                  <form class="sensorsSelection" id="formSensor" action="POST">

                      <select class="form-select" aria-label="Sensor selection" id="selectSensor" name="sensorName">
                          <option value="" selected> Scegli sensore...</option>
                          <option value=""> Sensori disponibili:
                              <? echo count($templateParams["devices"]) ?>
                          </option>
                          <?php foreach($templateParams["devices"] as $current): ?>

                          <option value="<?php echo $current['Name']?>" name="<?php echo $current['Name']?>">Sensore
                              <?php echo $current['Name']?></option>
                          <?php endforeach; ?>
                      </select>
                  </form>
              </div>

              <div class="card text-center">
                  <div class="card-body">
                      <div class="row justify-content-start">

                          <div class="col-12 justify-content-start">
                              <label class="timelabel" for="starttimepicker" class="">Dalle</label>
                              <input type="time" class="form-control" id="starttimepicker" required></input>
                          </div>
                          <div class="col-12 justify-content-start">
                              <label class="timelabel" for="starttimepicker">Alle</label>
                              <input type="time" placeholder="Alle" class="form-control" id="endtimepicker"
                                  required></input>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="card text-center">

                  <form id="chartForm" class="row align-items-start">

                      <div class="card-header">
                          <ul class="nav nav-tabs card-header-tabs justify-content-center">

                              <li class="nav-item">
                                  <input type="hidden" id="inputdaily" value="daily" name="typeofdate"><a
                                      class="nav-link active" id="daily">Giornaliero</a></input>
                              </li>


                              <li class="nav-item">
                                  <input type="hidden" id="inputweekly" value="weekly" name="typeofdate"><a
                                      class="nav-link" id="weekly">Settimanale</a></input>
                              </li>

                              <li class="nav-item">
                                  <input type="hidden" id="inputmonthly" value="monthly" name="typeofdate"><a
                                      class="nav-link" id="monthly">Mensile</a></input>
                              </li>
                              <li class="nav-item">
                                  <input type="hidden" id="inputannual" value="annual" name="typeofdate"><a
                                      class="nav-link" id="annual">Annuale</a></input>
                              </li>
                          </ul>
                      </div>



                      <div class="card-body">
                          <div class="row justify-content-start">
                              <div class="col-12 justify-content-start">
                                  <input type="date" placeholder="Seleziona anno" class="form-control" id="datepicker"
                                      name="datepicker"
                                      min-value="<?php echo $templateParams["initialYear"][0]['initialYear']?>"
                                      required></input>

                                  <div class="row justify-content-center">
                                      <div class="col-10 justify-content-start">
                                          <button id="searchChart" class="btn btn-primary"
                                              style="display: inline;">Cerca
                                      </div>
                                      <div class="col-2 justify-content-start">
                                          <img src="resources/images/svg/loadingSpinner.svg" id="loadingSpinner"
                                              alt="Loading Spinner">
                                      </div>
                                  </div>

                                  </button>
                              </div>
                          </div>

                  </form>
                  <div class="chartContainer">
                      <canvas id="myChart"></canvas>
                  </div>

                  <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio" class="btn-check" name="btnradio" id="sunRadio" autocomplete="off" checked>
                      <label class="btn btn-outline-primary" for="sunRadio"><img src="resources/images/svg/sun.svg" alt=""
                              class="img-fluid"></label>

                      <input type="radio" class="btn-check" name="btnradio" id="moonRadio" autocomplete="off">
                      <label class="btn btn-outline-primary" for="moonRadio"><img src="resources/images/svg/moon.svg" alt=""
                              class="img-fluid"></label>


                  </div>
              </div>
          </div>

          <div class="card text-center">
              <div class="card-body">
                  <div class="row justify-content-start">

                      <div class="chartContainer">
                          <canvas id="myChart2"></canvas>
                      </div>
                  </div>
              </div>