import { ChartFactory } from "../javascript/chartFactory/chartFactory.js";
import { HeatMapFactory } from "../javascript/heatMapFactory/HeatMapFactory.js";
import { MapManager } from "../javascript/mapManager/MapManager.js";

export class MainpageModel {
  constructor() {
    this.ajaxCall = []; //array che contiene le chiamate ajax da eseguire, serve per la gestione della fine
    this.map = L.map("map", { zoomControl: false }).setView(
      [44.4992192, 11.2616459],
      12
    );
    this.zonesAreVisible = false;
    this.selCheckbox;
    const self = this;
    this.allPointsOnMap = [];
    this.allPolygonsOnMap = [];
    this.heat;
    this.chartFactory = new ChartFactory("myChart");
    this.heatMapFactory = new HeatMapFactory(this.map);
    this.mapManager = new MapManager(this.map);
  }

  initpage() {
    $("#myChart").removeAttr("style");
    //Graph tab click change status to active
    let checkboxes =
      "input#inputdaily,input#inputmonthly,input#inputweekly,input#inputannual";

    self.selCheckbox = $("input#inputdaily").attr("id");

    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear() + "-" + month + "-" + day;
    $("#datepicker").attr("value", today);

    $(checkboxes).on("click", function () {
      //quando clicco su una bisogna lanciare un ajax che mi carica il chart corretto in live
      $(checkboxes).prop("checked", false);

      $(this).prop("checked", true);

      let selectedCheckbox = $(this).attr("id");

      self.selCheckbox = selectedCheckbox;

      switch (selectedCheckbox) {
        case "inputdaily":
          $("#datepicker").attr("type", "date");
          $("#dateLabel").text("Scegli un giorno");
          $(".hour-input").prop("disabled", false);
          break;
        case "inputmonthly":
          $("#datepicker").attr("type", "month");
          $("#dateLabel").text("Scegli un mese");
          $(".hour-input").prop("disabled", true);
          break;
        case "inputannual":
          $("#datepicker").attr("type", "number");
          $("#dateLabel").text("Scegli un anno");
          $(".hour-input").prop("disabled", true);
          break;
      }
    });

    $("#loadingSpinner").hide();

    this.mapManager.applyMapLayer("streetMapLayer");
    this.mapManager.addMapControls();
    this.mapManager.showZones();

    
    if ($("#sensorNameLbl").length > 0) {

      let sensorName = "sensorName=" + $('#sensorNameLbl').text().replace(/\s/g, '');
      //this.getAllStatsFromSensor($('#sensorNameLbl').text().replace(/\s/g, ''));
      this.getAllStatsFromSensor(sensorName);

      //prendo i dati del sensore relativo all'utente


      
      //costruisco il grafico
      this.getValuesForAnnualChart(
        sensorName.split("=")[1],
        "2022", //BISOGNEREBBE VISUALIZZARE L'ANNATA CORRENTE, MA NON CI SONO DATI, SONO PRESENTI SOLO DATI DEL 2022
        "annual"
      );
      
    }
    else {
      this.chartFactory.createEmptyChart();
    }

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

  clearMapLayers() {
    this.mapManager.clearMapLayers();
  }

  getZoneInfo(zone, map) {
    return 1;
  }

  getMap() {
    return this.mapManager.getMap();
  }

  //DASHBOARD FUNCTIONS
  searchButtonClick() {
    let $form = $("#chartForm");
    //alert("#datepicker, #input"+ selTab);
    // Let's select and cache all the fields
    let $inputs = $form.find(
      "#datepicker, #" + self.selCheckbox + ", .hour-input"
    );
    // Serialize the data in the form
    let serializedData = $inputs.serialize();
    //FACCIO IL GRAFICO

    let formData = new URLSearchParams(serializedData);
    // Accedi al valore di un campo specifico, ad esempio 'typeofdate'
    let typeofdateValue = formData.get("typeofdate");
    let datePickerValue = formData.get("datepicker");
    if (typeofdateValue == "daily") {
      //se h oselezionato il giorno
      let starthour = formData.get("starthour");
      let endhour = formData.get("endhour");

      if (
        starthour === null ||
        starthour.trim() === "" ||
        endhour === null ||
        endhour.trim() === ""
      ) {
        //alert("i campi sono vuoti");
        //allora voglio il grafico giornaliero con tutte le misurazioni del giorno

        console.log(
          "Sensore attualmente selezionato=",
          $("#selectSensor").val()
        );
        this.getValuesForDailyChart(
          $("#selectSensor").val(),
          datePickerValue,
          typeofdateValue
        );
      } else {
        starthour = starthour + ":00"; //preparo la formattazione dei due parametri
        endhour = endhour + ":00";
        this.getValuesForDailyChartBetweenHours(
          $("#selectSensor").val(),
          datePickerValue,
          starthour,
          endhour,
          typeofdateValue
        );
      }
    } else if (typeofdateValue == "monthly") {
      this.getValuesForMonthlyChart(
        $("#selectSensor").val(),
        datePickerValue,
        typeofdateValue
      );
    } else if (typeofdateValue == "annual") {
      this.getValuesForAnnualChart(
        $("#selectSensor").val(),
        datePickerValue,
        typeofdateValue
      );
    }
  }

  getAllStatsFromSensor(selectedSensor) {
    $("#status-message").text(" Carico i dati");

    let self = this;

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
    function success(response) {
      let responseParsed = JSON.parse(response);
      self.buildCardLabelsForSensor(responseParsed);
    }
  }

  getBaseInfoFromSelectedSensor(selectedSensor) {
   
    $("#status-message").text("Carico i dati");
    let markers;
    let self = this;
    if (!this.zonesAreVisible) {
      this.hideZones();
      this.mapManager.clearClusterGroup();
    }
   
    $.ajax({
      url: "./src/controller/php/getDynamicSensorCoord.php",
      type: "post",
      data: selectedSensor,
      cache: false,
      success: function (response) {
        let positions = JSON.parse(response);
        console.log(positions);
        if (positions) {
          markers = L.markerClusterGroup();
          let data = [];
          for (let key in positions) {
            for (let key1 in positions[key]) {
              let title =
                "Livello sonoro:" + positions[key][key1]["Noise_dBA"] + "dB";
              let marker = L.marker(
                new L.LatLng(
                  positions[key][key1]["lati"] / 100000,
                  positions[key][key1]["longi"] / 100000
                ),
                {
                  title: title,
                }
              );
              data.push([
                positions[key][key1]["lati"] / 100000,
                positions[key][key1]["longi"] / 100000,
                positions[key][key1]["Noise_dBA"],
              ]);
              marker.bindPopup(title);
              markers.addLayer(marker);
            }
            self.map.addLayer(markers);
          }
          
          self.heatMapFactory.addData(data);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
  }



  showLoadingSpinner() {
    $("#loadingSpinner").show();
  }

  hideLoadingSpinner() {
    $("#loadingSpinner").hide();
  }

  createChart(data, type, design) {
    //alert("Okay ora devo fare il grafico di un " + type);
    //console.log("dati\n\n\n\n", data);

    //isolo l'array che m'interessa per il grafico
    let yaxis = [];
    let xaxis = [];
    if (type == "daily") {
      for (let key in data) {
        for (let key1 in data[key]) {
          yaxis.push(data[key][key1]["Noise_dBA"]);
          xaxis.push(data[key][key1]["Hour"]);
        }
      }
    } else if (type == "monthly") {
      for (let key in data) {
        for (let key1 in data[key]) {
          yaxis.push(data[key][key1]["DailyAverageNoise"]);
          xaxis.push(data[key][key1]["Day"]);
        }
      }
    } else if (type == "annual") {
      for (let key in data) {
        for (let key1 in data[key]) {
          yaxis.push(data[key][key1]["MonthlyAverageNoise"]);
          xaxis.push(data[key][key1]["Month"]);
        }
      }
    }
    const chartData = {
      labels: xaxis,
      values: yaxis,
    };

    if (data == null) {
      this.chartFactory.createChart(null, design);
    } else {
      this.chartFactory.createChart(chartData, design);
    }
  }

  buildCardLabelsForSensor(data) {
    if (data["result"].length != 0) { //se i dati non sono disponibili esco da questa funzione altrimenti da errore e non si capisce perche
      $("#sensor").text(data["result"][0]["ID_device"]);
      $("#measurements").text(data["result"][0]["Total"]);
      $("#lastMeasurement").text(data["result"][0]["LastDate"]);
      $("#firstMeasurements").text(data["result"][0]["FirstDate"]);
      $("#minSoundLevel").text(data["result"][0]["MinNoise"] + " dB");
      $("#maxSoundLevel").text(data["result"][0]["MaxNoise"] + " dB");
      $("#averageSoundLevel").text(data["result"][0]["AvgNoise"] + " dB");
      $("#status-message").text(" Si");
    } else {
      $("#status-message").text(" Nessun dato disponibile");
    }
  }

  getValuesForDailyChart(selectedSensor, date, typeofdateValue) {
    //giornalieri
    let self = this;
    $.ajax({
      url: "./src/controller/php/getAllMeasureForDay.php",
      type: "POST",
      data: { selectedSensor: selectedSensor, date: date },
      cache: false,

      success: success,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
    function success(response) {
      let responseParsed = JSON.parse(response);

      self.createChart(responseParsed, typeofdateValue, "line");
    }
  }

  getValuesForDailyChartBetweenHours(selectedSensor, date, startHour, endHour, typeofdateValue) {
    let self = this;
    $.ajax({
      url: "./src/controller/php/getAllMeasureForDayBetweenHours.php",
      type: "POST",
      data: {
        selectedSensor: selectedSensor,
        date: date,
        starthour: startHour,
        endhour: endHour,
      },
      cache: false,

      success: success,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
    function success(response) {
      let responseParsed = JSON.parse(response);
      self.createChart(responseParsed, typeofdateValue, "line");
    }
  }

  getValuesForMonthlyChart(selectedSensor, month, typeofdateValue) {
    //mensili
    let self = this;
    $.ajax({
      url: "./src/controller/php/getAllMeasureForMonth.php",
      type: "POST",
      data: { selectedSensor: selectedSensor, month: month },
      cache: false,

      success: success,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
    function success(response) {
      console.log(response);

      let responseParsed = JSON.parse(response);

      self.createChart(responseParsed, typeofdateValue, "line");
    }
  }

  getValuesForAnnualChart(selectedSensor, year, typeofdateValue) {


    console.log(selectedSensor + " " + year + " " + typeofdateValue);
    //annuale

    let self = this;

    console.log("I'm here ", selectedSensor, typeofdateValue);
    $.ajax({
      url: "./src/controller/php/getAllMeasureForYear.php",
      type: "POST",
      data: { selectedSensor: selectedSensor, year: year },
      cache: false,

      success: success,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
    function success(response) {
      console.log("Risultato query: " + response);

      let responseParsed = JSON.parse(response);

      self.createChart(responseParsed, typeofdateValue, "line");
    }
  }

  /*AREA PERSONALE*/

  getAllInfoFromSensor(sensor) {
    //faccio chiamata ajax per prendere tutti i valori del sensore

    let self = this;
    $.ajax({
      url: "./src/controller/php/getAllInfoFromSensor.php",
      type: "POST",
      data: { sensorName: sensor },
      cache: false,

      success: success,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
    function success(response) {

      let data = JSON.parse(response);



      let currentRoute = [];
      let routes = [];
      let lastTimestamp = null;

      for (let key in data) {
        for (let key1 in data[key]) {
          if (lastTimestamp !== null) {
            const timeDifference =
              (new Date(data[key][key1]["Time"]) - new Date(lastTimestamp)) / 1000;
            if (timeDifference > 20) {
              routes.push([...currentRoute]); 
              currentRoute = [];
            }
            currentRoute.push({
              latitude: data[key][key1]["GPS_Latitude"], // Sostituisci con il nome corretto del campo delle coordinate di latitudine
              longitude: data[key][key1]["GPS_Longitude"], // Sostituisci con il nome corretto del campo delle coordinate di longitudine
              time: data[key][key1]["Time"],
              noise: data[key][key1]["Noise_dBA"],
              diff: timeDifference,
            });
          }
          lastTimestamp = data[key][key1]["Time"];
        }
      }

      // Aggiungi l'ultimo percorso
      if (currentRoute.length > 0) {
        routes.push([...currentRoute]);
      }
      routes = routes.filter(function (route) {
        return route.length > 1;
      });

    
      const table = new DataTable("#routes-table", {
        searching: false,
        lengthChange: false,
        language: {
          paginate: {
            previous: "Precedente",
            next: "Successivo",
          },
          info: "Visualizzi _START_ di _END_ su _TOTAL_ elementi",
        },
      });

      let routesList = [];

      for (let i = 0; i < routes.length; i++) {
        let coordinates = routes[i].map(function (point) {
          return [point.latitude, point.longitude];
        });

        routesList.push(coordinates);
      }
      for (let t = 0; t < routes.length - 1; t++) {
        let dateAndHour = routes[t][0].time.split(" ");
        let date = dateAndHour[0];
        let hour = dateAndHour[1];
        let dateAndHourF = routes[t][routes[t].length - 1].time.split(" ");
        let hourF = dateAndHourF[1];
        const sumNoise = routes[t].reduce(
          (accumulator, current) => accumulator + current.noise,
          0
        );
        const average = (sumNoise / routes[t].length).toFixed(2);
        let stateCell = "";
        if (average <= 60) {
          stateCell =
            "<i class='fas fa-circle text-success'></i> <a href='#' class='viewOnMapLink" +
            t +
            "'> Vedi sulla mappa<i class='fa-solid fa-route' > </i> </a>";
        } else if (average > 60 && average <= 80) {
          stateCell =
            "<i class='fas fa-circle text-warning'></i> <a href='#' class='viewOnMapLink" +
            t +
            "'> Vedi sulla mappa<i class='fa-solid fa-route' > </i> </a>";
        } else if (average > 80 && average <= 95) {
          stateCell =
            "<i class='fas fa-circle' style='color: #ff8f33;'></i> <a href='#' class='viewOnMapLink" +
            t +
            "'> Vedi sulla mappa<i class='fa-solid fa-route'> </i> </a>";
        } else {
          stateCell =
            "<i class='fas fa-circle text-danger'> </i><a href='#map' class='viewOnMapLink" +
            t +
            "'> Vedi sulla mappa<i class='fa-solid fa-route' > </i> </a>";
        }

        table.row
          .add([
            date,
            hour,
            hourF,
            average + " dB",
            stateCell,
          ])
          .draw(false);
      }

      // Assegna la gestione dei link
      $(document).on("click", "a[class^='viewOnMapLink']", function (event) {
        event.preventDefault();
        let linkClass = $(this).attr("class");
        let index = linkClass.match(/\d+/); // Estrae il numero dall'attributo class
        viewRouteOnMap(index, routesList);
      });

      let routesOnMap = [];
      function viewRouteOnMap(index, routes) {
        console.log(routes[index]);
        routesOnMap.forEach(function (polyline) {
          self.map.removeLayer(polyline);
        });
        let route = L.polyline(routes[index], { color: "#00B0FF", weight: 5}).addTo(self.map);
        self.map.fitBounds(route.getBounds());
        routesOnMap.push(route);
      }
    }
  }
}
