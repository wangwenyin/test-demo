<template>
  <div style="margin:10px">
    <el-row :gutter="10">
      <el-col :span="14" :offset="1">
        <table class="table">
          <tr class="tr_title">
            <td colspan="4" class="td">
              <span style="margin-left:20px">参数设置 </span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">估价对象</span>
            </td>
            <td class="td_input">
              <el-input v-model="form.prop_name" class="noborder" size="small" suffix-icon="el-icon-edit"/>
            </td>
            <td class="td">
              <span class="normal">物业用途</span>
            </td>
            <td class="td_input">
              <div style="margin-left:20px;">
                <el-radio v-model="form.house_usage" label="住宅" class="radio-btn">住宅</el-radio>
                <el-radio v-model="form.house_usage" label="非住宅" class="radio-btn">非住宅</el-radio>
              </div>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">建筑面积（m2）</span>
            </td>
            <td class="td_input">
              <!-- <el-input v-model="form.built_in_area" class="noborder" size="small" suffix-icon="el-icon-edit" /> -->
              <el-input-number v-model="form.built_in_area" :min="0" :max="99999" :controls="hasControls" class="noborder" size="small" style="width:100%"/>
            </td>
            <td class="td">
              <span class="normal">经济适用房</span>
            </td>
            <td class="td_input">
              <div style="margin-left:20px;">
                <el-radio v-model="form.afford_house" :label="1" class="radio-btn">是</el-radio>
                <el-radio v-model="form.afford_house" :label="0" class="radio-btn">否</el-radio>
              </div>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">评估单价（元/m2）</span>
            </td>
            <td class="td_input">
              <!-- <el-input v-model="form.each_price" class="noborder" size="small" suffix-icon="el-icon-edit" /> -->
              <el-input-number v-model="form.each_price" :min="0" :max="999999999" :controls="hasControls" class="noborder" size="small" style="width:100%"/>
            </td>
            <td class="td">
              <span class="normal">评估总值（元）</span>
            </td>
            <td class="td_input">
              <!-- <el-input v-model="getTotalPrice" class="noborder" size="small" disabled="true"/> -->
              <el-input-number v-model="getTotalPrice" :min="0" :max="999999999" :controls="hasControls" disabled class="noborder" size="small" style="width:100%"/>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">购买年限</span>
            </td>
            <td class="td_input">
              <div style="margin-left:20px;">
                <el-radio v-model="form.full_two_year" :label="1" class="radio-btn">满2年</el-radio>
                <el-radio v-model="form.full_two_year" :label="0" class="radio-btn">未满2年</el-radio>
              </div>
            </td>
            <td class="td">
              <span class="normal">登记总价（元）</span>
            </td>
            <td class="td_input">
              <!-- <el-input v-model="form.reg_price" class="noborder" size="small" suffix-icon="el-icon-edit" oninput = "value=value.replace(/[^\d]/g,'')"/> -->
              <el-input-number v-model="form.reg_price" :min="0" :max="999999999" :controls="hasControls" class="noborder" size="small" style="width:100%"/>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">税收政策</span>
            </td>
            <td class="td_input">
              <div style="margin-left:20px;">
                <el-radio v-model="form.ordinary_house" :label="1" class="radio-btn">普通住房</el-radio>
                <el-radio v-model="form.ordinary_house" :label="0" class="radio-btn">非普通住房</el-radio>
              </div>
            </td>
            <td class="td">
              <span class="normal">应补地价（元）</span>
            </td>
            <td class="td_input"> <!-- form.landPremium -->
              <!-- <el-input v-model="form.repay_price" class="noborder" size="small" suffix-icon="el-icon-edit" oninput = "value=value.replace(/[^\d]/g,'')"/> -->
              <el-input-number v-model="form.repay_price" :min="0" :max="999999999" :controls="hasControls" class="noborder" size="small" style="width:100%"/>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">权利人性质</span>
            </td>
            <td class="td_input">
              <div style="margin-left:20px;">
                <el-radio v-model="form.owner_attr" label="个人" class="radio-btn">个人</el-radio>
                <el-radio v-model="form.owner_attr" label="企业" class="radio-btn">企业</el-radio>
              </div>
              <!--  <el-input v-model="form.owner_attr" class="noborder" size="small" suffix-icon="el-icon-edit"/> -->
            </td>
            <td class="td">
              <span class="normal">改良投资（元）</span>
            </td>
            <td class="td_input">
              <!-- <el-input v-model="form.improve_fee" class="noborder" size="small" suffix-icon="el-icon-edit" oninput = "value=value.replace(/[^\d]/g,'')"/> -->
              <el-input-number v-model="form.improve_fee" :min="0" :max="999999999" :controls="hasControls" class="noborder" size="small" style="width:100%"/>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="8">
        <table class="table">
          <tr class="tr_title">
            <td colspan="2" class="td">
              <span style="margin-left:20px">测算结果 </span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">【中建银】</span>
            </td>
            <td class="td_input">
              <div class="normal">{{ form.prop_name }}</div>
              <!-- <el-input v-model="form.prop_name" disabled="true" class="noborder" size="small" /> -->
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">面积</span>
            </td>
            <td class="td_input">
              <div class="normal">{{ form.built_in_area }}</div>
              <!-- <el-input v-model="form.built_in_area" class="noborder" disabled="true" size="small" /> -->
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">单价</span>
            </td>
            <td class="td_input">
              <div class="normal">{{ form.each_price }}</div>
              <!-- <el-input v-model="form.each_price" class="noborder" disabled="true" size="small" /> -->
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">总值</span>
            </td>
            <td style="color:red" class="td_input" >
              <div class="stress">{{ getTotalPrice }}</div>
              <!-- <el-input v-model="getTotalPrice" class="noborder stress" disabled="true" size="small" /> -->
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">净值1</span>
            </td>
            <td class="td_input">
              <div class="stress">{{ getNetValue1 }}</div>
              <!-- <el-input v-model="getNetValue1" class="noborder" disabled="true" size="small" /> -->
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">净值2</span>
            </td>
            <td class="td_input">
              <div class="stress">{{ getDYJZ }}</div>
              <!-- <el-input v-model="getDYJZ" class="noborder" disabled="true" size="small" /> -->
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px;">
      <el-col :span="22" :offset="1">
        <table class="table">
          <tr class="tr_title">
            <td colspan="4" class="td">
              <span style="margin-left:20px">抵押净值1测算 </span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">序号</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">项目名称</span>
            </td>
            <td class="td-result">
              <span class="normal">计算结果</span>
            </td>
            <td class="td">
              <span class="normal">计算说明</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">1</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">契税</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getDeedTax }}</span>
            </td>
            <td class="td">
              <span class="normal">转让额×{{ getDeedTaxRate }}%</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">2</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">抵押净值</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getNetValue1 }}</span>
            </td>
            <td class="td">
              <span class="normal">转让额 - 税费合计</span>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px;">
      <el-col :span="22" :offset="1">
        <table class="table">
          <tr class="tr_title">
            <td colspan="4" class="td">
              <span style="margin-left:20px">抵押净值2测算 </span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">序号</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">项目名称</span>
            </td>
            <td class="td-result">
              <span class="normal">计算结果</span>
            </td>
            <td class="td">
              <span class="normal">计算说明</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">1</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">增值税</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getZZS }}</span>
            </td>
            <td class="td">
              <span class="normal">(转让额 - 原购建价) ÷ 1.05 × 5%（免征）</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">2</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">城建税</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getCJS }}</span>
            </td>
            <td class="td">
              <span class="normal">增值税×7%（免征）</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">3</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">教育费附加</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getJYFFJ }}</span>
            </td>
            <td class="td">
              <span class="normal">增值税×5%(教育费附加3%，地方教育费附加2%）（免征）</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">4</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">印花税</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getYHS }}</span>
            </td>
            <td class="td">
              <span class="normal">转让额×0.05%（免征）</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">5</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">土地增值额</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getTDZZE }}</span>
            </td>
            <td class="td">
              <span class="normal">转让额-扣除项目金额</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">6</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">扣除项目金额</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getKCXMJE }}</span>
            </td>
            <td class="td">
              <span class="normal">参照《中华人民共和国土地增值税暂行条例》执行</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">7</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">土地增值税</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getTDZZS }}</span>
            </td>
            <td class="td">
              <span class="normal">土地增值税实行四级超率累进税率。应纳税额=增值额*适用税率-扣除项目金额*速算扣除系数。（免征）</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">8</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">所得税</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getSDS }}</span>
            </td>
            <td class="td">
              <span class="normal">(转让额-原建购价-应补地价-改良投资-各项税费)×20%</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">9</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">税费合计</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getSFHJ }}</span>
            </td>
            <td class="td">
              <span class="normal">⑴+⑵+⑶+⑷+⑺+⑻+⑼</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td-xuhao">
              <span class="normal">10</span>
            </td>
            <td class="td-xmmc">
              <span class="normal">抵押价值</span>
            </td>
            <td class="td-result">
              <span class="normal">{{ getDYJZ }}</span>
            </td>
            <td class="td">
              <span class="normal">转让额-应补地价-税费合计</span>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

  </div>
</template>
<script>
/*
该组件接收的参数方式有两种，一种是props，另一种是query，参数名称为form，必含的属性包括
form: {
  prop_name:'',
  house_usage: '',
  each_price: 0,
  reg_price: 0,
  improve_fee: 0,
  ordinary_house: '1',
  built_in_area: 50,
  repay_price: 0,
  owner_attr: '个人',
  full_two_year: '1'
}
 */
export default {
  name: 'NetValue',
  filters: {
    formatMoney: function(num) {
      return num.toLocaleString('en-US')
    }
  },
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      tax: {
        zzs: 0,
        csjswhf: 0,
        jyffj: 0,
        yhs: 0,
        tdzze: 0,
        kcxmje: 0,
        tdzzs: 0,
        sds: 0
      },
      taskId: '',
      hasControls: false
    }
  },
  computed: {
    // 根据物业用途来判断是住宅还是非住宅
    getHouseUsageType() {
      if (this.form.house_usage === '住宅' && this.form.house_usage === '') {
        return '住宅'
      } else {
        return '非住宅'
      }
    },
    // 根据单价和面积计算总价
    getTotalPrice() {
      console.log()
      return Math.round(this.form.each_price * this.form.built_in_area)
    },
    getDeedTaxRate() {
      if (this.form.owner_attr === '个人') {
        if (this.form.afford_house === '1') {
          return 1.5
        } else {
          if (this.form.house_usage === '住宅') {
            if (this.form.built_in_area <= 90) {
              return 1
            } else {
              return 1.5
            }
          } else {
            return 3
          }
        }
      } else {
        return 3
      }
    },
    // 计算契税
    getDeedTax() {
      return Math.round(this.getTotalPrice * this.getDeedTaxRate / 100)
    },
    // 计算净值1
    getNetValue1() {
      return Math.round(this.getTotalPrice * (1 - this.getDeedTaxRate / 100))
    },
    // 计算增值税
    getZZS() {
      if (this.form.owner_attr === '个人') {
        if (this.form.house_usage === '住宅') {
          if (this.form.full_two_year === '1' && this.form.ordinary_house === '1') { // 个人普通住宅，满2年
            return 0
          } else if (this.form.purchasePeriod === '1' && this.form.ordinary_house === '0') { // 个人非普通住宅， 满2年
            return Math.round((this.getTotalPrice - this.form.reg_price) * 0.05 / 1.05)
          } else { // 个人普通或非普通住宅，未满2年
            return Math.round(this.getTotalPrice * 0.05 / 1.05)
          }
        } else { // 个人非住宅
          return Math.round((this.getTotalPrice - this.form.reg_price) * 0.05 / 1.05)
        }
      } else { // 企业房产
        return Math.round((this.getTotalPrice - this.form.reg_price) * 0.05 / 1.05)
      }
    },
    // 计算城建税
    getCJS() {
      return Math.round(this.getZZS * 0.07)
    },
    // 计算教育费附加
    getJYFFJ() {
      return Math.round(this.getZZS * 0.05)
    },
    // 计算印花税
    getYHS() {
      if (this.form.owner_attr === '企业' || this.form.house_usage !== '住宅') {
        return Math.round(this.getTotalPrice * 0.0005)
      } else {
        return 0
      }
    },
    // 计算扣除项目金额
    getKCXMJE() {
      if (this.form.owner_attr === '个人') {
        if (this.form.full_two_year === '1' && this.form.ordinary_house === '1') {
          return Math.round(parseFloat(this.form.reg_price) + this.getZZS + this.getCJS + this.getJYFFJ + this.getYHS)
        } else if (this.form.full_two_year === '1' && this.form.ordinary_house === '0') {
          return Math.round(parseFloat(this.form.reg_price) + this.getZZS + this.getCJS + this.getJYFFJ + this.getYHS)
        } else {
          return Math.round(parseFloat(this.form.reg_price) + this.form.repay_price + this.form.improve_fee + this.getZZS + this.getCJS + this.getJYFFJ + this.getYHS)
        }
      } else {
        return Math.round(parseFloat(this.form.reg_price) + this.getZZS + this.getCJS + this.getJYFFJ + this.getYHS)
      }
    },
    // 计算土地增值额
    getTDZZE() {
      return Math.round(this.getTotalPrice - this.getKCXMJE)
    },
    // 计算增值率
    getZZL() {
      return Math.abs(this.getTDZZE / this.getKCXMJE).toFixed(2)
    },
    // 计算土地增值税
    getTDZZS() {
      const zzl = this.getZZL
      if (this.form.owner_attr === '个人' && this.form.house_usage === '住宅') {
        return 0
      } else {
        if (zzl <= 0.5) {
          return Math.round(this.getTDZZE * 0.3)
        } else if (zzl > 0.5 && zzl <= 1) {
          return Math.round(this.getTDZZE * 0.4 - this.getKCXMJE * 0.05)
        } else if (zzl > 1 && zzl <= 2) {
          return Math.round(this.getTDZZE * 0.5 - this.getKCXMJE * 0.15)
        } else {
          return Math.round(this.getTDZZE * 0.6 - this.getKCXMJE * 0.35)
        }
      }
    },
    // 计算所得税
    getSDS() {
      if (this.form.owner_attr === '个人') {
        return Math.round((this.getTotalPrice - this.form.reg_price - this.form.repay_price - this.form.improve_fee - this.getZZS - this.getCJS -
          this.getJYFFJ - this.getYHS - this.getTDZZS) * 0.2)
      } else {
        return 0
      }
    },
    // 计算税费合计
    getSFHJ() {
      return this.getZZS + this.getCJS + this.getJYFFJ + this.getYHS + this.getTDZZS + this.getSDS
    },
    // 计算抵押价值
    getDYJZ() {
      return Math.round(this.getTotalPrice - this.getSFHJ - this.form.repay_price)
    }
  },
  mounted() {
    if (this.$route.query) {
      this.initializeData(this.$route.query)
    }
  },
  methods: {
    getFormData() {
      return {
        full_two_year: this.form.full_two_year,
        ordinary_house: this.form.ordinary_house,
        owner_attr: this.form.owner_attr,
        afford_house: this.form.afford_house,
        repay_price: this.form.repay_price,
        improve_fee: this.form.improve_fee,
        deed_tax: this.getDeedTax,
        value_add_tax: this.getZZS + this.getJYFFJ + this.getCJS,
        stamp_tax: this.getYHS,
        land_add_tax: this.getTDZZS,
        income_tax: this.getSDS,
        seller_tax: this.getSFHJ,
        net_worth1: this.getNetValue1,
        net_worth2: this.getDYJZ,
        reg_price: this.form.reg_price
      }
    },
    initializeData(query) {
      console.log(query)
      this.form = {
        prop_name: query.prop_name,
        house_usage: (query.house_usage === '住宅' || query.house_usage === '') ? ('住宅') : '非住宅',
        each_price: query.each_price,
        reg_price: (query.reg_price ? query.reg_price : 0),
        improve_fee: (query.improve_fee ? query.improve_fee : 0),
        ordinary_house: (query.ordinary_house ? query.ordinary_house : 1),
        built_in_area: query.built_in_area,
        repay_price: (query.repay_price ? query.reg_price : 0),
        owner_attr: (query.owner_attr ? query.owner_attr : '个人'),
        full_two_year: (query.full_two_year ? query.full_two_year : 1),
        afford_house: (query.full_two_year ? query.full_two_year : 0)
      }
      console.log(this.form)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    .radio-btn{
      width: 70px;
    }
}
.tr{
    margin-top: 0px;
    margin-bottom: 0px;
}
.td{
    margin: 0px auto 0px auto;
    border: 0.2px solid #c0c4cc;
    text-align: center;
    height: 33px;
}
%cell {
    color:#a89292;
    text-align: center;
    font-size: 15px;
}
.normal {
  @extend %cell
}
.stress {
   @extend %cell;
   color: red;
   font-weight: bold;
}
.tdtext{
    margin-top: 0px;
    margin-bottom: 0px;
    border: 0.2px solid #c0c4cc;
    // width: 40%;
}
.td_input{
    margin-top: 0px;
    margin-bottom: 0px;
    border: 0.2px solid #c0c4cc;
    // width: 20%;
}
.tr_title{
    margin-left: 10px;;
    // margin-bottom: 0px;
    background:#3C3B3F;
    color: white;
    height: 35px;
    .td{
        border: 0.2px solid #c0c4cc;
        text-align: left;
        height: 33px;
    }
}
.td-xuhao {
    width: 10%;
    border: 0.2px solid #c0c4cc;
    text-align: center;
    height: 33px;
}
.td-xmmc {
    width: 20%;
    border: 0.2px solid #c0c4cc;
    text-align: center;
    height: 33px;
}
.td-result {
    width: 20%;
    border: 0.2px solid #c0c4cc;
    text-align: center;
    height: 33px;
}
</style>
<style>
.noborder .el-input__inner {
  border: 0px solid #b2b2b2;
}
</style>
