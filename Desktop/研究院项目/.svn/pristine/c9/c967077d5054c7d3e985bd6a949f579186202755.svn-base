<template>
  <!--  <div :class="className" :style="{height:height,width:width}" :data1="data1" :data2="data2"/> -->
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getStatProperty } from '@/api/statistic'
const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    }
  },
  data() {
    return {
      chart: null,
      xdata: [],
      ydata: []
    }
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    this.fetchData()
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
    fetchData() {
      getStatProperty({
        type: '行政区'
      }).then(response => {
        if (response.code === 200) {
          for (var i = 0; i < response.data.length; i++) {
            this.ydata.push(response.data[i].count)
            this.xdata.push(response.data[i].district)
          }
          this.initChart()
        } else {
          this.$message({
            type: 'error',
            message: '获取数据失败!',
            duration: 5 * 1000
          })
        }
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        calculable: true,
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.xdata,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          type: 'bar',
          barGap: 0,
          barWidth: '30%',
          data: this.ydata,
          label: {
            normal: {
              show: true
            }
          },
          animationDuration
        }]
      })
    }
  }
}
</script>
