<template>
  <div style="margin:10px">
    <el-row :gutter="10">
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">估价对象</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">  <el-input v-model="form.prop_name" class="el-input--noborder" size="small" readonly/></span></td>
            <td class="table-form__col w10"> <span class="table-form__col__text">地址</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"> <el-input v-model="form.address" class="el-input--noborder" size="small" readonly/></span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">建筑面积</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input v-model="form.built_in_area" class="el-input--noborder" size="small" readonly/></span></td>
            <td class="table-form__col w10"><span class="table-form__col__text">物业用途</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"> <el-input v-model="form.prop_usage" class="el-input--noborder" size="small" readonly/></span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">出租方</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"> <div style="margin-left:20px;">
              <el-radio v-model="form.lessor_type" label="单位" class="radio-btn">单位</el-radio>
              <el-radio v-model="form.lessor_type" label="个人" class="radio-btn">个人</el-radio>
            </div></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">房产原值</span></td>
            <td class="table-form__col"><span class="table-form__col__text"><el-input-number v-model="form.original_value" class="el-input--noborder" size="small" /></span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">土地使用年限</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"> <el-input-number v-model="form.total_term" class="el-input--noborder" size="small"/></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">土地取得日期</span></td>
            <td class="table-form__col"><span class="table-form__col__text">
              <el-date-picker v-model="form.obtain_date" class="el-input--noborder" style="width:100%;" size="small" type="date" value-format="yyyy-MM-dd" placeholder="起始日期" />
            </span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">剩余使用年限</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input v-model="form.left_term" class="el-input--noborder" size="small" readonly/></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">年租金</span></td>
            <td class="table-form__col"><span class="table-form__col__text"> <el-input v-model="form.gross_rent" class="el-input--noborder" size="small" /></span></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row__title">
            <td colspan="4" class="table-form__col__title"><span style="margin-left:20px;">求取年净租金收益 </span>
            </td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">项目名称</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">计算结果</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">费用比率</span></td>
            <td class="table-form__col"><span class="table-form__col__text">计算说明</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">空置率</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.vacancy_rate" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">区域或项目内部的平均出租空置率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">租赁押金月份</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getMonth_deposit }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.month_deposit" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">以两个月的租赁押金 × 一年期存款利率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">租赁押金收益</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getDeposit_income }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.deposit_income" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">房产税</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getHouse_tax }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.house_tax" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">经营自用：房产原值 × 70% × 1.2%；出租房屋：房产租金收入 × 12%</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">增值税</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getValue_added_tax }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.value_added_tax" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">[含税销售额/(1 + 5%)]×5%</span></td>
          </tr>
          <tr class="table-form__row"><td class="table-form__col w10"><span class="table-form__col__text">城建维护税</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getConstruct_fee }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.construct_fee" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">增值税 × 7%</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">教育费附加</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getEducation_fee }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.education_fee " class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">增值税 × 5%</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">印花税</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getStamp_tax }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.stamp_tax" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">年收入 × 0.1%</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">维修费</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getUpkeep_fee }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.upkeep_fee" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">年收入 × 2%</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">管理费</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getMang_fee }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.mang_fee" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">年收入 × 3%</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">保险费</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getInsurance_fee }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.insurance_fee" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">房屋重置成本或房屋原值 × 0.2%</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">年净租金收益</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getNet_rent }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.net_rent" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col"><span class="table-form__col__text">（年租金收益 - 运营费用 ） ×  空置率</span></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row__title">
            <td colspan="6" class="table-form__col__title"><span style="margin-left:20px">求取报酬率 -- 累加法 </span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w16"><span class="table-form__col__text">无风险报酬率</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">投资风险补偿率</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">管理负担补偿率</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">缺乏流动性补偿率</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">易于获得融资的优惠率</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">所得税抵扣的优惠率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w16"><span class="table-form__col__text">  <el-input-number v-model="form.free_risk" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"><el-input-number v-model="form.invest_risk" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"><el-input-number v-model="form.mang_burden" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"><el-input-number v-model="form.lack_liquidity" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"><el-input-number v-model="form.easily_financing" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"><el-input-number v-model="form.tax_deduction" class="el-input--noborder" size="small" /></span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w16"><span class="table-form__col__text"> 报酬率</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">{{ form.return_rate }}</span></td>
            <td class="table-form__col" colspan="4"><span class="table-form__col__text">报酬率 = 无风险报酬率＋投资风险补偿＋管理负担补偿＋缺乏流动性补偿－易于获得融资的优惠率 - 所得税抵扣的优惠率</span></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row__title">
            <td colspan="6" class="table-form__col__title"><span style="margin-left:20px">求取收益价值</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w16"><span class="table-form__col__text">年净租金收益</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">报酬率</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">剩余收益年限</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"/><span/></td>
            <td class="table-form__col w16"><span class="table-form__col__text"/></td>
            <td class="table-form__col w16"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w16"><span class="table-form__col__text">  {{ getNet_rent }} </span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"> {{ form.return_rate }}</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"> {{ form.left_term }}</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text"/></td>
            <td class="table-form__col w16"><span class="table-form__col__text"/></td>
            <td class="table-form__col w16"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w16"><span class="table-form__col__text"> 收益价值</span></td>
            <td class="table-form__col w16"><span class="table-form__col__text">{{ form.income_value }}</span></td>
            <td class="table-form__col " colspan="4"><span class="table-form__col__text">报酬率 = 无风险报酬率＋投资风险补偿＋管理负担补偿＋缺乏流动性补偿－易于获得融资的优惠率 - 所得税抵扣的优惠率</span></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row v-if="!detail" style="margin-top:20px">
      <el-col :span="24">
        <el-button v-if="editEnabled" size="small" class="btn--right" @click="onSubmitClick(false)">保存</el-button>
        <el-button v-if="editEnabled" size="small" class="btn--right" type="primary" @click="onSubmitClick(true)">提交</el-button>
        <el-button v-if="editEnabled" size="small" class="btn--right" type="primary" @click="onPreviousStepClick">上一步</el-button>
      </el-col>
    </el-row>
    <el-row v-else style="margin-top:20px;margin-bottom:20px;">
      <el-col :span="24">
        <el-button size="small" style=" float:right; margin-right:70px;" type="primary" @click="onBackClick">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getIncome, submitIncome, gotoback } from '@/api/singleapp'
export default {
  data() {
    return {
      form: {},
      taskId: '',
      detail: false,
      editEnabled: true
    }
  },
  computed: {
    // 公式说明：
  // P 年租金 this.form.gross_rent
  // X：建筑面积  this.form.built_in_area
  // Y：房产原值 this.form.original_value

    // 计算租赁押金月份A=P*a/12
    // a: month_deposit
    getMonth_deposit() {
      return Math.round(this.form.gross_rent * this.form.month_deposit / 12)
    },
    // 计算租赁押金收益B=A*b=P*a*b/12
    // b: deposit_income
    getDeposit_income() {
      return Math.round(this.form.gross_rent * this.form.month_deposit * this.form.deposit_income / 12)
    },
    // 计算房产税C=P*(1-Z)*c
    // c:house_tax
    getHouse_tax() {
      return Math.round(this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.house_tax)
    },
    // 计算增值税D=P*(1-Z)*d
    // d:value_added_tax
    getValue_added_tax() {
      return Math.round(this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.value_added_tax)
    },
    // 计算城市建设维护费E=D*e
    // e:construct_fee
    getConstruct_fee() {
      return Math.round((this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.value_added_tax) * this.form.construct_fee)
    },
    //	计算教育费F=D*f
    // f:education_fee
    getEducation_fee() {
      return Math.round((this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.value_added_tax) * this.form.education_fee)
    },
    // 计算印花税G=P*(1-Z)*g
    // g:stamp_tax
    getStamp_tax() {
      return Math.round(this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.stamp_tax)
    },
    // 计算维修费H=P*(1-Z)*h
    // h:upkeep_fee
    getUpkeep_fee() {
      return Math.round(this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.upkeep_fee)
    },
    // 计算管理费I=P*(1-Z)*i
    // i:mang_fee
    getMang_fee() {
      return Math.round(this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.mang_fee)
    },
    // 计算保险费J=Y*j/X
    // j:insurance_fee
    getInsurance_fee() {
      return Math.round(this.form.original_value * this.form.insurance_fee / this.form.built_in_area)
    },
    // 计算年净租金收益K=P*(1-Z)+B-C-D-E-F-G-H-I-J
    getNet_rent() {
      return Math.round(this.form.gross_rent * (1 - this.form.vacancy_rate) +
      (this.form.gross_rent * this.form.month_deposit * this.form.deposit_income / 12) -
      (this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.house_tax) -
      (this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.value_added_tax) -
      (this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.value_added_tax * this.form.construct_fee) -
      (this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.value_added_tax * this.form.education_fee) -
      (this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.stamp_tax) -
      (this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.upkeep_fee) -
      (this.form.gross_rent * (1 - this.form.vacancy_rate) * this.form.mang_fee) -
      (this.form.original_value * this.form.insurance_fee / this.form.built_in_area))
    }
  },
  watch: {
    // 计算剩余使用年限
    'form.total_term'(val) {
      this.form.left_term = val - (new Date().getFullYear() - new Date(this.form.obtain_date).getFullYear())
    },
    'form.obtain_date'(val) {
      this.form.left_term = this.form.total_term - (new Date().getFullYear() - new Date(val).getFullYear())
    },
    // 计算报酬率
    // 报酬率 = 无风险报酬率＋投资风险补偿＋管理负担补偿＋缺乏流动性补偿－易于获得融资的优惠率 - 所得税抵扣的优惠率
    'form.free_risk'(val) {
      this.form.return_rate = val + this.form.invest_risk + this.form.mang_burden + this.form.lack_liquidity - this.form.easily_financing - this.form.tax_deduction
    },
    'form.invest_risk'(val) {
      this.form.return_rate = this.form.free_risk + val + this.form.mang_burden + this.form.lack_liquidity - this.form.easily_financing - this.form.tax_deduction
    },
    'form.mang_burden'(val) {
      this.form.return_rate = this.form.free_risk + this.form.invest_risk + val + this.form.lack_liquidity - this.form.easily_financing - this.form.tax_deduction
    },
    'form.lack_liquidity'(val) {
      this.form.return_rate = this.form.free_risk + this.form.invest_risk + this.form.mang_burden + val - this.form.easily_financing - this.form.tax_deduction
    },
    'form.easily_financing'(val) {
      this.form.return_rate = this.form.free_risk + this.form.invest_risk + this.form.mang_burden + this.form.lack_liquidity - val - this.form.tax_deduction
    },
    'form.tax_deduction'(val) {
      this.form.return_rate = this.form.free_risk + this.form.invest_risk + this.form.mang_burden + this.form.lack_liquidity - this.form.easily_financing - val
    },
    // 计算收益价值
    'getNet_rent'(val) {
      this.form.income_value = val * (1 - 1 / Math.pow((1 + this.form.return_rate), this.form.left_term)) / this.form.return_rate
    },
    'form.return_rate'(val) {
      this.form.income_value = this.getNet_rent * (1 - 1 / Math.pow((1 + val), this.form.left_term)) / val
    },
    'form.left_term'(val) {
      this.form.income_value = this.getNet_rent * (1 - 1 / Math.pow((1 + this.form.return_rate), val)) / this.form.return_rate
    }
  },
  mounted() {
    this.taskId = this.$route.query.taskId
    if (this.$route.query.detail === true) {
      this.detail = true
    }
    if (this.taskId) {
      this.getTaskInfo()
    } else {
      this.$notify({
        title: '错误',
        message: '缺少任务编号！',
        type: 'error',
        duration: 2000
      })
    }
  },
  methods: {
    // 获取任务信息
    getTaskInfo() {
      getIncome(this.taskId).then(response => {
        if (response.code === 200) {
          this.form = response.data
        } else {
          this.$notify({
            title: '获取信息失败',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 保存提交
    onSubmitClick(val) {
      this.form.submit = val
      submitIncome(this.form).then(response => {
        if (response.code === 200) {
          if (val) {
            this.$message({ message: '提交成功', type: 'success' })
          } else {
            this.$message({ message: '保存成功', type: 'success' })
          }
          if (response.status === '报告撰写') {
            const routerData = {
              name: 'SingleappReport',
              query: { taskId: this.taskId, status: '报告撰写' }
            }
            this.$router.push(routerData)
          }
        } else {
          alert(response.msg)
        }
      })
    },
    // 上一步
    onPreviousStepClick() {
      gotoback(this.taskId).then(response => {
        if (response.code === 200) {
          this.$router.push({ name: 'SingleappAdjustment', query: { taskId: this.taskId, method: response.method }})
        } else {
          alert(response.msg)
        }
      })
    },
    // 返回按钮
    onBackClick() {
      this.$router.push({ name: 'SingleTaskDetail', query: { id: this.taskId }})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table-form {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  .radio-btn{
    width: 70px;
  }
}
.table-form__row{
    margin-top: 0px;
    margin-bottom: 0px;
}
.table-form__row__title{
    margin-left: 10px;
    background:#3C3B3F;
    color: white;
    height: 35px;
    .td{
        border: 0.2px solid #c0c4cc;
        text-align: left;
        height: 33px;
    }
}
.table-form__col{
    margin: 0px auto 0px auto;
    border: 0.2px solid #c0c4cc;
    text-align: center;
    height: 33px;
}
 .table-form__col.w10{
   width: 10%;
  }
 .table-form__col.w16{
    width: 16.6%;
  }
 .table-form__col.w20{
    width: 20%;
  }
.table-form__col__title{
    margin: 0px auto 0px auto;
    border: 0.2px solid #c0c4cc;
    text-align: left;
    height: 33px;
}
.btn--right{
  float: right;
  margin-right:20px;
}
.table-form__col__text {
  color:#a89292;
    text-align: center;
    font-size: 15px;
}
.el-input-number {
    width: 100%;
}
</style>
<style>
.el-input--noborder .el-input__inner {
  border: 0px solid #b2b2b2;
  width: 100%;
  text-align: center
}
</style>
