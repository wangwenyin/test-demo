<template>
  <div>
    <table class="table-report">
      <tr class="tr_title">
        <td colspan="8" class="td">
          <span class="title">估价报告</span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal" >注册房地产估价师</span>
        </td>
        <td colspan="3" class="td" >
          <el-select v-model="form.report.appraiser" multiple placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in appraisers"
              :key="item.name"
              :label="item.name"
              :value="item.name"/>
          </el-select>
          <!-- <el-input v-model="gjName" class="noborder" readonly size="small"/> -->
        </td>
        <td class="td">
          <span class="normal">估价作业日期</span>
        </td>
        <td colspan="3" class="td">
          <el-date-picker
            v-model="form.report.work_start"
            class="noborder"
            style="width:150px;"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="起始日期" />
          <span class="word">至</span>
          <el-date-picker
            v-model="form.report.work_end"
            class="noborder"
            style="width:150px;"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="终止日期" />
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">报告出具日期</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-date-picker
            v-model="form.report.report_date"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="选择日期"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">报告有效期</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-date-picker
            v-model="form.report.effect_start"
            class="noborder"
            style="width:150px;"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="起始日期" />
          <span class="word">至</span>
          <el-date-picker
            v-model="form.report.effect_end"
            class="noborder"
            style="width:150px;"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="终止日期" />
        </td>
      </tr>
      <tr class="tr_title">
        <td colspan="8" class="td">
          <span class="title">区位和实物状况 </span>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">物业名称</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.prop_name" readonly class="noborder" size="small"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">地理位置</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-select
            v-model="form.property.district"
            style="width:20%;float:left">
            <el-option
              v-for="item in ['罗湖区', '福田区', '南山区','盐田区','宝安区','龙岗区', '龙华区','坪山区','光明新区','大鹏新区']"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-input v-model="form.property.address" class="noborder" placeholder="请输入位置" size="small" style="width:80%;float:left;margin-top:4px;"/>
        </td>
      </tr>
      <tr class="tr" >
        <td :colspan="colSpan1" class="td">
          <span class="normal">区位描述</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <!-- <el-input v-model="form.property.entity_desc" readonly class="noborder" size="small"/> -->
          <el-input v-model="form.property.loc_desc" type="textarea" rows="3" placeholder="请输入"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">实物描述</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.entity_desc" size="small" type="textarea" rows="3" placeholder="请输入"/>
          <!-- <el-input v-model="form.property.entity_desc" readonly class="noborder" size="small"/> -->
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="normal">总楼层</span>
        </td>
        <td class="td">
          <el-input v-model="form.property.bldg_floor" class="noborder" size="small" oninput = "value=value.replace(/[^\d]/g,'')" style="width:100px" placeholder="请输入"/>
          <!-- <el-input v-model="form.property.bldg_floor" class="noborder" size="small" style="width:100px;" placeholder="请输入"/> -->
          <span class="word">层</span>
        </td>
        <td class="td">
          <span class="normal">所在层</span>
        </td>
        <td class="td">
          <el-input v-model="form.property.house_floor" class="noborder" size="small" oninput = "value=value.replace(/[^\d]/g,'')" style="width:100px" placeholder="请输入"/>
          <!-- <el-input v-model="form.property.house_floor" class="noborder" size="small" style="width:100px;" placeholder="请输入"/> -->
          <span class="word">层</span>
        </td>
        <td class="td">
          <span class="normal">建筑面积</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input-number v-model="form.property.built_in_area" :min="0" :max="10000" :controls="hasControls" class="noborder" size="small" placeholder="请输入"/>
          <!-- <el-input v-model="form.property.built_area" class="noborder" size="small" style="width:100px;" placeholder="请输入"/> -->
          <span class="word">平方米</span>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">户型</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.dwelling_size" class="noborder" size="small" placeholder="格式：3室2厅2卫1阳台"/>
          <!-- <span class="word">室</span>
          <el-input v-model="form.property.dwelling_size" class="noborder" style="width:50px;" size="small"/>
          <span class="word">厅</span>
          <el-input v-model="form.property.dwelling_size" class="noborder" style="width:50px;" size="small"/>
          <span class="word">卫</span>
          <el-input v-model="form.property.dwelling_size" class="noborder" style="width:50px;" size="small"/>
          <span class="word">阳台</span> -->
        </td>
        <td :colspan="colSpan" class="td">
          <span class="normal">房屋结构</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-radio-group v-model="form.property.house_type" style="margin-left:20px">
            <el-radio label="平层">平层</el-radio>
            <el-radio label="复式">复式</el-radio>
            <el-radio label="错层">错层</el-radio>
            <el-radio label="跃式">跃式</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">成新率</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.fresh_degree" class="noborder" size="small" placeholder="如：30%"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">使用现状</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-radio-group v-model="form.property.use_status" style="margin-left:20px">
            <el-radio label="自用">自用</el-radio>
            <el-radio label="空置">空置</el-radio>
            <el-radio label="出租">出租</el-radio>
            <el-radio label="装修">装修</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">电梯/层户数</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.lift_ratio" class="noborder" size="small" placeholder="格式：2梯4户"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">停车场</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.bldg_parking" class="noborder" size="small" placeholder="如：地上、地下、地上+地下"/>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">外墙装饰</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.exterior_wall" class="noborder" size="small" placeholder="请输入"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">内墙装饰</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.interior_wall" class="noborder" size="small" placeholder="请输入"/>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">地面装饰</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.floor_decor" class="noborder" size="small" placeholder="请输入"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">天花装饰</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.ceiling_decro" class="noborder" size="small" placeholder="请输入"/>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">卫生间装饰</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.bathroom_decro" class="noborder" size="small" placeholder="请输入"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">厨房装饰</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.kitchen_decro" class="noborder" size="small" placeholder="请输入"/>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">门窗</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.door_window" class="noborder" size="small" placeholder="请输入"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">设施设备</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.inner_facility" class="noborder" size="small" placeholder="请输入"/>
        </td>
      </tr>
      <tr class="tr_title">
        <td colspan="8" class="td">
          <span class="title">权益状况 </span>
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">宗地号</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property. parcel_no" class="noborder" size="small" placeholder="请输入"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">宗地面积</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.land_area" class="noborder" size="small" oninput = "value=value.replace(/[^\d]/g,'')" style="width:100px" placeholder="请输入"/>
          <!-- <el-input v-model="form.property.land_area" class="noborder" size="small" placeholder="请输入"/> -->
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">土地用途</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-input v-model="form.property.land_usage" class="noborder" size="small" placeholder="请输入"/>
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">土地使用年限</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <span class="word">{{ getUseYear }} 年，从</span>
          <el-date-picker
            v-model="form.property.start_date"
            class="noborder"
            style="width:150px;"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="起始日期" />
          <span class="word">至</span>
          <el-date-picker
            v-model="form.property.end_date"
            class="noborder"
            style="width:150px;"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="终止日期" />
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">竣工日期</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-date-picker v-model="form.property.building_age" class="noborder" size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
        </td>
        <td :colspan="colSpan1" class="td">
          <span class="normal">购买日期</span>
        </td>
        <td :colspan="colSpan3" class="td">
          <el-date-picker v-model="form.property.reg_date" class="noborder" size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
        </td>
      </tr>
      <tr class="tr">
        <td :colspan="colSpan1" class="td">
          <span class="normal">房地产性质</span>
        </td>
        <td class="td" colspan="7">
          <el-input v-model="form.property.house_attr" class="noborder" size="small" placeholder="如：市场商品房、安居房等"/>
        </td>
      </tr>
    </table>
    <!-- <el-dialog :title="dialogtitle" :visible.sync="dialog">
      <el-table :data="model" border size="small" stripe="true" style="width: 100%">
        <el-table-column :index="typeIndex" width="50" type="index" label="序号" align="center"/>
        <el-table-column prop="description" label="内容"/>
        <el-table-column v-if="type==='evidence'" prop="type" label="类型"/>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addmodel(type,addedmodel,scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { getParameter } from '@/api/singleapp'
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
      gjName: '',
      colSpan1: '1',
      colSpan3: '3',
      year_of_use: '',
      validity_period: [],
      job_date: [],
      appraisers: [],
      selectedAppraisers: [],
      hasControls: false
    }
  },
  computed: {
    getUseYear: function() {
      const year_start = parseInt(this.form.property.start_date.substring(0, 4))
      const year_end = parseInt(this.form.property.end_date.substring(0, 4))
      const year_use = (year_end - year_start)
      return (year_use || 70)
    }
  },
  mounted() {
    console.log(this.form)
    this.getParameter()
  },
  methods: {
    getParameter() {
      // 初始化注册估价师列表
      this.initializeAppraiserList()

      // 初始化页面数据
      this.initializeReportInfo()
    },
    initializeAppraiserList() {
      const param = { item: '注册房地产估价师' }
      getParameter(param).then(response => {
        if (response.code === 200 && response.data.length > 0) {
          this.appraisers = response.data
        }
      })
    },
    initializeReportInfo() {
      this.form.report.appraiser = this.form.report.appraiser.split(',')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.table-report{
  border-spacing: 0;
  border-collapse: collapse;
  margin-left: 2%;
  margin-top: 10px;
  width: 96%;
  .normal {
    display: inline-block;
    width: 130px;
    margin-left:3px;
    color:#7b7676;
    text-align: center;
    font-size: 15px;
  }
  .word {
    font-size: 13px;
    color: grey;
  }
  .nor{
    display: inline-block;
    margin-left:16px;
    color:#7b7676;
    text-align: center;
    font-size: 15px;
  }

  .tr_title{
    margin-top:2%;
    margin-bottom: 0px;
    background:#f5f7fa;
    height: 35px;
    // font-weight: bold;
  }
  .tr{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .td{
    margin-top: 0px;
    margin-bottom: 0px;
    border: 0.2px solid #c0c4cc;
    //  width: 6%;
    // align-content: center;
    height: 33px;
  }
  .noborder .el-input__inner {
    border: 0px solid #b2b2b2 !important;
  }
  .noborder .el-select--small {
    width: 100% !important;
  }
  .el-input__inner {
    border: none;
  }
  .normal {
    width: -webkit-stretch;
  }
  .el-textarea__inner{
    width: 100%;
    border: none;
    // text-align: center;
    font-size: 13px;
    color: grey;
  }
}
</style>
