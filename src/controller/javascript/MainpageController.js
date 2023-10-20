/*This class contains the basic class for controller*/

import  {MainpageModel} from "../../model/javascript/MainpageModel.js";

export class MainPageController {

  constructor() {
    this.model = new MainpageModel();
  }

  initializePage(){
    this.model.initpage();
  }
  
  showZones() {
    this.model.clearMapLayers();
    this.model.showZones();  
  }

  showColoredNightZone() {
    this.model.showColoredNightZone();
  }

  applyMapLayer(mapLayer) {
    this.model.applyMapLayer(mapLayer);
  }

  hideZones(){
    this.model.hideZones();
  }

  clearLayers(){
    this.model.clearMapLayers();
  }

  getBaseInfoFromSelectedSensor(selectedSensor){
    console.log("selected Sensor: " + selectedSensor);
    this.model.getBaseInfoFromSelectedSensor(selectedSensor);
    this.model.getAllStatsFromSensor(selectedSensor);
    //this.model.createHeatMap();
  }


  searchButtonClick(){
    this.model.searchButtonClick();
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

  colorZone() { //colora le regioni (zone) in base al valore medio di noise all'interno dell'aria 
    this.model.verifyPointInsidePolygon();
  }


  /*Reserved Area*/ 

  getAllInfoFromSensor(sensor) {
    this.model.getAllInfoFromSensor(sensor);
  }


  clickOnTableRow(){
    this.model.clickOnTableRow();
  }

  viewRouteOnMap() {
    this.model.viewRouteOnMap();
  }

}

