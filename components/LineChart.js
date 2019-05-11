import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    },
    darkTheme: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    darkTheme: function() {
      this.renderChart(this.chartData, this.options)
    }
  }
}
