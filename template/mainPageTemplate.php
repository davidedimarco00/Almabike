  <?php if(isSet($_GET["formmsg"])): ?>
    <div class="error">
        <h5 class="text-center">Attenzione!</h5>
        <p class="text-center"><?php echo $_GET["formmsg"]; ?></p>
    </div>
  <?php endif; ?>



<div id="container">

  <div id="map"></div>



  <div class="gridcontainer">
    
    <div class="row ">
      <div class="col-md-8">
        <div class="blankDiv"></div>
      </div>

      <div class="col-md-4" >

      <!-- Calendar card -->
      <div class="card" >
        <div class="card-body">
            <h5 class="card-title">Calendar</h5>

            <div class = "graphDiv">
              <canvas id="myChart2"></canvas>
            </div>
            
        </div>
      </div>
      <!-- Chart card -->
      <div class="card" >
        <div class="card-body">
            <h5 class="card-title">Grafico</h5>
            <div class = "graphDiv">
              <canvas id="myChart"></canvas>
            </div>

           
        </div>
      </div>
      
        <?php for($i = 0; $i < 3; $i++): ?> 
          <div class="card" >
            <div class="card-body">
                <h5 class="card-title">Calendar</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>

          <?php endfor; ?>
      


        
      </div>
    </div>
  </div>









  </div>




 






