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
  name: 'LatencyChart',
  components: {
    LineChart
  },
  computed: {
    ...mapGetters({
      labels: 'latencyChartData/labels',
      meanLatencyMs: 'latencyChartData/meanLatencyMs',
      maxLatencyMs: 'latencyChartData/maxLatencyMs',
      minLatencyMs: 'latencyChartData/minLatencyMs',
      darkTheme: 'theme/darkTheme'
    }),
    chartData() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            label: 'Mean latency (ms)',
            backgroundColor: '#F44336',
            borderColor: '#F44336',
            fill: false,
            data: [...this.meanLatencyMs]
          },
          {
            label: 'Max latency (ms)',
            backgroundColor: '#2196F3',
            borderColor: '#2196F3',
            fill: false,
            data: [...this.maxLatencyMs]
          },
          {
            label: 'Min latency (ms)',
            backgroundColor: '#4CAF50',
            borderColor: '#4CAF50',
            fill: false,
            data: [...this.minLatencyMs]
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
          text: 'Latency',
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
      // eslint-disable-next-line no-console
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
