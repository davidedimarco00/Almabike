/*This class contains the basic class for controller*/

import  {MainpageModel} from "../../model/javascript/MainpageModel.js";

import  {Controller} from "../../controller/javascript/controller.js";

export class MainPageController extends Controller {

  constructor() {
    super();
    this.model = new MainpageModel();
  }

  initializePage(){
    this.model.initpage();
  }

  
  showZones() {
    this.model.showZones();  
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
    this.model.getBaseInfoFromSelectedSensor(this.model.getMap(), selectedSensor);
    this.model.getAllStatsFromSensor(selectedSensor);
    //this.model.createHeatMap();
  }


  searchButtonClick(){
    this.model.searchButtonClick();
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

}

