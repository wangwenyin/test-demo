
<template>
  <div>
    <div>
      <table class="table">
        <tr class="tr_title">
          <td colspan="24" class="td">
            <span class="title">致估价委托人的函 </span>
            <el-button v-if="!detail" style="margin-left: 83%;" size="small" type="text">模板</el-button>
          </td>
        </tr>
        <tr class="tr">
          <td class="td" colspan="24">
            <el-input :autosize="{ minRows: 2, maxRows: 8}" v-model="form.letter.content" type="textarea" placeholder="请输入内容"/>
          </td>
        </tr>
        <tr class="tr">
          <td class="td" colspan="1" >
            <span class="normal">估价机构：</span>
          </td>
          <td class="td" colspan="8">
            <el-input v-model="form.appraisalcompany.name" class="noborder" size="small"/>
          </td>
          <td class="td" colspan="1">
            <span class="normal">出函日期：</span>
          </td>
          <td class="td" colspan="9">
            <el-date-picker v-model="form.letter.date" class="noborder" size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;"/>
          </td>
          <td class="td_e"/>
        </tr>
        <tr class="tr_title">
          <td colspan="24" class="td">
            <span class="title">注册房地产估价师声明 </span>
            <el-button v-if="!detail" style="margin-left: 78%" size="small" type="text" @click="creat(form.certification)">新建</el-button>
            <el-button v-if="!detail" size="small" type="text" @click="add('certification')">添加</el-button>
          </td>
        </tr>
        <tr v-for="(o, index) in form.certification" :key="o.para_id">
          <td class="td" colspan="1">
            <span class="normal">{{ index+1 }}</span>
          </td>
          <td class="td" colspan="18">
            <el-input v-model="o.content" size="small" class="noborder"/>
          </td>
          <td class="td_e">
            <i v-if="!detail" class="el-icon-delete" @click="delmodel(form.certification,index)"/>
          </td>
        </tr>
        <tr class="tr">
          <td class="td" colspan="1">
            <span class="normal" style="width: 137px;">注册房地产估价师：</span>
          </td>
          <td class="td" colspan="8">
            <el-input v-model="form.appraiser" class="noborder" size="small"/>
          </td>
          <td class="td" colspan="1">
            <span class="normal">查勘日期：</span>
          </td>
          <td class="td" colspan="9">
            <el-date-picker v-model="form.inpect_date" class="noborder" size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%;"/>
          </td>
          <td class="td_e"/>
        </tr>
        <tr class="tr_title">
          <td colspan="24" class="td">
            <span class="title">估价假设和限制条件 </span>
            <el-button v-if="!detail" size="small" type="text" style="margin-left: 82.5%;" @click="d_gjtj=true">添加</el-button>
          </td>
        </tr>
        <tr class="trtitle1">
          <td colspan="24" class="td">
            <span class="title-small">估价假设条件 </span>
            <el-button v-if="!detail" style="margin-left: 83%;" size="small" type="text" @click="creat(form.condition.assumption)">新建</el-button>
            <el-button v-if="!detail" size="small" type="text" @click="add('assumption')">添加</el-button>
          </td>
        </tr>
        <tr v-for="(o, index) in form.condition.assumption" :key="o.text">
          <td class="td" colspan="1">
            <span class="normal">{{ index+1 }}</span>
          </td>
          <td class="td" colspan="18">
            <el-input v-model="o.content" class="noborder" size="small"/>
          </td>
          <td class="td_e">
            <i v-if="!detail" class="el-icon-delete" @click="delmodel(form.condition.assumption,index)"/>
          </td>
        </tr>
        <tr class="trtitle1">
          <td colspan="24" class="td">
            <span class="title-small">估价限制条件 </span>
            <el-button v-if="!detail" style="margin-left: 83%" size="small" type="text" @click="creat(form.condition.limiting)">新建</el-button>
            <el-button v-if="!detail" size="small" type="text" @click="add('limiting')">添加</el-button>
          </td>
        </tr>
        <tr v-for="(o, index) in form.condition.limiting" :key="o.text">
          <td class="td" colspan="1">
            <span class="normal">{{ index+1 }}</span>
          </td>
          <td class="td" colspan="18">
            <el-input v-model="o.content" size="small" class="noborder"/>
          </td>
          <td class="td_e">
            <i v-if="!detail" class="el-icon-delete" @click="delmodel(form.condition.limiting,index)"/>
          </td>
        </tr>
        <tr v-if="t1" class="trtitle1">
          <td colspan="24" class="td">
            <span class="title-small">未经调查确认或无法调查的资料 </span>
            <el-button v-if="!detail" size="small" style="margin-left: 76%" type="text" @click="newwdczl">新建</el-button>
          </td>
        </tr>
        <tr v-for="(o, index) in wdczl" :key="o.text" > <!-- v-if="t1" -->
          <td class="td" colspan="1">
            <span class="normal">{{ index+1 }}</span>
          </td>
          <td class="td" colspan="18">
            <el-input v-model="o.text" size="small" class="noborder"/>
          </td>
          <td class="td_e">
            <i v-if="!detail" class="el-icon-delete" @click="delwdczl(index)"/>
          </td>
        </tr>
        <tr v-if="t2" class="trtitle1">
          <td colspan="24" class="td">
            <span class="title-small">未考虑因素及一些特殊处理 </span>
            <el-button v-if="!detail" size="small" style="margin-left: 78.6%;" type="text" @click="newwklys">新建</el-button>
          </td>
        </tr>
        <tr v-for="(o, index) in wklys" :key="o.text"><!-- v-if="t1" -->
          <td class="td" colspan="1">
            <span class="normal">{{ index+1 }}</span>
          </td>
          <td class="td" colspan="18">
            <el-input v-model="o.text" size="small" class="noborder"/>
          </td>
          <td class="td_e">
            <i v-if="!detail" class="el-icon-delete" @click="delwklys(index)"/>
          </td>
        </tr>
        <tr v-if="t3" class="trtitle1">
          <td colspan="24" class="td">
            <span class="title-small">其他说明 </span>
            <el-button v-if="!detail" size="small" style="margin-left: 89%;" type="text" @click="newqtsm">新建</el-button>
          </td>
        </tr>
        <tr v-for="(o, index) in qtsm" :key="o.text"> <!-- v-if="t3" -->
          <td class="td" colspan="1">
            <span class="normal">{{ index+1 }}</span>
          </td>
          <td class="td" colspan="18">
            <el-input v-model="o.text" size="small" class="noborder"/>
          </td>
          <td class="td_e">
            <i v-if="!detail" class="el-icon-delete" @click="delqtsm(index)"/>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog :title="dialogtitle" :visible.sync="dialog">
      <el-table :data="model" border size="small" stripe="true" style="width: 100%">
        <el-table-column :index="typeIndex" width="50" type="index" label="序号" align="center"/>
        <el-table-column prop="description" label="内容"/>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button v-if="!detail" type="text" size="small" @click="addmodel(type,addedmodel,scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="d_gjtj" title="添加估价假设和限制条件">
      <div>
        <el-checkbox v-model="t1" label="未经调查确认或无法调查的资料" border/>
        <el-checkbox v-model="t2" label="未考虑因素及一些特殊处理" border/>
        <el-checkbox v-model="t3" label="其他说明" border/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="d_gjtj = false">取 消</el-button>
        <el-button size="small" type="primary" @click="d_gjtj = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getReportModel } from '@/api/singleapp'
export default {
  props: {
    form: {
      type: Object,
      default: null
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      dialogtitle: '',
      type: '',
      model: [],
      addedmodel: [],
      d_gjtj: false,
      t1: false,
      t2: false,
      t3: false
    }
  },

  mounted() {
    this.Getreport()
  },
  methods: {
    add(item) {
      this.type = item
      switch (item) {
        case 'certification':
          this.dialogtitle = '注册房地产估价师声明'
          this.addedmodel = this.form.certification
          break
        case 'assumption':
          this.dialogtitle = '估价假设条件'
          this.addedmodel = this.form.condition.assumption
          break
        case 'limiting':
          this.dialogtitle = '估价限制条件'
          this.addedmodel = this.form.condition.limiting
          break
        default:
          break
      }
      this.Getmodel(item, this.addedmodel)
      this.dialog = true
    },
    addmodel(type, modlelist, value) {
      modlelist.push({ para_id: value.id, content: value.description })
      this.Getmodel(type, modlelist)
    },
    creat(modlelist) {
      modlelist.push({ content: '' })
    },
    delmodel(modlelist, index) {
      modlelist.splice(index, 1)
    },
    Getmodel(item, addedmodel) {
      getReportModel(item).then(response => {
        this.model = response.data
        addedmodel.forEach(element => {
          for (let index = 0; index < this.model.length; index++) {
            if (this.model[index].id === element.para_id) {
              this.model.splice(index, 1)
              continue
            }
          }
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
@import "@/styles/app.scss";
.el-textarea__inner {
  border: none;
}
.normal {
  width: -webkit-fill-available;
}
.td{
    width: 140px;
}
</style>
