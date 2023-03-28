<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- importa tutti i css -->
    <?php if(isset($templateParams["css"])): ?>
    <?php for($i = 0; $i < count($templateParams["css"]); $i++): ?>
    <link href="<?php echo $templateParams["css"][$i] ?>" rel="stylesheet" type="text/css">
    <?php endfor; ?>
    <?php endif; ?>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">


    <!-- Leaflet CSS importa tutti i css di leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css" />
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.0/MarkerCluster.Default.min.css" />
    <!-- Leaflet js script -->
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>


    <!-- Load Heatmap Feature Layer from CDN -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/leaflet.markercluster.js"></script>
    <title><?php echo $templateParams["titolo"]; ?></title>
    <link rel="icon" type="image/x-icon" href="resources/images/favicon/favicon.ico">

    <!-- Chart.js script -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


    <!-- DatePicker css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- JQuery UI -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>



</head>

<body>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS (at the end of file) -->

    <script src="plugin/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
    <script src="plugin/leaflet/leaflet-heat.js" type="text/javascript"></script>


    <header>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">

            <div class="container-fluid px-6 px-lg-4">
                <a class="navbar-brand" href="#">
                    <a class="navbar-brand" href="./index.php"> Almabike Map</a>
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                        Menu
                        <i class="fas fa-bars"></i>
                    </button>


                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item"><a class="nav-link" href="#about">Info</a></li>
                            <li class="nav-item"><a class="nav-link" target="_blank"
                                    href="https://site.unibo.it/multicampus-sostenibile/it/mobilita/almabike">Vai ad
                                    Almabike</a></li>
                            <li class="nav-item"><a class="nav-link" href="#signup">Contatti</a></li>
                            <li class="nav-item"><a class="nav-link" href="./loginpage.php">Area riservata</a></li>
                        </ul>

                        <ul class="navbar-nav mr-auto">
                            <!-- Se sono nella pagina principale abilito il toggle altrimenti lo tolgo -->
                            <?php if(isset($templateParams["pagereq"]) && $templateParams["pagereq"] == "src/view/html/template/mainPageTemplate.php"): ?>

                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="nightMapToggle">
                                <label class="form-check-label" for="flexSwitchCheckDefault">Modalità scura</label>


                                <a href="#" class="d-inline-block" data-bs-toggle="tooltip"
                                    title="Attiva la modalità scura della mappa">
                                    <img src="resources/images/svg/info.svg" id="infoNightMap" alt="Modalità scura">
                                </a>


                            </div>


                            <?php endif;  ?>

                        </ul>
                    </div>
            </div>
            </div>
        </nav>

    </header>

    <main>

        <!-- qua va il codice dinamico -->
        <!-- INCLUDE IL TEMPLATE  -->

        <?php
            if(isset($templateParams["pagereq"])){
              require($templateParams["pagereq"]);
            }
          ?>

    </main>

    <footer class="justify-content-center align-items-center py-3 border-top" id="myFooter">
        <div class="col">
            <p>©Copyright 2023 - ALMA MATER STUDIORUM - Università di Bologna - Via Zamboni, 33 - 40126 Bologna -
                Partita IVA: 01131710376</p>
        </div>
    </footer>

</body>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
    integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
    integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous">
</script>



<script>
let ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
        datasets: [{
            label: 'Livelli del suono in dB',
            data: [60, 90, 85, 80, 55, 55],
            borderWidth: 1,
            tension: 0.2,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true

            }
        }
    }
});
</script>


<script type="module" src="src/controller/javascript/mainpage.js"></script>
<script type="module" src="src/controller/ajax/ajaxUtils.js"></script>
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>


</html>