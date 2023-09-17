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
        
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Line Chart',
                    data: data.values,
                    borderColor: 'blue',
                    fill: false
                }]
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