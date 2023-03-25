<?php
?>



<section class="vh-100">
  <div class="container-fluid-login">
    <div class="row">

    <div class="col-sm-6 px-0 d-none d-sm-block">
        <img src="resources/images/generic/bikewallpaper.png"
          alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
    </div>

      <div class="col-sm-6 text-black">

        <div class="px-5 ms-xl-4">
          <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
          <span class="h1 fw-bold mb-0"></span>
        </div>

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5" id="loginDiv" >

          <form style="width: 23rem;" id = "loginForm">

            <h3 class="fw-normal mb-3 pb-1">Almabike Login</h3>
                <small class="text-muted">Se possiedi un'Almabike e possiedi un account sulla piattaforma puoi entrare nella tua area riservata. 
                L'area riservata consente di visionare le statistiche, i percorsi e i dati relativi ai tuoi spostamenti con Almabike.</small>

            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example18">Email o Username</label>

              
              <input type="email" id="form2Example18" class="form-control form-control-lg" />
              
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form2Example28">Password</label>
              <input type="password" id="form2Example28" class="form-control form-control-lg" />
              
            </div>

            <div class="pt-1 mb-4">
              <button class="btn btn-lg btn-block" type="button" id="loginButton">Login</button>
            </div>

            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Hai dimenticato la password?</a></p>
            <p>Non hai un account? <a href="#!" class="link-info" id="signUp">Registrati</a></p>

          </form>

        </div>
      </div>
      
    </div>
  </div>
</section>
</div>

<script type="text/javascript"src="src/controller/javascript/loginpage.js"></script>