<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Tạo mảng 31 ngày
                datasets: [
                    {
                        label: 'Doanh số',
                        backgroundColor: '#41B883',
                        data: [50, 60, 70, 65, 80, 75, 60, 70, 85, 90, 80, 95, 80, 75, 60, 70, 85, 90, 100, 95, 80, 75, 60, 70, 85, 90, 100, 95, 80, 75, 60],
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            },
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    },
}
</script>