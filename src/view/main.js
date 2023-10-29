import {MainPageController} from  "../controller/javascript/MainpageController.js";



let mainpageController = new MainPageController();

$(document).ajaxSend(function(event, jqxhr, settings) {
    mainpageController.showLoadingSpinner();
});

$(document).ajaxComplete(function () {
    mainpageController.hideLoadingSpinner();
});

$(document).ready(function() {

    console.log(mainpageController.toString());

    mainpageController.initializePage();
    //mainpageController.showZones();

    $('.custom-tooltip').tooltip({
        template: '<div class="tooltip custom" role="tooltip"><div class="tooltip-inner"></div></div>',
        trigger: 'hover', // Mostra il tooltip quando si passa il mouse sopra il div
        html: true // Abilita l'HTML nel tooltip personalizzato
      });
      

    $('#zonesToggle').click(function (){
        
        if (!$('#zonesToggle').is(':checked')) {
            //disattivo le zone
            mainpageController.hideZones();
        }else {
            //attivo le zone
            mainpageController.showZones();
        }  
    });

    $('#nightToggle').click(function (){
        
        if (!$('#nightToggle').is(':checked')) {
            //faccio vedere il giorno
            $('#dayToggle').prop("checked", true);
            mainpageController.showZones();
        } else {
            //attivo la visualizzazione notturna
            //mainpageController.clearLayers();
            mainpageController.showColoredNightZone();

        }
    });

    /*CONTROLLO DELLA VISUALIZZAZIONE DEI LAYERS*/

    $(".layers").on( "click", function(e) {

        e.preventDefault();

       
        let id = $(this).attr("id");

        if(id=="clearLayer"){
            mainpageController.clearLayers();
        }else {
   
            mainpageController.applyMapLayer(id);
        }

    });


    /**CONTROLLI SULLA DASHBOARD*/
    let selectedSensor;
    let maxSoundLevel = $('#maxSoundLevelLabel').text();

    
    $('#selectSensor').on('change', function() {
        let form = $(this);
        let inputs = form.find("select");
        selectedSensor = form.serialize();
        inputs.prop("disabled", true);
        mainpageController.getBaseInfoFromSelectedSensor(selectedSensor);
      
        inputs.prop("disabled", false);
    });

    $("#searchChart").on("click",function(e) { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
       e.preventDefault();
        mainpageController.searchButtonClick();
    });

    $("#barButton").on("click",function(e) { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        e.preventDefault();
         mainpageController.barChartButtonClick();
     });

     $("#lineButton").on("click",function(e) { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        e.preventDefault();
         mainpageController.lineChartButtonClick();
     });



    $("#colorZone").on("click",function(e) { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        e.preventDefault();
         mainpageController.colorZone();
     });



     if ($('a#myRoutebtn').is(':visible')) { 
        $('#loginName').text("Logout");
        $('#loginLogout').prop("href","index.php?action=logout");

    }

    



    /*PRIVATE DASHBOARD*/ 

    /*CLICK PER VEDERE LA DASHBOARD NELLA VISUALIZZAZIONE PRIVATA*/

    $('#dashboardBtn').click(function () {
        $(".mycontainer-private").fadeOut('fast', function () {
            $(".mycontainer-public").fadeIn('fast');
        });
    });
    
    $('#myRouteBtn').click(function () {

        $(".mycontainer-public").fadeOut('fast', function () {
            $(".mycontainer-private").fadeIn('fast');    
        });
       
   
        mainpageController.getAllInfoFromSensor($('#sensorNameLbl').text().replace(/\s/g, '')); //chiama ajax per scaricare i dati relativi al sensore
            
    });


    $("#search-routes").on("keyup", function() {
        let search = $(this).val().toLowerCase();
        $("#routes-table tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(search) > -1)
        });
    });

    $(".tablerow").on("click",function(e) { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        e.preventDefault();
        this.mainpageController.clickOnTableRow();
    });

    




});



