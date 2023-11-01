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
    this.flagHeatMap = false;
    this.allPointsOnMap = [];
    this.allPolygonsOnMap = [];
    this.allPointsOnMap2 = [];
    this.ajaxResponse = [];
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

    //alert("A post passo i valori\n" + serializedData);

    //FACCIO IL GRAFICO

    let formData = new URLSearchParams(serializedData);
    // Accedi al valore di un campo specifico, ad esempio 'typeofdate'
    let typeofdateValue = formData.get("typeofdate");
    let datePickerValue = formData.get("datepicker");

    console.log("ho selezionato: " + typeofdateValue);

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
        //alert(starthour + " " + endhour);
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
    $("#status-message").text("carico i dati");

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
      console.log("Risultato query: " + response);

      let responseParsed = JSON.parse(response);

      self.buildCardLabelsForSensor(responseParsed);
    }
  }

  getBaseInfoFromSelectedSensor(selectedSensor) {
    $("#status-message").text("carico i dati");
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
          let soundLevels = [];
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
              soundLevels.push(positions[key][key1]["Noise_dBA"]);
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
  getSensorAssociatedWithUser(username) {
    $.ajax({
      url: "./src/controller/php/getSensorAssociatedWithUser.php",
      cache: false,
      type: "post",
      data: username,
      success: function (response) {
        let result = JSON.parse(response);
      },
    });
  }

  applyHeatMapLayerForSensor(data, map) {
    $.ajax({
      url: "./src/controller/php/getDynamicSoundLevelChart.php",
      type: "POST",
      data: data,
      cache: false,
      success: function (response) {
        if (self.flagHeatMap) {
          map.removeLayer(self.heat);
        }
        let data = JSON.parse(response);
        let heatPoints = [];

        for (let key in data) {
          for (let key1 in data[key]) {
            let heatPoint = [
              data[key][key1]["lati"] / 100000,
              data[key][key1]["longi"] / 100000,
              data[key][key1]["Noise_dBA"] / 100,
            ];
            heatPoints.push(heatPoint);
          }
        }

        self.heat = L.heatLayer(heatPoints, {
          radius: 25,
          blur: 1,

          //da 0 a 60 verde, da 60 a 80 giallo, da 80 a 95 arancione, sopra i 95 rosso
          gradient: { 0: "green", 0.6: "yellow", 0.8: "orange", 0.95: "red" },
        }).addTo(map);

        self.flagHeatMap = true;
      },

      error: function (jqXHR, textStatus, errorThrown) {
        //alert("Chiamata fallita");
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
    if (data["result"].length != 0) {
      //se i dati non sono disponibili esco da questa funzione altrimenti da errore e non si capisce perche
      $("#sensor").text(data["result"][0]["ID_device"]);
      $("#measurements").text(data["result"][0]["Total"]);
      $("#lastMeasurement").text(data["result"][0]["LastDate"]);
      $("#firstMeasurements").text(data["result"][0]["FirstDate"]);
      $("#minSoundLevel").text(data["result"][0]["MinNoise"]);
      $("#maxSoundLevel").text(data["result"][0]["MaxNoise"]);
      $("#averageSoundLevel").text(data["result"][0]["AvgNoise"]);
      $("#status-message").text(" Si");
    } else {
      $("#status-message").text(" Nessun dato disponibile");
    }
  }

  getValuesForDailyChart(selectedSensor, date, typeofdateValue) {
    //giornalieri

    let self = this;

    console.log("I'm here ", selectedSensor, date);
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

  getValuesForDailyChartBetweenHours(
    selectedSensor,
    date,
    startHour,
    endHour,
    typeofdateValue
  ) {
    //giornalieri nelle ore...

    let self = this;

    console.log("I'm here ", selectedSensor, date);

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
      console.log(response);

      let responseParsed = JSON.parse(response);

      self.createChart(responseParsed, typeofdateValue, "line");
    }
  }

  getValuesForMonthlyChart(selectedSensor, month, typeofdateValue) {
    //mensili

    let self = this;

    console.log("I'm here ", selectedSensor, typeofdateValue);
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
      //console.log(response);
      let data = JSON.parse(response);

      let currentPath = [];
      let paths = [];
      let lastTimestamp = null;

      for (let key in data) {
        for (let key1 in data[key]) {
          if (lastTimestamp !== null) {
            const timeDifference =
              (new Date(data[key][key1]["Time"]) - new Date(lastTimestamp)) /
              1000; // Differenza di tempo in secondi
            //console.log(timeDifference);

            // Se il tempo trascorso tra le misurazioni è superiore a 5 secondi, considera un nuovo percorso
            if (timeDifference > 20) {
              paths.push([...currentPath]); // Copia il percorso corrente in 'paths'
              currentPath = [];
            }
            currentPath.push({
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
      if (currentPath.length > 0) {
        //qui bisogna visualizzare solo quelli effettuati in un determinato giorno
        //oppure quello selezionato
        paths.push([...currentPath]); // Copia l'ultimo percorso in 'paths'
      }
      paths = paths.filter(function (path) {
        return path.length > 1;
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

      let paths_list = [];

      for (let i = 0; i < paths.length; i++) {
        let coordinates = paths[i].map(function (point) {
          return [point.latitude, point.longitude];
        });

        paths_list.push(coordinates);
      }
      for (let t = 0; t < paths.length - 1; t++) {
        //ora iniziale
        let dateAndHour = paths[t][0].time.split(" ");
        let date = dateAndHour[0];
        let hour = dateAndHour[1];
        //ora finale
        let dateAndHourF = paths[t][paths[t].length - 1].time.split(" ");
        let hourF = dateAndHourF[1];

        //rumore medio

        const sumNoise = paths[t].reduce(
          (accumulator, current) => accumulator + current.noise,
          0
        );
        const average = (sumNoise / paths[t].length).toFixed(2);
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
            /*Qui devo riempire la tabella*/ date,
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

        // Estrarre l'indice dalla classe del link
        let linkClass = $(this).attr("class");
        let index = linkClass.match(/\d+/); // Estrae il numero dall'attributo class

        viewRouteOnMap(index, paths_list);
      });

      let routesOnMap = [];

      function viewRouteOnMap(index, paths) {
        console.log(paths[index]);
        routesOnMap.forEach(function (polyline) {
          self.map.removeLayer(polyline);
        });
        let route = L.polyline(paths[index], { color: "#00B0FF", weight: 5}).addTo(self.map);
        self.map.fitBounds(route.getBounds());
        routesOnMap.push(route);
      }
    }
  }
}
