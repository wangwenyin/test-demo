<template>
  <div ref="echart" :id="id" :style="{height:height,width:width}" />
</template>
<style>
</style>
<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
export default {
  components: {
    echarts
  },
  props: {
    id: {
      type: String,
      default: 'echarts'
    },
    height: {
      type: String,
      default: '350px'
    },
    width: {
      type: String,
      default: '100%'
    },
    'histogram-data': {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null,
      xAxisData: [],
      yAxisData: []
    }
  },
  watch: {
    histogramData() {
      this.xAxisData = []
      this.yAxisData = []
      for (var i = 0; i < this.histogramData.length; i++) {
        this.xAxisData.push(this.histogramData[i].segment)
        this.yAxisData.push(this.histogramData[i].cnt)
      }
      this.draw()
    }
  },
  mounted() {
    // console.log(this.histogramData)
    /* console.log('1111' + this.taskid)
    if (this.taskid) {
      this.fetchData()
    } */
    this.$nextTick(() => {
      this.chart.resize()
    })
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    draw: function() {
      try {
        this.chart = echarts.init(document.getElementById(this.id))
        var option = {
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          legend: {
            data: []
          },
          xAxis: [
            {
              type: 'category',
              name: '回归标准化残差',
              data: this.xAxisData
              /* data: [
                '-6',
                '-5',
                '-4',
                '-3',
                '-2',
                '-1',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6'
              ] */
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '频率'
            }
            /* {
              type: 'value',
              name: ''
            } */
          ],
          series: [
            {
              name: '频率',
              type: 'bar',
              data: this.yAxisData
            }
          ]
        }
        this.chart.setOption(option)
      } catch (e) {
        console.log('出错')
        // console.log(e)
      }
    }
  }
}
</script>
