$(document).ready(function() {
    let loginForm = `<form style="width: 23rem;" id = "loginForm">

    <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Almabike Login</h3>

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

  </form>`;

    let registrationForm = `<form style="width: 23rem;" id="signupform">

    <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Registrazione Almabike</h3>
    <p class="fst-italic">Se possiedi un'Almabike e possiedi un account Almabike sulla piattaforma puoi entrare nella tua area riservata. 
                L'area riservata consente di visionare le statistiche, i percorsi e i dati relativi ai tuoi spostamenti con Almabike.</p>

    <div class="form-outline mb-4">
      <label class="form-label" for="signupformusername">Username</label>
      <input type="email" id="signupformusername" class="form-control form-control-lg" />
    </div>

    <div class="form-outline mb-4">
      <label class="form-label" for="signupformemail">Email</label>
      <input type="email" id="signupformemail" class="form-control form-control-lg" />
    </div>

    <div class="form-outline mb-4">
      <label class="form-label" for="signupformpassword">Password</label>
      <input type="password" id="signupformpassword" class="form-control form-control-lg" />
    </div>

    <div class="form-outline mb-4">
      <label class="form-label" for="signupformpasswordconfirm">Conferma password</label>
      <input type="password" id="signupformpasswordconfirm" class="form-control form-control-lg" />
    </div>

    <div class="pt-1 mb-4">
      <button class="btn btn-lg btn-block" type="button" id="signupButton">Registrati</button>
    </div>

    <p>Hai già un account? <a href="#!" class="link-info" id="login">Accedi</a></p>

  </form>
`;
    $(document).on("click", "#signUp", function() {
        $("#loginForm").remove();
        $("#loginDiv").append(registrationForm);
        $("#signupform").fadeIn(4)
            .css({top:1000,position:'absolute', opacity:0})
            .animate({top:90 , opacity:1}, 900, function() {
       
        });

    });

    $( document ).on("click","#login", function() {
        alert("ciao");
        $("#signupform").remove();
        $("#loginDiv").append(loginForm);
        $("#loginForm").fadeIn(4)
            .css({top:1000,position:'absolute', opacity:0})
            .animate({top:90 , opacity:1}, 900, function() {
       
        });

    });


















});