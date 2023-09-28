import {MainPageController} from  "../../controller/javascript/MainpageController.js";

let mainpageController = new MainPageController();

$(document).ajaxSend(function(event, jqxhr, settings) {
    mainpageController.showLoadingSpinner();
});

$(document).ajaxComplete(function () {
    mainpageController.hideLoadingSpinner();
});

$(document).ready(function() {



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

    $("#colorZone").on("click",function(e) { //quando clicco su un tab bisogna lanciare un ajax che mi carica il chart corretto in live
        e.preventDefault();
         mainpageController.colorZone();
     });


});








