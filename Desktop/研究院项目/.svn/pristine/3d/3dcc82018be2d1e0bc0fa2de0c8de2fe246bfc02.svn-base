<template>
  <div class="survey-container">
    <!-- <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1"> -->
    <el-row>
      <el-col :span="22" :offset="1">
        <el-row>
          <el-col>
            <div class="row-container" style="font-size:20px;font-weight:bold;text-align:center">({{ property_name }})住宅房地产实地查看记录表 </div>
          </el-col>
        </el-row>
        <table class="table" >
          <!-- <tr class="tr_title">
            <td colspan="4" class="td">
              <span class="title-small">区位状况</span>
            </td>
          </tr> -->
          <tr class="tr">
            <td class="td">
              <span class="normal" style="color:red">标的坐落</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ residence_obj.bdzl }}</span>
            </td>
            <td class="td">
              <span class="normal" style="color:red">楼盘名称</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ residence_obj.lpmc }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal" style="color:red">标的所在楼层</span>
            </td>
            <td class="tdtext">
              <span class="units">总层&nbsp;&nbsp;{{ residence_obj.zc }}&nbsp;&nbsp;层</span>
              <br>
              <span class="units">所在&nbsp;&nbsp;{{ residence_obj.szc }}&nbsp;&nbsp;层</span>
            </td>
            <td class="td">
              <span class="normal">使用状况</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.syzk }}</span>
            </td>
            <td class="td">
              <span class="normal" style="color:red">建筑面积</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.jzmj }}㎡</span>
            </td>
            <td class="td">
              <span class="normal">建筑结构</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.jzjg }}</span>
            </td>
          </tr>

          <tr class="tr">
            <td class="td">
              <span class="normal">现状用途</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.xzyt }}</span>
            </td>
            <td class="td">
              <span class="normal">户型结构</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.hxjg_f }} 房 {{ residence_obj.hxjg_t }} 厅 {{ residence_obj.hxjg_c }}厨 {{ residence_obj.hxjg_w }} 卫 {{ residence_obj.hxjg_y }} 阳台</span>
            </td>
            <td class="td">
              <span class="normal">楼齡</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.ll }}</span>
            </td>
            <td class="td">
              <span class="normal">朝向</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.cx }}</span>
            </td>
          </tr>

          <tr class="tr">
            <td class="td">
              <span class="normal">维修保养</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.wxby }}</span>
            </td>
            <td class="td">
              <span class="normal">通风采光</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ residence_obj.tfcg }}</span>
            </td>
            <td class="td">
              <span class="normal">物业类型</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ residence_obj.wylx }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">四至</span>
            </td>
            <td class="tdtext" colspan="7" >
              <span class="units">东：{{ residence_obj.sz_d }} 西：{{ residence_obj.sz_x }} 南：{{ residence_obj.sz_n }} 北：{{ residence_obj.sz_b }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">公交线路</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ residence_obj.gjxl_mc }} 共 {{ residence_obj.gjxl_sl }} 条，步行 {{ residence_obj.gjxl_bxsj }} 分钟</span>
            </td>
            <td class="td">
              <span class="normal">地铁线路</span>
            </td>
            <td class="tdtext" colspan="3" >
              <span class="units">{{ residence_obj.dtxl_zm }}步行至该地铁站口约 {{ residence_obj.dtxl_bxsj }} 分钟</span>
            </td>
          </tr>

          <tr class="tr" >
            <td class="td" >
              <span class="normal">景观</span>
            </td>
            <td class="tdtext" colspan="7" >
              <span class="units">{{ residence_obj.jg }}</span>
            </td>
          </tr>
          <tr><td class="td" >
            <span class="normal">小区配套：</span>
          </td>
            <td class="tdtext" colspan="7">
              <span class="units">{{ residence_obj.xqpt }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="6">
              <span class="normal">物业设施及管理</span>
            </td>
            <td class="td" >
              <span class="normal">电梯基本状况</span>
            </td>
            <td class="tdtext" colspan="6">
              <span :v-if="residence_obj.wyss_ywdt === '有'" class="units"> {{ residence_obj.wyss_ktsl }} 部客梯 {{ residence_obj.wyss_htsl }} 部贷梯   每层 {{ residence_obj.wyss_mchs }} 户,{{ residence_obj.wyss_dt_syxz }}</span>
              <span :v-if="residence_obj.wyss_ywdt === '无'" class="units"> {{ residence_obj.wyss_ywdt }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">水电</span>
            </td>
            <td class="tdtext" colspan="6">
              <span class="units"> {{ residence_obj.wyss_sd }}
                <span :v-if="residence_obj.wyss_sd !== '无'" class="units"> ,{{ residence_obj.wyss_sd_syxz }}</span>
              </span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">消防</span>
            </td>
            <td class="tdtext" colspan="7">
              <span class="units"> {{ residence_obj.wyss_xf }}
                <span :v-if="residence_obj.wyss_sd !== '无'" class="units"> ,{{ residence_obj.wyss_xf_syxz }}</span>
              </span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">通讯</span>
            </td>
            <td class="tdtext" colspan="7">
              <span class="units">{{ residence_obj.wyss_tx }}</span>
            </td>
          </tr>
          <tr>
            <td class="td">
              <span class="normal">管道燃气</span>
            </td>
            <td class="tdtext" colspan="6">
              <span class="units">{{ residence_obj.wyss_ywgdrq }}；{{ residence_obj.wyss_gdrq_syxz }}</span>
            </td>
          </tr>
          <tr>
            <td class="td">
              <span class="normal">物业管理</span>
            </td>
            <td class="tdtext" colspan="6">
              <span class="units">{{ residence_obj.wyss_wygl }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">周边配套</span>
            </td>
            <td class="tdtext" colspan="7">
              <span class="units">{{ residence_obj.zbpt }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">物业外墙</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ residence_obj.wywq }}</span>
            </td>
            <td class="td">
              <span class="normal">装修状况</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ residence_obj.zxzk }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">楼梯间</span>
            </td>
            <td class="tdtext" colspan="7">
              <span class="units">地面：{{ residence_obj.ltj_dm }} 墙面：{{ residence_obj.ltj_qm }}  天花：{{ residence_obj.ltj_th }} 其他：{{ residence_obj.ltj_qt }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">公共通道</span>
            </td>
            <td class="tdtext" colspan="7">
              <span class="units">地面：{{ residence_obj.ggtd_dm }} 墙面：{{ residence_obj.ggtd_qm }}  天花：{{ residence_obj.ggtd_th }} 其他：{{ residence_obj.ggtd_qt }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal">内部装修</span>
            </td>
            <!-- <td class="td" >
              <span class="normal" />
            </td> -->
            <td class="td" colspan="5">
              <span class="normal">基本状况</span>
            </td>
            <td class="td" colspan="2">
              <span class="normal">使用现状</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="5" >
              <span class="normal">客厅及房间</span>
            </td>
            <td class="td" >
              <span class="normal">地面</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.ktfj_dm }}</span>
              <span v-if="residence_obj.ktfj_dm === '其他'" class="units">({{ residence_obj.ktfj_dm_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.ktfj_dm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">墙面</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.ktfj_qm }}</span>
              <span v-if="residence_obj.ktfj_qm === '其他'" class="units">({{ residence_obj.ktfj_qm_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.ktfj_qm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">天花</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.ktfj_th }}</span>
              <span v-if="residence_obj.ktfj_th === '其他'" class="units">({{ residence_obj.ktfj_th_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.ktfj_th_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">门</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.ktfj_m }}</span>
              <span v-if="residence_obj.ktfj_m === '其他'" class="units">({{ residence_obj.ktfj_m_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.ktfj_m_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">窗</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.ktfj_c }}</span>
              <span v-if="residence_obj.ktfj_c === '其他'" class="units">({{ residence_obj.ktfj_c_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.ktfj_c_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="3" >
              <span class="normal">厨房</span>
            </td>
            <td class="td" >
              <span class="normal">地面</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.cf_dm }}</span>
              <span v-if="residence_obj.cf_dm === '其他'" class="units">({{ residence_obj.cf_dm_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.cf_dm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">墙面</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.cf_qm }}</span>
              <span v-if="residence_obj.cf_qm === '其他'" class="units">({{ residence_obj.cf_qm_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.cf_qm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">天花</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.cf_th }}</span>
              <span v-if="residence_obj.cf_th === '其他'" class="units">({{ residence_obj.cf_th_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.cf_th_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="3" >
              <span class="normal">卫生间</span>
            </td>
            <td class="td" >
              <span class="normal">地面</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.wsj_dm }}</span>
              <span v-if="residence_obj.wsj_dm === '其他'" class="units">({{ residence_obj.wsj_dm_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.wsj_dm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">墙面</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.wsj_qm }}</span>
              <span v-if="residence_obj.wsj_qm === '其他'" class="units">({{ residence_obj.wsj_qm_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.wsj_qm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">天花</span>
            </td>
            <td class="tdtext" colspan="4">
              <span class="units">{{ residence_obj.wsj_th }}</span>
              <span v-if="residence_obj.wsj_th === '其他'" class="units">({{ residence_obj.wsj_th_qt }})</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.wsj_th_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">阳台</span>
            </td>
            <td class="td" colspan="5">
              <span class="units">{{ residence_obj.yt }}</span>
            </td>
            <td class="tdtext" colspan="2" style="text-align: center;">
              <span class="units">{{ residence_obj.yt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">备注</span>
            </td>
            <td class="td" colspan="7">
              <span class="units" >{{ residence_obj.bz }}</span>
            </td>
          </tr>
        </table>
        <el-row>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">领勘人：</div>
            <div class="col-item-label">查勘人：</div>
          </el-col>
          <el-col :span="6" class="row-container">
            <div class="col-item-value" style="height:25px"><img v-if="lcr_url !== ''" :src="lcr_url" style="width:100px;height:25px" ></div>
            <div class="col-item-value" style="height:25px"><img v-if="ckr_url !== ''" :src="ckr_url" style="width:100px;height:25px" ></div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-label">地址及联系方式：</div>
            <div class="col-item-label">查勘日期：</div>
          </el-col>
          <el-col :span="10" class="row-container">
            <div class="col-item-value">{{ residence_obj.dzlxfs }}</div>
            <div class="col-item-value">{{ getParseTime(residence_obj.ckrq) }}</div>
          </el-col>
        </el-row>
        <div style="height:10px;" />
      </el-col>

    </el-row>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'
import { getMaterial } from '@/api/survey'
export default {
  filters: {
  },
  props: {
    property_name: {
      type: String,
      default: function() {
        return ''
      }
    },
    task_id: {
      type: String,
      default: function() {
        return ''
      }
    },
    residence_obj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      lcr_url: '',
      ckr_url: ''
      // residence_obj: {}
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.getMaterial('领勘人签名图片')
    this.getMaterial('查勘人签名图片')
  },
  methods: {
    getMaterial(matrl_type) {
      getMaterial(this.task_id, { matrl_type: matrl_type }).then(response => {
        if (response.code === 200) {
          if (matrl_type === '领勘人签名图片') {
            this.lcr_url = response.data.length === 1 ? response.data[0].url : ''
          }
          if (matrl_type === '查勘人签名图片') {
            this.ckr_url = response.data.length === 1 ? response.data[0].url : ''
          }
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getParseTime(date) {
      return parseTime(new Date(date), '{y}-{m}-{d}')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.survey-container .table {
  border-collapse:collapse;
  width: 100%
}
.survey-container .sub-title, .title-small, .el-tabs .sub-title {
  color: grey;
  font-weight: bold;
}
.survey-container .sub-title {
  font-size: 18px;
}
.survey-container .title-small {
  font-size: 16px;
}
.survey-container .tdtext input, .tdtext textarea {
 /*  width: 100%; */
  height: 100%;
  padding: 5px 10px;
  outline: none;
  border: 0
}
.survey-container .tdtext input.fee-units-value {
  width: 70%;
}
.survey-container .tdtext input.units-value {
  width: 20%;
}
.survey-container #house-type input {
  width: 10%;
}
.survey-container .tdtext .el-select {
  float: left;
  width: 25%;
  outline: none
}
.survey-container .tdtext .detail-address {
  float: left;
  width: 75%
}
.survey-container .el-radio-group {
  margin-left: 10px;
}
.survey-container .el-radio+.el-radio {
  margin-left: 20px;
}
.survey-container .units {
  margin-left: 10px;
  color: #606266;
  font-size: 14px;
}
.survey-container .normal {
  color: #606266;
  font-size: 15px;
  font-weight: 700;
}
.survey-container .td {
  width: 12%;
  height: 33px;
  border: 1px solid #c0c4cc;
  text-align: center
}
.survey-container .tr_title .td {
  padding-left: 30px;
  text-align: left;
}
.survey-container .tdtext {
  border: .5px solid #c0c4cc;
  width: 15%;
}
.survey-container .tdtext input, .tdtext textarea {
  color: #606266;
  font-size: 14px;
}
.survey-container .survey-title {
  overflow: hidden;
}
.survey-container .survey-title .sub-title {
  float: left;
}
.survey-container .back-reason {
  float: right;
  color: red
}
.survey-container .el-input__inner {
  border: 0 !important
}
.survey-tabs__box .el-tabs__item {
  font-size: 16px
}
.row-container{
    padding: 10px;
    /* margin-top: 10px; */
}
.col-item-label {
    color: red;
}
.col-item-value {
    height: 25px;
}
</style>
