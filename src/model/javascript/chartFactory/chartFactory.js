/*QUESTA CLASSE SERVE A CREARE UN CHART A PARTIRE DAI DATI DATI NEL PARAMETRO DATA*/

export class ChartFactory {
  constructor(containerId) {
    this.containerId = containerId;
    this.chart = null;
    this.storedData = null;
    this.ctx = document.getElementById(this.containerId).getContext('2d');
  }


  createEmptyChart() {
    const canvas = document.getElementById('myChart');
    const message = 'Seleziona un sensore per visualizzare il grafico';


    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(message, canvas.width / 2, canvas.height / 2);

  }



  createChart(data, design) {

    if (data != null) {
      this.storedData = data;
    }

    if (data == null) {
      data = this.storedData;
    }

    switch (design) {
      case "line":
        this.createLineChart(data);
        break;
      case "bar":
        this.createBarChart(data);
        break;
    }


  }



  createLineChart(data) {
    if (this.chart != null) {
      this.chart.destroy();
    }
    const dataValues = data.values; // Sostituisci con il tuo array di dati

    // Calcola il valore medio per ogni due misurazioni
    const meanValues = [];
    for (let i = 0; i < dataValues.length; i += 2) {
      const chunk = dataValues.slice(i, i + 2);
      const meanValue = chunk.reduce((acc, currentValue) => acc + currentValue, 0) / chunk.length;
      meanValues.push(meanValue, meanValue);
    }

    this.chart = new Chart(this.ctx, {
      type: 'line',
      options: {
        elements: {
          point: {
            radius: 1
          }
        }
      },
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Livello del suono',
          data: data.values,
          borderColor: 'blue',
          fill: false,
          lineTension: 0.2,
        },
        {
          label: 'Valore medio',
          data: meanValues, // Crea un array con il valore medio ripetuto
          borderColor: 'red',
          fill: false,
          lineTension: 0.2,

        }


        ]
      }
    });
  }

  createBarChart(data) {
    if (this.chart != null) {
      this.chart.destroy();
    }

    const barColors = data.values.map(value => {
      if (value < 60) {
        return 'green';
      } else if (value >= 60 && value < 80) {
        return 'yellow';
      } else if (value >= 80 && value <= 95) {
        return 'orange';
      } else if (value > 95) {
        return 'red';
      }
    });

    // Creare una legenda personalizzata
    const legendLabels = ['Rischio basso', 'Rischio medio', 'Rischio alto', 'Rischio molto alto'];
    const legendColors = ['green', 'yellow', 'orange', 'red'];

    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Livello del suono medio',
          data: data.values,
          backgroundColor: barColors,
          borderColor: 'blue',
        }],
      },
      options: {
        plugins: {
          legend: {
            display: true, // Mostra la legenda
            labels: {
              generateLabels: function (chart) {
                const legendItems = [];
                legendLabels.forEach((label, index) => {
                  legendItems.push({
                    text: label,
                    fillStyle: legendColors[index],
                  });
                });
                return legendItems;
              },
            },
          },
        },
      },
    });
  }

}