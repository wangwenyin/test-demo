<template>
  <div :class="className" :style="{height:height,width:width}"/>
  <!-- <transition name="fade">
    <div class="arrow" v-if="isShowIcon">
      <svg-icon icon-class="case_arrow_left" class="arrow-left" @click.native="onArrowClick(0)" />
      <svg-icon icon-class="case_arrow_right" class="arrow-right" @click.native="onArrowClick(1)" />
    </div>
  </transition> -->
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
/* import { getStatProperty } from '@/api/statistic' */
export default {
  name: 'LineChart',
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
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      x: [],
      y: [],
      list: []
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.getChartData()
      }
    }
  },
  created() {
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.caseNumChart) {
        this.caseNumChart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getChartData() {
      this.x = []
      this.y = []
      this.data.forEach(item => {
        this.x.push(item.period)
        this.y.push(item.value)
      })
      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: this.x,
          boundaryGap: false
          /* axisTick: {
            show: false
          } */
        },
        grid: {
          left: 10,
          right: 30,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          scale: true,
          type: 'value',
          axisTick: {
            show: false
          }
        },
        /* legend: {
          data: ['actual']
        }, */
        series: [{
          name: '指数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              label: {
                show: true
              },
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          symbolSize: 10,
          data: this.y,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
