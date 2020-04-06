<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <div class="div-button">
            <el-button size="mini" @click="onBackStep" >上一步</el-button>
            <el-button size="mini" type="primary" @click="onRateResultClick" >检验完毕</el-button>
            <el-button size="mini" @click="onResultCancelClick" >取消</el-button>
          </div>
        </el-row>
        <el-tabs ref="tabs" v-model="activeName" type="card" style="margin-left:20px" @tab-click="onTabClick">
          <el-tab-pane label="总体检验" name="总体检验" style="padding-left:20px">
            <RateOverall :form="ztqk" :baseinfo="form" :width="width" />
          </el-tab-pane>
          <el-tab-pane label="用途分组检验" name="用途分组" >
            <RatePrimaryUse :form="ytzl" :baseinfo="form" :width="width" />
          </el-tab-pane>
          <el-tab-pane label="行政区分组检验" name="行政区分组" >
            <RateDistrict :form="xzq" :baseinfo="form" :width="width" />
          </el-tab-pane>
        </el-tabs>
        <el-dialog :visible.sync="dg_rateResult" title="检验结果" width="30%" >
          <el-form ref="editForm" :model="result" label-width="100px" size="small" >
            <el-row>
              <el-col :span="24">
                <el-form-item prop="auditResult" label="审核结果" >
                  <el-select v-model="result.auditResult" style="width:100%;" >
                    <el-option key="3" label="通过" value="3"/>
                    <el-option key="4" label="不通过" value="4"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="审核意见" prop="advice" >
                  <el-input v-model="result.advice" auto-complete="off" rows="6" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer" >
            <el-button @click="onBtnCancelClick">取 消</el-button>
            <el-button type="primary" @click="onBtnComfirmClick('editForm')">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getRatioResult,
  submitResult,
  getRatioTaskById
} from '@/api/ratio'
import RateOverall from '@/views/ratio/RateOverall'
import RatePrimaryUse from '@/views/ratio/RatePrimaryUse'
import RateDistrict from '@/views/ratio/RateDistrict'
export default {
  components: {
    RateOverall,
    RatePrimaryUse,
    RateDistrict
  },
  data() {
    return {
      form: {},
      ztqk: {},
      ytzl: {},
      xzq: {},
      activeName: '总体检验',
      dg_rateResult: false,
      width: '100%',
      result: {
        auditResult: '通过',
        advice: ''
      }
    }
  },
  mounted() {
    this.getRatioTaskById()
    this.getRatioResult('总体检验')
    this.width = document.documentElement.clientWidth * 0.5 + 'px'
  },
  methods: {
    getRatioTaskById() {
      getRatioTaskById(this.$route.query.id).then(response => {
        if (response.code === 200) {
          this.form = response.data
        } else {
          this.$message({ message: '获取数据出错！', type: 'error' })
        }
      })
    },
    // 取消
    onResultCancelClick() {
      this.$router.push({
        name: 'RatioList'
      })
    },
    // 检验完毕
    onRateResultClick() {
      this.dg_rateResult = true
    },
    // 对话框取消
    onBtnCancelClick() {
      this.dg_rateResult = false
    },
    // 标签点击事件
    onTabClick(tab, event) {
      if (event.target.innerText === '总体检验') {
        this.getRatioResult('总体检验')
      }
      if (event.target.innerText === '用途分组检验') {
        this.getRatioResult('用途分组检验')
      }
      if (event.target.innerText === '行政区分组检验') {
        this.getRatioResult('行政区分组检验')
      }
    },
    getRatioResult(type) {
      this.ztqk = {}
      this.ytzl = {}
      this.xzq = {}
      getRatioResult({ id: this.$route.query.id, type: type }).then(response => {
        if (response.code === 200) {
          if (type === '总体检验') {
            this.ztqk = response.data
          } else if (type === '用途分组检验') {
            this.ytzl = response.data
          } else {
            this.xzq = response.data
          }
        } else {
          this.$message({ message: response.msg, type: 'error' })
        }
      })
    },
    // 上一步
    onBackStep() {
      this.$router.push({
        name: 'Paramset',
        query: { id: this.$route.query.id }
      })
    },
    onBtnComfirmClick() {
      let state = ''
      if (this.result.auditResult === '通过') {
        state = 3
      }
      if (this.result.auditResult === '不通过') {
        state = 4
      }
      var data = {
        id: this.$route.query.id,
        state: state,
        advice: this.result.advice
      }
      submitResult(this.$route.query.id, data).then(response => {
        if (response.code === 200) {
          this.$message({ message: '检验成功', type: 'success' })
          this.dg_rateResult = false
          this.$router.push({ name: 'RatioList' })
        } else {
          alert(response.msg)
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.div-button {
  position: absolute;
  top: 29px;
  right: 0px;
  z-index: 999;
}
</style>
