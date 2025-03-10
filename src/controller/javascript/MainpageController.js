/*This class contains the basic class for controller*/

import { MainpageModel } from "../../model/javascript/MainpageModel.js";

export class MainPageController {

  constructor() {
    this.model = new MainpageModel();
  }

  initializePage() {
    this.model.initpage();
  }

  showZones() {
    this.model.clearMapLayers();
    this.model.showZones();
  }

  showColoredNightZone() {
    this.model.clearMapLayers();
    this.model.showColoredNightZone();
  }

  applyMapLayer(mapLayer) {
    this.model.applyMapLayer(mapLayer);
  }

  hideZones() {
    this.model.hideZones();
  }

  clearLayers() {
    this.model.clearMapLayers();
  }

  getBaseInfoFromSelectedSensor(selectedSensor) {
    console.log("selected Sensor: " + selectedSensor);
    this.model.getBaseInfoFromSelectedSensor(selectedSensor);
    this.model.getAllStatsFromSensor(selectedSensor);
  }


  searchButtonClick() {
    this.model.searchButtonClick();
  }

  dayChart() {

  }

  nightChart() {

  }

  barChartButtonClick() {
    this.model.createChart(null, null, "bar");
  }

  lineChartButtonClick() {
    this.model.createChart(null, null, "line");
  }


  showLoadingSpinner() {
    this.model.showLoadingSpinner();
  }

  hideLoadingSpinner() {
    this.model.hideLoadingSpinner();
  }

  colorZone() {
    this.model.verifyPointInsidePolygon();
  }


  /*Reserved Area*/

  getAllInfoFromSensor(sensor) {

    this.model.getAllInfoFromSensor(sensor);
  }


  clickOnTableRow() {
    this.model.clickOnTableRow();
  }

  viewRouteOnMap() {
    alert("ciao");
    this.model.viewRouteOnMap();
  }

}

