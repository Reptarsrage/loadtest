<template>
  <div class="small">
    <LineChart
      :chart-data="chartData"
      :dark-theme="darkTheme"
      :options="options"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from './LineChart.js'

export default {
  name: 'ErrorChart',
  components: {
    LineChart
  },
  computed: {
    ...mapGetters({
      labels: 'errorChartData/labels',
      totalRequests: 'errorChartData/totalRequests',
      totalErrors: 'errorChartData/totalErrors',
      darkTheme: 'theme/darkTheme'
    }),
    chartData() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            label: 'Requests per second',
            backgroundColor: '#F44336',
            borderColor: '#F44336',
            fill: false,
            data: [...this.totalRequests]
          },
          {
            label: 'Errors per second',
            backgroundColor: '#2196F3',
            borderColor: '#2196F3',
            fill: false,
            data: [...this.totalErrors]
          }
        ]
      }
    },
    options() {
      const fontColor = this.isDark() ? 'white' : 'black'
      const color = this.isDark()
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)'

      return {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 8,
            right: 8
          }
        },
        legend: {
          position: 'top',
          labels: {
            fontColor
          }
        },
        title: {
          display: true,
          text: 'Errors',
          fontColor
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor, // labels such as 10, 20, etc
                showLabelBackdrop: false // hide square behind text
              },
              pointLabels: {
                fontColor // labels around the edge like 'Running'
              },
              gridLines: {
                color
              },
              angleLines: {
                color // lines radiating from the center
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor, // labels such as 10, 20, etc
                showLabelBackdrop: false // hide square behind text
              },
              pointLabels: {
                fontColor // labels around the edge like 'Running'
              },
              gridLines: {
                color
              },
              angleLines: {
                color // lines radiating from the center
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    isDark() {
      return this.darkTheme
    },
    dataset(idx) {
      return this.datasets[idx].data
    }
  }
}
</script>

<style>
.small > div {
  height: 200px;
  position: relative;
}
</style>
