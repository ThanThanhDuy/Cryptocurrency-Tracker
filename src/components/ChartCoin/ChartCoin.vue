<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'ChartCoin',
  extends: Line,
  props: {
    lables: {
      type: Array
    },
    dataChart: {
      type: Array
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.lables,
        datasets: [
          {
            label: 'Price',
            data: this.dataChart,
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)',
            tension: 0.2
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(0, 0, 0, 0)'
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    )
  }
}
</script>
