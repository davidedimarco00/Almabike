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


    $("#nightMapToggle").on( "click", function(e) {
        if (this.checked){
            $(this).prop('checked', true); 
            mainpageController.applyDarkMode();
        }else{
            $(this).prop('checked', false); 
            mainpageController.applyLightMode();
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








