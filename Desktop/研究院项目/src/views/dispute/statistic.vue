<template>
  <div>
    <div ref="searchContainer" class="search-container" style="padding: 5px">
      <el-select v-model="usage" placeholder="请选择" size="small" class="search-item" @change="onUsageSelectChange">
        <el-option
          v-for="item in allUsages"
          :key="item"
          :label="item"
          :value="item"/>
      </el-select>
      <el-select v-model="district" placeholder="请选择" size="small" class="search-item" @change="onDistrictSelectChange">
        <el-option
          v-for="item in allDistricts"
          :key="item"
          :label="item"
          :value="item"/>
      </el-select>
      <el-select v-model="period" placeholder="请选择" size="small" class="search-item" @change="onPeriodSelectChange">
        <el-option
          v-for="item in allPeriods"
          :key="item"
          :label="item"
          :value="item"/>
      </el-select>
    </div>
    <div id="main" ref="main"/>
  </div>
</template>
<script>
import { getChartData } from '@/api/dispute/pricereview'
import echarts from 'echarts'
import { parseTime } from '@/utils/index'
require('echarts/theme/macarons') // echarts theme

export default {
  data() {
    return {
      allUsages: ['不限', '住宅', '商业', '办公', '工业'],
      usage: '不限',
      allDistricts: ['不限', '罗湖区', '福田区', '南山区'],
      district: '不限',
      allPeriods: ['过去7天', '过去1个月', '过去6个月', '过去1年'],
      period: '过去7天',
      chart: null,
      chartData: [],
      start_date: '',
      end_date: ''
    }
  },
  computed: {
    type() {
      return this.period === '过去7天' || this.period === '过去1个月' ? '1' : '2'
    }
  },
  created() {
  },
  mounted() {
    this.setEcHeight()
    this.getChartData()
    window.onresize = () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setEcHeight()
        this.chart.resize()
      }, 300)
    }
  },
  methods: {
    getChartData() {
      switch (this.period) {
        case '过去7天':
          this.setDate(7, 0)
          break
        case '过去1个月':
          this.setDate(31, 0)
          break
        case '过去6个月':
          this.setDate(0, 6)
          break
        case '过去1年':
          this.setDate(0, 12)
          break
      }
      const params = {
        district: this.district === '不限' ? null : this.district,
        property_usage: this.usage === '不限' ? null : this.usage,
        start_date: this.start_date,
        end_date: this.end_date,
        type: this.type
      }
      getChartData(params).then(res => {
        this.chartData = res.data
        const dateList = []
        const numList = []
        this.chartData.forEach(item => {
          dateList.push(item.sta_date)
          numList.push(item.sta_num)
        })
        this.draw(dateList, numList)
      })
    },
    setDate(dayNum, monthNum) {
      const now = new Date()
      const format = '{y}-{m}-{d}'
      const startDate = new Date(now.getFullYear(), now.getMonth() - monthNum, now.getDate() - dayNum)
      this.start_date = parseTime(startDate, format)
      this.end_date = parseTime(now, format)
    },
    draw(dataX, dataY) {
      this.chart = echarts.init(this.$refs.main, 'macarons')

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '复核申请统计',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            align: 'right'
          },
          left: 15
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['申请数量']
        },
        color: ['#409EFF'],
        xAxis: {
          name: '日期',
          type: 'category',
          data: dataX,
          axisLine: {
            symbol: ['none', 'arrow']
          }
        },
        yAxis: {
          name: '数量',
          type: 'value',
          minInterval: 1,
          // splitNumber: 3,
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          },
          axisLine: {
            symbol: ['none', 'arrow']
          }
        },
        series: [{
          name: '申请数量',
          type: 'bar',
          barWidth: 60,
          data: dataY
        }]
      }

      this.chart.setOption(option)
    },
    setEcHeight() {
      const clientHeight = document.documentElement.clientHeight
      const topHeight = this.$refs.searchContainer.offsetHeight + 80
      if (this.$refs.main) {
        this.$refs.main.style.height = clientHeight - topHeight + 'px'
      }
    },
    onPeriodSelectChange() {
      this.getChartData()
    },
    onDistrictSelectChange() {
      this.getChartData()
    },
    onUsageSelectChange() {
      this.getChartData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.search-container{
  height:45px;
  padding:4px;
  background-color: white;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  overflow: hidden;
  .search-item {
    margin-left: 10px;
    float:left;
  }
  .el-select {
    margin-left: 20px
  }
}
#main {
  min-width: 400px;
  min-height: 300px;
  margin: 15px auto
}
</style>
