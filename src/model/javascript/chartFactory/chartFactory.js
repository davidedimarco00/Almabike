export class ChartFactory {
    constructor(containerId) {
        this.containerId = containerId;
        this.chart=null;
        this.ctx = document.getElementById(this.containerId).getContext('2d');
    }

    createLineChart(data) {

    
        

        if (this.chart!=null){
            this.chart.destroy();
        }

        /*const dataValues = data.values; // Sostituisci con il tuo array di dati
        const meanValue = dataValues.reduce((acc, currentValue) => acc + currentValue, 0) / dataValues.length;*/

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
                    point:{
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
        const ctx = document.getElementById(this.containerId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Bar Chart',
                    data: data.values,
                    backgroundColor: 'green'
                }]
            }
        });
    }

    createPieChart(data) {
        const ctx = document.getElementById(this.containerId).getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: ['red', 'blue', 'green']
                }]
            }
        });
    }
}