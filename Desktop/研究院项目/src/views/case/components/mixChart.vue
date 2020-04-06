<template>
  <div :class="className" :id="id" :style="{ height: height,width: width }"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    dateRange: {
      type: Array,
      default: function() {
        return []
      }
    },
    caseList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null,
      caseData: []
    }
  },
  watch: {
    caseList: {
      handler() {
        this.initializeData()
      },
      // 深度监视
      deep: true
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initializeData() {
      for (let i = 0; i < this.caseList.length; i++) {
        const caseObj = this.caseList[i]
        const item = [caseObj.ex_time, caseObj.each_price, caseObj.bldg_name, caseObj.unit_no, caseObj.house_area, caseObj.floor_no, caseObj.face_to]
        this.caseData.push(item)
      }
      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          text: '案例散点图',
          x: '20',
          top: '20',
          textStyle: {
            color: '#000',
            fontSize: '22'
          },
          subtextStyle: {
            color: 'grey',
            fontSize: '12'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 60,
          bottom: 60,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [{
          type: 'time',
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          },
          scale: true,
          min: this.dateRange[0].slice(0, 7),
          max: this.dateRange[1].slice(0, 7),
          interval: 3600 * 24 * 1000 * 31,
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLabel: {
            // 刻度标签的内容格式器
            formatter: function(value, index) {
              var date = new Date(value)
              var texts = [date.getFullYear(), (date.getMonth() + 1)]
              return texts.join('/')
            }
          }
        }],
        yAxis: [{
          type: 'value',
          scale: true,
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        // 日期缩放
        dataZoom: [{
          show: true,
          height: 30,
          backgroundColor: '#E8E8E8',
          xAxisIndex: [0],
          bottom: 0,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#3C3B3F'
          },
          textStyle: { color: '#000' },
          borderColor: '#90979c'
        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: 'female',
          type: 'scatter',
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              return '日期：' + params.value[0] + '<br/>' +
                    '单价：' + params.value[1] + '<br/>' +
                    '楼栋：' + params.value[2] + '<br/>' +
                    '房号：' + params.value[3] + '<br/>' +
                    '面积：' + params.value[4] + '<br/>' +
                    '楼层：' + params.value[5] + '<br/>' +
                    '朝向：' + (params.value[6] !== undefined ? params.value[6] : '无') + '<br/>'
            },
            axisPointer: {
              type: 'cross',
              lineStyle: {
                type: 'dashed',
                width: 1
              }
            }
          },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          },
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)'
            }
          },
          data: this.caseData
        }]
      })
    }
  }
}
</script>
