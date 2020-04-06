<template>
  <div class="margin10">
    <el-row v-if="!detail">
      <el-col :span="24">
        <div class="title" />
      </el-col>
    </el-row>
    <table class="table">
      <tr class="tr_title">
        <td class="td">
          <span class="normal">因素名称:</span>
        </td>
        <td class="td">
          <span class="normal">评估对象</span>
        </td>
        <td v-for="o in (num)" :span="24/(num)" :key="o" class="td" style="height:35px" >
          <span class="normal" style="margin-top: 8px;">可比实例{{ o }}</span>
        </td>
        <td class="td_e" />
      </tr>
      <tr v-for="o in basic" :key="o.para_id" class="tr" > <!-- v-if="o.used" -->
        <td class="td">
          <span class="normal">{{ o.description }}</span>
        </td>
        <td class="td">
          <textarea v-model="o.property.content" class="textarea" size="small" readonly />
        </td>
        <td v-for="i in o.comparables" :key="i" :span="24/num" class="td" >
          <textarea v-model="i.content" class="textarea" size="small" readonly />
        </td>
        <td class="td_e" />
      </tr>
      <tr id="1f" class="tr_title" >
        <td colspan="10" class="td">
          <span class="title-small">交易状况 </span>
          <el-radio-group v-model="jyzk" size="mini" class="rad">
            <el-radio-button :label="true">说明表</el-radio-button>
            <el-radio-button :label="false">指数表</el-radio-button>
          </el-radio-group>
          <el-button v-if="!detail" class="btn-tj" type="text" @click="addfactor('sale')">添加</el-button>
        </td>
      </tr>
      <tr v-for="o in sale" :key="o.para_id" class="tr" > <!-- v-if="o.used" -->
        <td class="td">
          <span class="normal">{{ o.description }}</span>
        </td>
        <td v-if="jyzk" class="td" >
          <el-date-picker v-if="o.description==='交易时间'" v-model="o.property.content" disabled="true" size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;" />
          <el-input v-else v-model="o.property.content" class="noborder" size="small" disabled="true" />
        </td>
        <td v-if="!jyzk" class="td">
          <el-input v-model="o.property.index" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="i in o.comparables" :key="i" :span="24/num" class="td" > <!-- v-if="jyzk" -->
          <el-date-picker v-if="o.description==='交易时间'" v-model="i.content" size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" disabled="true" style="width: 100%;" />
          <el-input v-else v-model="i.content" class="noborder" size="small" disabled="true" />
        </td>
        <td v-for="i in o.comparables" :key="i" :span="24/num" class="td" > <!-- v-if="!jyzk" -->
          <el-input-number v-model="i.index" :min="80" :max="120" class="noborder" size="small" @change="com(total_sale,sale)" />
        </td>
        <td class="td_e" @click="com(total_sale,sale)">
          <i v-if="!detail" class="el-icon-delete" @click="o.used = false" />
        </td>
      </tr>
      <tr v-if="!jyzk" class="tr" >
        <td class="td">
          <span class="normal">合计:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td" >
          <el-input v-model="total_sale.comparables[o-1]" :disabled="true" class="noborder" size="small" />
        </td>
        <td class="td_e" />
      </tr>
      <tr id="2f" class="tr_title" >
        <td colspan="10" class="td">
          <span class="title-small">区位状况 </span>
          <el-radio-group v-model="qwzk" size="mini" class="rad">
            <el-radio-button :label="true">说明表</el-radio-button>
            <el-radio-button :label="false">指数表</el-radio-button>
          </el-radio-group>
          <el-button v-if="!detail" class="btn-tj" type="text" @click="addfactor('location')">添加</el-button>
        </td>
      </tr>
      <tr v-for="o in location" :key="o.para_id" class="tr" ><!--  v-if="o.used" -->
        <td class="td">
          <span class="normal">{{ o.description }}</span>
        </td>
        <td v-if="qwzk" class="td" >
          <textarea v-model="o.property.content" class="textarea" size="small" />
        </td>
        <td v-if="!qwzk" class="td" >
          <el-input v-model="o.property.index" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="i in o.comparables" :key="i" :span="24/num" class="td" >
          <textarea v-if="qwzk" v-model="i.content" class="textarea" size="small" />
          <el-input-number v-if="!qwzk" v-model="i.index" :min="80" :max="120" class="noborder" size="small" @change="com(total_location,location)" />
        </td>
        <td class="td_e" @click="com(total_location,location)">
          <i v-if="!detail" class="el-icon-delete" @click="o.used = false" />
        </td>
      </tr>
      <tr v-if="!qwzk" class="tr">
        <td class="td">
          <span class="normal">合计:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" class="noborder" size="small" readonly />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td" >
          <el-input v-model="total_location.comparables[o-1]" class="noborder" size="small" readonly />
        </td>
        <td class="td_e" />
      </tr>
      <tr id="3f" class="tr_title" >
        <td colspan="10" class="td">
          <span class="title-small">权益状况 </span>
          <el-radio-group v-model="qyzk" size="mini" class="rad">
            <el-radio-button :label="true">说明表</el-radio-button>
            <el-radio-button :label="false">指数表</el-radio-button>
          </el-radio-group>
          <el-button v-if="!detail" class="btn-tj" type="text" @click="addfactor('right')">添加</el-button>
        </td>
      </tr>
      <tr v-for="o in right" :key="o.para_id" class="tr"><!-- v-if="o.used" -->
        <td class="td">
          <span class="normal">{{ o.description }}</span>
        </td>
        <td v-if="qyzk" class="td" >
          <textarea v-model="o.property.content" class="textarea" size="small" />
        </td>
        <td v-if="!qyzk" class="td" >
          <el-input-number v-model="o.property.index" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="i in o.comparables" :key="i" :span="24/num" class="td" >
          <textarea v-if="qyzk" v-model="i.content" class="textarea" size="small" />
          <el-input-number v-if="!qyzk" v-model="i.index" :min="80" :max="120" class="noborder" size="small" @change="com(total_right,right)" />
        </td>
        <td class="td_e" @click="com(total_right,right)">
          <i v-if="!detail" class="el-icon-delete" @click="o.used = false" />
        </td>
      </tr>
      <tr v-if="!qyzk" class="tr" >
        <td class="td">
          <span class="normal">合计:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" class="noborder" size="small" readonly />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td" >
          <el-input v-model="total_right.comparables[o-1]" class="noborder" size="small" readonly />
        </td>
        <td class="td_e" />
      </tr>
      <tr id="4f" class="tr_title" >
        <td colspan="10" class="td">
          <span class="title-small">实物状况 </span>
          <el-radio-group v-model="swzk" size="mini" class="rad">
            <el-radio-button :label="true">说明表</el-radio-button>
            <el-radio-button :label="false">指数表</el-radio-button>
          </el-radio-group>
          <el-button v-if="!detail" class="btn-tj" type="text" @click="addfactor('object')">添加</el-button>
        </td>
      </tr>
      <tr v-for="o in object" :key="o.para_id" class="tr" > <!-- v-if="o.used" -->
        <td class="td">
          <span class="normal">{{ o.description }}</span>
        </td>
        <td v-if="swzk" class="td" >
          <textarea v-model="o.property.content" class="textarea" size="small" />
        </td>
        <td v-if="!swzk" class="td" >
          <el-input-number :disabled="true" v-model="o.property.index" class="noborder" size="small" />
        </td>
        <td v-for="i in o.comparables" :key="i" :span="24/num" class="td" >
          <textarea v-if="swzk" v-model="i.content" class="textarea" size="small" />
          <el-input-number v-if="!swzk" v-model="i.index" :min="80" :max="120" class="noborder" size="small" @change="com(total_object,object)" />
        </td>
        <td class="td_e" @click="com(total_object,object)">
          <i v-if="!detail" class="el-icon-delete" @click="o.used = false" />
        </td>
      </tr>
      <tr v-if="!swzk" class="tr" >
        <td class="td">
          <span class="normal">合计:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" class="noborder" size="small" readonly />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td">
          <el-input v-model="total_object.comparables[o-1]" class="noborder" size="small" readonly />
        </td>
        <td class="td_e" />
      </tr>
      <tr class="tr_title">
        <td colspan="10" class="td">
          <span class="title-small">比准价格 </span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal">交易状况调整:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td" >
          <el-input-number v-model="total_sale.comparables[o-1]" :disabled="true" class="noborder" size="small" />
        </td>
        <td class="td_e">
          <a href="#1f">
            <el-button size="small" type="text">跳转</el-button>
          </a>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal">区位状况调整:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td" >
          <el-input-number v-model="total_location.comparables[o-1]" :disabled="true" class="noborder" size="small" />
        </td>
        <td class="td_e">
          <a href="#2f">
            <el-button size="small" type="text">跳转</el-button>
          </a>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal">权益状况调整:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td" >
          <el-input-number v-model="total_right.comparables[o-1]" :disabled="true" class="noborder" size="small" />
        </td>
        <td class="td_e">
          <a href="#3f">
            <el-button size="small" type="text">跳转</el-button>
          </a>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal">实物状况调整:</span>
        </td>
        <td class="td">
          <el-input v-model="defaultvalue" :disabled="true" class="noborder" size="small" />
        </td>
        <td v-for="o in num" :span="24/num" :key="o" class="td" >
          <el-input-number v-model="total_object.comparables[o-1]" :disabled="true" class="noborder" size="small" />
        </td>
        <td class="td_e">
          <a href="#4f">
            <el-button size="small" type="text">跳转</el-button>
          </a>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal">比准价格（元/m²）</span>
        </td>
        <td class="td">
          <el-input class="noborder" size="small" readonly />
        </td>
        <td v-for="o in num" :key="o" :span="24/num" class="td" >
          <el-input v-model="price_bz.comparables[o-1]" readonly class="noborder" size="small" />
        </td>
        <td class="td_e" />
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal">评估价格（元/m²）</span>
        </td>
        <td class="td">
          <el-input class="noborder" size="small" readonly />
        </td>
        <td :colspan="num" class="td" >
          <el-input v-model="price" class="noborder" size="small" readonly />
        </td>
        <td class="td_e" />
      </tr>
    </table>
    <el-row v-if="!detail">
      <el-col :span="24">
        <el-button size="small" class="btn_l" @click="cancel">取消</el-button>
        <el-button size="small" class="btn_l" @click="save">保存</el-button>
        <el-button size="small" class="btn_l" type="primary" @click="nextstep">提交</el-button>
        <el-button size="small" class="btn_l" type="primary" @click="setstept(1)">上一步</el-button>
      </el-col>
    </el-row>
    <el-dialog :title="'添加'+ type+'因素' " :visible.sync="dialog">
      <div v-for="o in factor" :key="o.para_id" class="fa">
        <el-checkbox v-if="!o.used" v-model="o.used" :label="o.description" class="ck" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="add(factor_total,factor)">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getappraisal, getnousefactor, editappraisal } from '@/api/singleapp'
import { formatDate } from '@/utils/date'
export default {
  props: {
    taskid: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 3
    },
    detail: {
      type: Boolean,
      default: false
    },
    isIncome: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      jyzk: true,
      qwzk: true,
      qyzk: true,
      swzk: true,
      type: '',
      factor: [],
      basic: [],
      location: [],
      right: [],
      object: [],
      sale: [],
      defaultvalue: 100,
      factor_total: {
        comparables: [100, 100, 100, 100, 100]
      },
      dialog: false,
      total_location: {
        comparables: [100, 100, 100, 100, 100]
      },
      total_right: {
        comparables: [100, 100, 100, 100, 100]
      },
      total_object: {
        comparables: [100, 100, 100, 100, 100]
      },
      total_sale: {
        comparables: [100, 100, 100, 100, 100]
      },
      price_bz: {
        comparables: [100, 100, 100, 100, 100]
      },
      price: 0
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.Getappraisal()
    this.com(this.total_location, this.location)
    this.com(this.total_right, this.right)
    this.com(this.total_object, this.object)
    this.com(this.total_sale, this.sale)
  },
  methods: {
    com(totalList, typeList) {
      totalList.comparables = [100, 100, 100, 100, 100]
      typeList.forEach(element => {
        if (element.used) {
          for (let i = 0; i < element.comparables.length; i++) {
            totalList.comparables[i] += element.comparables[i].index - 100
          }
        }
      })
      this.total()
    },
    add(factor_total, factor) {
      this.dialog = false
      this.com(factor_total, factor)
    },
    total() {
      let sum = 0
      for (let i = 0; i < this.num; i++) {
        this.price_bz.comparables[i] = Math.round(
          this.list[4].comparables[i].content *
            this.total_sale.comparables[i] /
            100 *
            this.total_location.comparables[i] /
            100 *
            this.total_right.comparables[i] /
            100 *
            this.total_object.comparables[i] /
            100
        )
        sum += this.price_bz.comparables[i]
      }
      this.price = Math.round(sum / this.num)
    },
    setstept(val) {
      this.$emit('setstept', val)
    },
    Getappraisal() {
      getappraisal(this.taskid).then(response => {
        this.list = response.data
        response.data.forEach(element => {
          switch (element.type) {
            case 'basic':
              this.basic.push(element)
              break
            case 'location':
              this.location.push(element)
              break
            case 'right':
              this.right.push(element)
              break
            case 'object':
              this.object.push(element)
              break
            case 'sale':
              this.sale.push(element)
              break
            default:
              break
          }
        })
      })
    },
    Getnousefactor(type) {
      getnousefactor(this.taskid, type).then(response => {
        this.factor = response.data
      })
    },
    addfactor(type) {
      this.dialog = true
      switch (type) {
        case 'location':
          this.factor = this.location
          this.type = '区位状况'
          this.factor_total = this.total_location
          break
        case 'right':
          this.factor = this.right
          this.type = '权益状况'
          this.factor_total = this.total_right
          break
        case 'object':
          this.factor = this.object
          this.type = '实物状况'
          this.factor_total = this.total_object
          break
        case 'sale':
          this.factor = this.sale
          this.type = '交易状况'
          this.factor_total = this.total_sale
          break
        default:
          break
      }
    },
    cancel() {
      if (this.price !== 0) {
        this.$confirm('您有数据尚未保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$router.push({ name: 'task' })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        this.$router.push({ name: 'task' })
      }
    },
    save() {
      this.list[5].comparables.forEach(element => {
        element.content = formatDate(new Date(element.content), 'yyyy-MM-dd')
      })
      var form = {
        id: this.taskid,
        next: false,
        value: this.price,
        data: this.list
      }
      editappraisal(form).then(response => {
        if (response.code === 200) {
          this.$message({ message: '保存成功', type: 'success' })
        } else {
          alert(response.msg)
        }
      })
    },
    nextstep() {
      this.list[5].comparables.forEach(element => {
        element.content = formatDate(new Date(element.content), 'yyyy-MM-dd')
      })
      var form = {
        id: this.taskid,
        next: true,
        value: this.price,
        data: this.list
      }
      editappraisal(form).then(response => {
        if (response.code === 200) {
          this.$message({ message: '保存成功', type: 'success' })
          if (this.isIncome) {
            const routerData = {
              name: 'incomeApproach',
              query: { taskId: this.taskid }
            }
            this.$router.push(routerData)
          } else {
            const routerData = {
              name: 'taskDetail',
              query: { id: this.taskid, status: '报告撰写' }
            }
            this.$router.push(routerData)
          }
        } else {
          alert(response.msg)
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
/* @import "../../../styles/app.scss"; */
.fa {
  float: left;
  width: 33.33%;
}
.td {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 0.2px solid #c0c4cc;
  width: 6%;
  align-content: center;
}
.td_e {
  width: 0.3%;
}

.normal {
  width: -webkit-fill-available;
}
.el-input-number {
  width: 100%;
}
.el-icon-delete {
  margin-left: 10px;
}
.el-button--text {
  margin-left: 10px;
}
.noborder.el-input__inner {
  border: none;
}
.el-input.is-disabled .el-input__inner {
  border: none;
}
.el-input--small .el-input__inner {
  border: none;
  text-align: center;
}
.ck {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.textarea{
  width: 100%;
  border: none;
  text-align: center
}
</style>
