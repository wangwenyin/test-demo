<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <div class="delete-button">
            <el-button v-if="step !== 3 && form.creator === name" type="primary" size="mini" @click="onDeleteClick" >删除</el-button>
          </div>
        </el-row>
        <el-tabs v-model="activeName" type="card" style="margin-left:20px" @tab-click="onTabClick">
          <el-tab-pane label="基本信息" name="first">
            <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
              <el-col :span="24">
                <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">{{ form.name }} </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="row-container">
                <div class="col-item-label">创建人：</div>
                <div class="col-item-label">物业用途：</div>
                <div class="col-item-label">起始日期：</div>
                <div class="col-item-label">审核结果：</div>
                <div class="col-item-label">审核意见：</div>
                <div class="col-item-label">备注：</div>
              </el-col>
              <el-col :span="5" class="row-container">
                <div class="col-item-value">{{ form.creator }}</div>
                <div class="col-item-value">{{ form.property_usage }}</div>
                <div class="col-item-value">{{ form.start_date }}</div>
                <div class="col-item-value">
                  <span v-if="form.state === 1">待审核</span>
                  <span v-if="form.state === 2">待审核</span>
                  <span v-if="form.state === 3">通过</span>
                  <span v-if="form.state === 4">未通过</span>
                </div>
                <div class="col-item-value">{{ form.advice }}</div>
                <div class="col-item-value">{{ form.remark }}</div>
              </el-col>
              <el-col :span="3" class="row-container">
                <div class="col-item-label">创建日期：</div>
                <div class="col-item-label">行政区：</div>
                <div class="col-item-label">结束日期：</div>
                <div class="col-item-label">抽样值：</div>
              </el-col>
              <el-col :span="5" class="row-container">
                <div class="col-item-value">{{ form.create_date }}</div>
                <div class="col-item-value">{{ form.scope }}</div>
                <div class="col-item-value">{{ form.end_date }}</div>
                <div class="col-item-value">{{ form.sample_value }}</div>
              </el-col>
              <el-col :span="4" class="row-container">
                <div class="col-item-label">物业类型：</div>
                <div class="col-item-label">案例来源：</div>
                <div class="col-item-label">抽样方式：</div>
              </el-col>
              <el-col :span="4" class="row-container">
                <div class="col-item-value">{{ form.property_type }}</div>
                <div class="col-item-value">{{ form.case_type }}</div>
                <div class="col-item-value"> {{ form.sample_type }}</div>
              </el-col>
            </el-row>
            <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
              <el-col :span="24">
                <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">处理进度</div>
              </el-col>
            </el-row>
            <el-row style="padding-left:20px">
              <el-col :span="17">
                <el-steps :active="step" :space="500" align-center style="margin-top:30px">
                  <el-step title="参数设定" />
                  <el-step title="比率分析" description="" />
                  <el-step title="审核完毕" description="" />
                </el-steps>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane v-if="form.state!==1" label="分析结果" name="second" >
            <!-- 该任务暂无分析结果 -->
            <!-- <div v-if="noAllAnalResult">该任务暂无分析结果 v-if="analResult"</div> -->
            <div id="result">
              <el-row ref="all" >
                <RateOverall :detail="true" :form="ztqk" :baseinfo="form" :width="width" />
              </el-row>
              <el-row ref="frist" >
                <RatePrimaryUse :detail="true" :form="ytzl" :baseinfo="form" :width="width" />
              </el-row>
              <el-row >
                <RateDistrict :detail="true" :form="xzq" :baseinfo="form" :width="width" />
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'
import { mapGetters } from 'vuex'
import { getRatioTaskById, deleteRatioResult, getRatioResult } from '@/api/ratio'
import RateOverall from '@/views/ratio/RateOverall'
import RatePrimaryUse from '@/views/ratio/RatePrimaryUse'
import RateDistrict from '@/views/ratio/RateDistrict'
export default {
  components: {
    RateOverall,
    RatePrimaryUse,
    RateDistrict
  },
  filters: {
    formatDate(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      form: {},
      step: 0,
      activeName: 'first',
      width: '100%',
      ztqk: {},
      ytzl: {},
      xzq: {},
      noAllAnalResult: false,
      noUsageAnalResult: false,
      noScopeAnalResult: false,
      analResult: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    /* this.getRatioResult() */
    this.getRatioTaskById()
    this.width = document.documentElement.clientWidth * 0.4 + 'px'
  },
  methods: {
    // 标签点击事件
    onTabClick(tab, event) {
      if (event.target.innerText === '分析结果') {
        this.getRatioResult('总体检验')
        this.getRatioResult('用途分组检验')
        this.getRatioResult('行政区分组检验')
      }
    },
    getRatioTaskById() {
      getRatioTaskById(this.$route.query.id).then(response => {
        if (response.code === 200) {
          this.form = response.data
          if (this.form.state === 1) {
            this.step = 1
          } else if (this.form.state === 2) {
            this.step = 2
          } else if (this.form.state === 3 || this.form.state === 4) {
            this.step = 3
          }
        } else {
          this.$message({ message: '获取数据出错！', type: 'error' })
        }
      })
    },
    getRatioResult(type) {
      this.ztqk = {}
      this.ytzl = {}
      this.xzq = {}
      getRatioResult({ id: this.$route.query.id, type: type }).then(response => {
        if (response.code === 200) {
          this.analResult = true
          if (type === '总体检验') {
            this.ztqk = response.data
          } else if (type === '用途分组检验') {
            this.ytzl = response.data
          } else {
            this.xzq = response.data
          }
        } else {
          if (type === '总体检验') {
            this.noAllAnalResult = true
          } else if (type === '用途分组检验') {
            this.noUsageAnalResult = true
          } else {
            this.noScopeAnalResult = true
          }
          this.$message({ message: '该任务暂无分析结果', type: 'error' })
        }
        // this.onTabClick()
      })
    },
    onDeleteClick() {
      this.$confirm('删除操作不可逆，是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRatioResult(this.$route.query.id, { id: this.$route.query.id }).then(response => {
          if (response.code === 200) {
            this.$message({ message: '删除成功', type: 'success' })
            this.$router.push({ name: 'RatioList' })
          } else {
            alert(response.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    selectNav(index, indexPath) {
      document.getElementById('result').style.top = '0px'
      var all = 0
      if (this.$refs.all) {
        all = -this.$refs.all.$el.offsetHeight
      }
      var frist = 0
      if (this.$refs.frist) {
        frist = -this.$refs.frist.$el.offsetHeight
      }
      var second = 0
      if (this.$refs.second) {
        second = -this.$refs.second.$el.offsetHeight
      }
      if (index === '1') {
        document.getElementById('result').style.top = '0px'
      }
      if (index === '2') {
        document.getElementById('result').style.top = all + 'px'
      }
      if (index === '3') {
        document.getElementById('result').style.top = frist + all + 'px'
      }
      if (index === '4') {
        document.getElementById('result').style.top =
          frist + all + second + 'px'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.row-container{
    padding: 10px;
    /* margin-top: 10px; */
}
.col-item-label {
    margin-bottom: 20px;
    color: grey;
    text-align: left;
}
.col-item-value {
    margin-bottom: 20px;
    color: grey;
    height: 18px;
    text-align: left;
     overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}
.delete-button {
  position:absolute;
  top:29px;
  right: 0px;
  z-index: 10;
}
</style>
