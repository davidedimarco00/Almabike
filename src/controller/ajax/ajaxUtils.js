export function getSoundLevelChart(cat, r) { //cat must be -monthly, -weekly, annual ecc
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("myChart").innerHTML = this.responseText;
        alert(document.getElementById("myChart").innerHTML);
      }
    };
    xhttp.open("GET", "getDynamicSoundLevelChart.php?q=" + cat + "&r=" + r, true);
    alert(r);
    xhttp.send();
}

export function getSensorMeasurement(sensorName) { 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
    
      }
    };
    xhttp.open("GET", "getDynamicSensorCoord.php?sensorName="+sensorName, true);
    xhttp.send();
}

