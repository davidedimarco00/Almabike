
<section class="vh-100">
  <div class="container-fluid-login">
    <div class="row">

    <div class="col-sm-6 px-0 d-none d-sm-block">
        <img src="resources/images/generic/bikewallpaper.png"
          alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
    </div>

      <div class="col-sm-6 mt-5 text-black">

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5" id="loginDiv" >

          <form style="width: 23rem;" id = "loginForm" method = "POST" action="loginpage.php">

            <h3 class="fw-normal mb-3 pb-1">Almabike Login</h3>
                <small class="text-muted">Se possiedi un'Almabike e possiedi un account sulla piattaforma puoi accedere alla tua area riservata. 
                L'area riservata consente di visionare le statistiche, i percorsi e i dati relativi ai tuoi spostamenti con Almabike.</small>

            <div class="form-outline mb-4">
              <label class="form-label" for="emailOrUsername">Email o Username</label>
              <input type="text" id="emailOrUsername" name="emailOrUsername" class="form-control form-control-lg" required/>
              
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="password">Password</label>
              <input type="password" id="password" name="password" class="form-control form-control-lg" required />
              
            </div>

            <div class="pt-1 mb-4">
              <button class="btn btn-lg btn-block" type="submit" id="loginButton" href="#">Login</button>
            </div>

          </form>

        </div>
      </div>
      
    </div>
  </div>
  </div>
</section>




