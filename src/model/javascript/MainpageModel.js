import  {ChartFactory} from "../javascript/chartFactory/chartFactory.js";
import { HeatMapFactory } from "../javascript/heatMapFactory/HeatMapFactory.js";

import { MapManager } from "../javascript/mapManager/MapManager.js";

export class MainpageModel {
    
    constructor() {
        this.ajaxCall = []; //array che contiene le chiamate ajax da eseguire, serve per la gestione della fine
        this.map=L.map('map', {zoomControl: false}).setView([44.4992192,11.2616459], 12);
        this.zonesAreVisible=false;
        this.selCheckbox;
        const self = this;
        this.flagHeatMap = false ;
        this.allPointsOnMap= [];
        this.allPolygonsOnMap= [];
        this.allPointsOnMap2 =[];
        this.ajaxResponse=[];
        this.heat;
        this.chartFactory = new ChartFactory('myChart');
        this.heatMapFactory = new HeatMapFactory(this.map);
        this.mapManager = new MapManager(this.map);
    }


   

  
    initpage() {

        //INITIALIZING PAGE
        //Disable the default style of chart to customize it
        $('#myChart').removeAttr("style"); 
        //Graph tab click change status to active
        let checkboxes = 'input#inputdaily,input#inputmonthly,input#inputweekly,input#inputannual';

        self.selCheckbox=$('input#inputdaily').attr("id");

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        $('#datepicker').attr("value", today);

        $(checkboxes).on("click",  function() { //quando clicco su una bisogna lanciare un ajax che mi carica il chart corretto in live
            $(checkboxes).prop('checked', false);

            $(this).prop('checked', true);

            let selectedCheckbox =  $(this).attr("id");

            self.selCheckbox = selectedCheckbox;
            

            switch (selectedCheckbox) {
                case "inputdaily":
                    $('#datepicker').attr("type","date");
                    $('#dateLabel').text("Scegli un giorno");
                    $(".hour-input").prop("disabled", false);
                    break;
                case "inputmonthly":
                    $('#datepicker').attr("type","month"); 
                    $('#dateLabel').text("Scegli un mese");
                    $(".hour-input").prop("disabled", true);
                    break;
                case "inputannual":
                    $('#datepicker').attr("type","number");
                    $('#dateLabel').text("Scegli un anno");
                    $(".hour-input").prop("disabled", true);
                    break;
            }
        });

        $('#loadingSpinner').hide();

         //SOLO PER FARE TESTING
        this.map.on('click', function(e) {
          console.log(e.latlng.lat,e.latlng.lng);

        });

      this.mapManager.applyMapLayer("streetMapLayer");
      this.mapManager.addMapControls();
      this.mapManager.showZones();
      this.chartFactory.createEmptyChart(); //inizializza il grafico vuoto

    }







    /*MAP FUNCTIONS calling MapManager*/
  
    applyMapLayer(mapLayer) {
      this.mapManager.applyMapLayer(mapLayer);
    }

  
    showZones() {
      this.mapManager.addZones();
    }
  
    hideZones() {
      this.mapManager.hideZones();
    }

    showColoredNightZone() {
      this.mapManager.showColoredNightZone();
    }

    clearMapLayers(){
      this.mapManager.clearMapLayers();
    }



    getZoneInfo(zone, map) {
      return 1;
    }

    getMap() {
      return this.mapManager.getMap();
    }







    //DASHBOARD FUNCTIONS
    searchButtonClick(){
      var $form = $("#chartForm");
      //alert("#datepicker, #input"+ selTab);
      // Let's select and cache all the fields
      var $inputs = $form.find("#datepicker, #"+self.selCheckbox+", .hour-input");
      // Serialize the data in the form
      var serializedData = $inputs.serialize();

     
      //alert(serializedData);

      alert("A post passo i valori\n" + serializedData);

      //FACCIO IL GRAFICO

      var formData = new URLSearchParams(serializedData);
      // Accedi al valore di un campo specifico, ad esempio 'typeofdate'
      let typeofdateValue = formData.get('typeofdate');
      let datePickerValue = formData.get('datepicker');


      console.log("ho selezionato: " + typeofdateValue);

      if (typeofdateValue == "daily") { //se h oselezionato il giorno
        let starthour = formData.get('starthour');
        let endhour = formData.get('endhour');

        if (starthour === null || starthour.trim() === '' || endhour === null || endhour.trim() === '' ) {
          //alert("i campi sono vuoti");
          //allora voglio il grafico giornaliero con tutte le misurazioni del giorno
          
          console.log("Sensore attualmente selezionato=", $('#selectSensor').val());
          this.getValuesForDailyChart($('#selectSensor').val(), datePickerValue, typeofdateValue);
          //console.log(this.ajaxResponse);
          

          //ed anche il grafico con la media

        }else{
          starthour = starthour +":00"; //preparo la formattazione dei due parametri
          endhour = endhour+":00";
          alert(starthour + " " + endhour);
          this.getValuesForDailyChartBetweenHours($('#selectSensor').val(), datePickerValue, starthour, endhour, typeofdateValue);

        }
      } else if (typeofdateValue=="monthly") {
          this.getValuesForMonthlyChart($('#selectSensor').val(), datePickerValue, typeofdateValue);
      } else if (typeofdateValue=="annual") {
          this.getValuesForAnnualChart($('#selectSensor').val(), datePickerValue, typeofdateValue);
      }


      //OTTENGO I VALORI CHE MI SERVONO
      /*values = this.getValuesForChart(serializedData);
      this.createChart(values);*/

      //COLORO LA MAPPA?

      //this.applyHeatMapLayerForSensor(serializedData, this.map);
    }


    getAllStatsFromSensor(selectedSensor) {
      
      let self = this;

      console.log("I'm here ", selectedSensor);
          $.ajax({
            url: "./src/controller/php/getAllStatsFromSensor.php",
            type: "POST",
            data: selectedSensor,
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {
            console.log("Risultato query: " +response);

            let responseParsed = JSON.parse(response);
            self.buildCardLabelsForSensor(responseParsed);
          }
    }


     
    getBaseInfoFromSelectedSensor(selectedSensor) {
      let flag = true;
      let markers;
      let sensorInfo;
      let self = this;
  
      $.ajax({
        url: "./src/controller/php/getDynamicSensorCoord.php",
        type: "post",
        data: selectedSensor,
        cache: false,
  
        success: function (response) {
          //alert(response);
  
          let positions = JSON.parse(response);
  
  
          sensorInfo = positions;
  
          if (markers != undefined) {
            markers.clearLayers();
          }
  
          if (positions) {
            markers = L.markerClusterGroup();
            let soundLevels = [];
            let data=[];
            
  
            for (var key in positions) {
              for (var key1 in positions[key]) {
                var title =
                  "Livello sonoro:" + positions[key][key1]["Noise_dBA"] + "dB";
                var marker = L.marker(
                  new L.LatLng(
                    positions[key][key1]["lati"] / 100000,
                    positions[key][key1]["longi"] / 100000,
                  ),
                  {
                    title: title,
                  },
                );
  
                soundLevels.push(positions[key][key1]["Noise_dBA"]);
                data.push([positions[key][key1]["lati"] / 100000, positions[key][key1]["longi"] / 100000, positions[key][key1]["Noise_dBA"]]);
  
                marker.bindPopup(title);
                markers.addLayer(marker);
                //L.marker([ positions[key][key1]["lati"]/100000, positions[key][key1]["longi"]/100000 ]).addTo(map);
                //console.log(positions[key][key1]["lati"]/1000)
              }
              
              self.map.addLayer(markers);
              flag = true;
             // $("#maxSoundLevelLabel").text(Math.max.apply(Math, soundLevels));
              //qui bisogna aggiungere la media
             // $("#minSoundLevelLabel").text(Math.min.apply(Math, soundLevels));
            }
            //console.log(soundLevels);
            //console.log(data);
            soundLevels = [];
            
            self.heatMapFactory.addData(data);


            /*TODO: QUI POTREI FARE VOLENDO IL GRAFICO CON LA MEDIA GLOBALE*/
            


          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        },
      });
    }
  

   
    getSensorAssociatedWithUser(username) {

        $.ajax({
            url: "./src/controller/php/getSensorAssociatedWithUser.php",
            cache: false,  
            type: "post",
            data: username,
            success: function (response) {
                alert(response)
                let result =  JSON.parse(response);
            }    
          });
    }


    applyHeatMapLayerForSensor(data, map) {


      $.ajax({
        url: "./src/controller/php/getDynamicSoundLevelChart.php",
        type: "POST",
        data:  data,
        cache: false,
        success: function (response) {

          

           if (self.flagHeatMap){
               map.removeLayer(self.heat);
           }

           let data= JSON.parse(response);


           console.log(data);
           let heatPoints = [];

           for(var key in data) {
               for (var key1 in data[key]) {
                   let heatPoint = [data[key][key1]["lati"]/100000, data[key][key1]["longi"]/100000, data[key][key1]["Noise_dBA"]/100];
                   heatPoints.push(heatPoint);
               }
           }

               self.heat = L.heatLayer(heatPoints, {
                   radius: 25,
                   blur: 1,
          
                   //da 0 a 60 verde, da 60 a 80 giallo, da 80 a 95 arancione, sopra i 95 rosso
                   gradient: {0: 'green', 0.6:'yellow', 0.80: 'orange', 0.95: 'red'}}).addTo(map);
          

           self.flagHeatMap=true;
           

       

           /*for(var key in data) {
               for (var key1 in data[key]) {

               var marker = L.circleMarker([data[key][key1]["lati"]/100000, data[key][key1]["longi"]/100000], {
                   color: getColor(data[key][key1]["Noise_dBA"]/100),
                   fillOpacity: 0.5,
                   radius: 15,
               }).addTo(map);


               
               
               marker.bindPopup("Livello di inquinamento: " + data[key][key1]["Noise_dBA"]);
           }
       }*/

       },
        
        error: function(jqXHR, textStatus, errorThrown) {
               alert("Chiamata fallita");
                console.log(textStatus, errorThrown);
        }
    });

    }



    showLoadingSpinner() {
      $('#loadingSpinner').show();
    }
  
    hideLoadingSpinner() {
      $('#loadingSpinner').hide();
    }


    createChart(data, type, design) {

      alert("Okay ora devo fare il grafico di un " + type);
      console.log("dati\n\n\n\n", data);



      //isolo l'array che m'interessa per il grafico
      let yaxis=[];
      let xaxis = [];
      if (type == 'daily') {
          
          for (var key in data) {
            for (var key1 in data[key]) {

                yaxis.push(data[key][key1]["Noise_dBA"]);
                xaxis.push(data[key][key1]["Hour"]);
                
            }
          }
      }
      
      else if (type=="monthly") {
        for (var key in data) {
          for (var key1 in data[key]) {
              yaxis.push(data[key][key1]["DailyAverageNoise"]);
              xaxis.push(data[key][key1]["Day"]);
              
          }
        }
      }
      else if (type=="annual"){
        for (var key in data) {
          for (var key1 in data[key]) {
              yaxis.push(data[key][key1]["MonthlyAverageNoise"]);
              xaxis.push(data[key][key1]["Month"]);
              
          }

        }
      }

      console.log("Valori in ordinate: " + yaxis + "\n Valori in ascissa: " + xaxis);

      const chartData = {
          labels: xaxis,
          values: yaxis
      };

      if (data == null){
        alert ("IL DESIGN è: " + design);
        this.chartFactory.createChart(null, design);
      }else {
        this.chartFactory.createChart(chartData, design);
      }
          
      
      //chartFactory.createBarChart(barChartData);
      //chartFactory.createPieChart(pieChartData);



    }

    buildCardLabelsForSensor(data) {

      /*QUI FACCIO UN CICLO SUI COMPONENTI E FACCIO UN CHECK PER OGNI COMPONENTE
       CHE SE IL VALORE DEL TESTO è TOP ALLORA LA CARD DIVENTA ROSSA, ARANCIONE, GIALLA, VERDE*/

      $("#sensor").text(data['result'][0]['ID_device']);
      $("#measurements").text(data['result'][0]['Total']);
      $("#lastMeasurement").text(data['result'][0]['LastDate']);
      $("#firstMeasurements").text(data['result'][0]['FirstDate']);
      //$("#averageMeasurement").text(data['result'][0]['ID_device']);
      $("#minSoundLevel").text(data['result'][0]['MinNoise']);
      $("#maxSoundLevel").text(data['result'][0]['MaxNoise']);
      $("#averageSoundLevel").text(data['result'][0]['AvgNoise']);

    }

    

    getValuesForDailyChart(selectedSensor, date, typeofdateValue) { //giornalieri

      let self = this;

      console.log("I'm here ", selectedSensor, date);
          $.ajax({
            url: "./src/controller/php/getAllMeasureForDay.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "date": date},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {

            let responseParsed = JSON.parse(response);

            self.createChart(responseParsed,typeofdateValue, "line");
            
          }
    }


    getValuesForDailyChartBetweenHours(selectedSensor, date, startHour, endHour, typeofdateValue) { //giornalieri nelle ore...

      let self = this;

      console.log("I'm here ", selectedSensor, date);

      
          $.ajax({
            url: "./src/controller/php/getAllMeasureForDayBetweenHours.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "date": date, "starthour": startHour, "endhour": endHour},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });


          function success(response)  {

            console.log(response);

            let responseParsed = JSON.parse(response);

            self.createChart(responseParsed, typeofdateValue, "line");
            
          }

    }

    getValuesForMonthlyChart(selectedSensor, month, typeofdateValue) { //mensili

      let self = this;

      console.log("I'm here ", selectedSensor, typeofdateValue);
          $.ajax({
            url: "./src/controller/php/getAllMeasureForMonth.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "month": month},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {
            console.log(response);

            let responseParsed = JSON.parse(response);

            

            self.createChart(responseParsed, typeofdateValue, "line");
            
          }
    }

    getValuesForAnnualChart(selectedSensor, year, typeofdateValue) { //annuale

      let self = this;

      console.log("I'm here ", selectedSensor, typeofdateValue);
          $.ajax({
            url: "./src/controller/php/getAllMeasureForYear.php",
            type: "POST",
            data: {"selectedSensor": selectedSensor, "year": year},
            cache: false,
      
            success: success,
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            },
          });
          function success(response)  {
            console.log("Risultato query: " +response);

            let responseParsed = JSON.parse(response);

            

            self.createChart(responseParsed, typeofdateValue, "line");
            
            
          }
    }


   
  }





