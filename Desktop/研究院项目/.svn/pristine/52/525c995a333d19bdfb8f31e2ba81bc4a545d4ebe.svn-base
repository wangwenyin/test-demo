<template>
  <el-row style="padding:20px 5px 0 5px" >
    <el-col :span="12" :offset="6">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-row >
          <el-col :span="24">
            <el-form-item label="任务名称：" size="small" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="物业类型：" prop="property_type">
              <el-radio-group v-model="form.property_type">
                <el-radio label="房产" />
                <el-radio label="土地" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="物业用途：" prop="property_usage">
              <el-checkbox :indeterminate="wyyt_isIndeterminate" v-model="wyyt_checkAll" @change="wyyt_handleCheckAllChange">全部</el-checkbox>
              <el-checkbox-group v-model="form.property_usage" @change="wyyt_handleCheckedChange">
                <el-checkbox v-for="item in ytzlOptions" :label="item" :key="item">{{ item }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="行政区：" prop="scope">
              <el-checkbox :indeterminate="xzq_isIndeterminate" v-model="xzq_checkAll" @change="xzq_handleCheckAllChange">全市</el-checkbox>
              <el-checkbox-group v-model="form.scope" @change="xzq_handleCheckedChange">
                <el-checkbox v-for="xzq in xzqOptions" :label="xzq" :key="xzq">{{ xzq }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="案例来源：" prop="case_type">
              <el-checkbox-group v-model="form.case_type">
                <el-checkbox v-for="item in allyOptions" :label="item" :key="item">{{ item }}案例</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="起止日期：" required>
              <el-col :span="10">
                <el-form-item prop="start_date">
                  <el-date-picker v-model="form.start_date" type="date" size="small" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="2">&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;</el-col>
              <el-col :span="10">
                <el-form-item prop="end_date">
                  <el-date-picker v-model="form.end_date" type="date" size="small" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="20">
            <el-form-item label="案例概况：">
              <span>{{ context }}</span>
            </el-form-item>
          </el-col>
          <el-button v-if="context !==''" type="primary" size="small" @click="onViewAllClick()">查看</el-button>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="抽样方式：" prop="sample_type">
              <el-radio-group v-model="form.sample_type" style="margin-top: -10px;">
                <el-radio label="按数量抽取" >按数量抽取:
                  <el-input-number v-model="number" size="small" controls-position="right" style="margin-left:15px" />&nbsp;&nbsp;宗&nbsp;&nbsp;&nbsp;&nbsp;
                </el-radio>
                <el-radio label="按百分比抽取" style="margin-top:10px;margin-left:1px">按百分比抽取:
                  <el-input-number v-model="percent" size="small" controls-position="right" />&nbsp;&nbsp;%
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="form.remark" auto-complete="off" rows="4" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button size="small" class="row-button" @click="onCancelClick">取消</el-button>
              <el-button size="small" class="row-button" @click="onSaveClick('form', 1)">保存</el-button>
              <el-button type="primary" size="small" class="row-button" @click="onSaveClick('form', 2)" >下一步</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import {
  saveRatioTasks,
  getRatioTaskById,
  getCaseSurvey,
  computeRatioResult
} from '@/api/ratio'
import { getDictionary } from '@/api/common'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      ytzlOptions: [], // 用途主类下拉选项
      xzqOptions: [],
      allyOptions: ['交易', '挂牌', '估价', '调查'], // 案例来源 下拉选项
      number: 3000,
      percent: 3,
      wyyt_checkAll: false,
      wyyt_isIndeterminate: true,
      xzq_checkAll: false,
      xzq_isIndeterminate: true,
      wyytCount: 0,
      xzqCount: 0,
      context: '',
      form: {
        name: '',
        property_type: '房产',
        property_usage: ['住宅'],
        scope: ['福田区', '宝安区'],
        case_type: ['交易'],
        start_date: '',
        end_date: '',
        sample_type: '按数量抽取',
        sample_value: null,
        creator: '',
        remark: ''
      },
      case: {},
      params: null,
      rules: {
        name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        start_date: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        end_date: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        property_usage: [
          {
            required: true,
            message: '请至少选择一个物业用途',
            trigger: 'change'
          }
        ],
        scope: [
          { required: true, message: '请至少选择一个行政区', trigger: 'change' }
        ],
        case_type: [
          {
            required: true,
            message: '请至少选择一个案例来源',
            trigger: 'change'
          }
        ],
        sample_type: [
          { required: true, message: '请选择抽样方式', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  watch: {
    'form.property_usage'(val) {
      this.case.property_usage = val.toString()
      this.getCaseSurvey()
    },
    /*  */
    'form.case_type'(val) {
      this.case.case_type = val.toString()
      this.getCaseSurvey()
    },
    'form.scope'(val) {
      this.case.scope = val.toString()
      this.getCaseSurvey()
    },
    'form.start_date'(val) {
      this.getCaseSurvey()
    },
    'form.end_date'(val) {
      this.getCaseSurvey()
    },
    'form.property_type'(val) {
      this.getCaseSurvey()
    }
  },
  mounted() {
    this.getOption()
    if (this.$route.query.id) {
      this.getRatioTaskById()
    }
  },
  methods: {
    onViewAllClick() {
      this.getSaveParams()
      this.params.property_usage = this.form.property_usage.join(',')
      this.params.scope = this.form.scope.join(',')
      this.params.case_type = this.form.case_type.join(',')
      const routerData = {
        name: 'CaseSearch',
        query: { caller: 'ratio', baseinfo: this.params }
      }
      this.$router.push(routerData)
    },
    getSaveParams() {
      const params = {
        name: this.form.name,
        property_type: this.form.property_type,
        start_date: this.form.start_date,
        end_date: this.form.end_date,
        sample_type: this.form.sample_type,
        remark: this.form.remark
      }
      this.params = params
    },
    getRatioTaskById() {
      getRatioTaskById(this.$route.query.id).then(response => {
        if (response.code === 200) {
          this.form = response.data
          this.form.property_usage = response.data.property_usage.split(',')
          this.form.scope = response.data.scope.split(',')
          this.form.case_type = response.data.case_type.split(',')
          if (this.form.sample_type === '按数量抽取') {
            this.number = this.form.sample_value
          } else {
            this.percent = this.form.sample_value
          }
        }
      })
    },
    onCancelClick() {
      this.$router.push({ name: 'RatioList' })
    },
    computeRatioResult(val) {
      computeRatioResult(val, { id: val }).then(response => {
        if (response.code === 200) {
          this.$router.push({
            name: 'Rateanal', query: { id: val }})
        } else {
          alert(response.msg)
        }
      })
    },
    onSaveClick(formName, state) {
      this.getSaveParams()
      const now = new Date()
      const create_date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      if (this.$route.query.id) {
        this.params.id = this.$route.query.id
      } else {
        this.params.creator = this.name
        this.params.create_date = parseTime(create_date, '{y}-{m}-{d}')
      }
      this.params.state = state
      this.params.property_usage = this.form.property_usage.join(',')
      this.params.scope = this.form.scope.join(',')
      this.params.case_type = this.form.case_type.join(',')
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.sample_type === '按数量抽取') {
            this.params.sample_value = this.number
          } else {
            this.params.sample_value = this.percent
          }
          saveRatioTasks(this.params).then(response => {
            if (response.code === 200) {
              if (state === 1) { // 保存
                this.$message({ message: '保存成功', type: 'success' })
                this.$router.push({ name: 'RatioList' })
              } else { // 下一步
                this.$message({ message: '提交成功', type: 'success' })
                this.computeRatioResult(response.id)
              }
            } else {
              alert(response.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    wyyt_handleCheckAllChange(val) {
      this.form.property_usage = val ? this.ytzlOptions : []
      this.wyyt_isIndeterminate = false
    },
    wyyt_handleCheckedChange(value) {
      this.wyytCount = value.length
      this.wyyt_checkAll = this.wyytCount === this.ytzlOptions.length
      this.wyyt_isIndeterminate =
        this.wyytCount > 0 && this.wyytCount < this.ytzlOptions.length
    },
    xzq_handleCheckAllChange(val) {
      this.form.scope = val ? this.xzqOptions : []
      this.xzq_isIndeterminate = false
    },
    xzq_handleCheckedChange(value) {
      this.xzqCount = value.length
      this.xzq_checkAll = this.xzqCount === this.xzqOptions.length
      this.xzq_isIndeterminate =
        this.xzqCount > 0 && this.xzqCount < this.xzqOptions.length
    },
    // 获取案例概况
    getCaseSurvey() {
      // 只有所有参数都具备时才调接口，避免出现多次调接口失败的问题
      /* console.log(this.form.type)
      console.log(this.form.usage)
      */
      if (this.case.case_type && this.form.start_date && this.form.end_date && this.case.scope && this.case.property_usage && this.form.property_type) {
        const params = {
          case_type: this.case.case_type,
          start_date: this.form.start_date,
          end_date: this.form.end_date,
          scope: this.case.scope,
          property_usage: this.case.property_usage,
          property_type: this.form.property_type,
          type: '案例概况'
        }
        getCaseSurvey(params).then(response => {
          this.context = response.data.context
        })
      }
    },
    // 获取下拉选项
    getOption() {
      getDictionary('用途主类').then(response => {
        this.ytzlOptions = response.data
      })
      getDictionary('行政区').then(response => {
        this.xzqOptions = response.data
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.row-button {
  float: right;
  margin-left: 10px;
  margin-top: 3px;
}
</style>
