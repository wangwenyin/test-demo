<template>
  <div class="survey-container">
    <!-- <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1"> -->
    <el-row>
      <el-col :span="22" :offset="1">
        <el-row>
          <el-col>
            <div class="row-container" style="font-size:20px;font-weight:bold;text-align:center">({{ property_name }})经营性房地产实地查看记录表 </div>
          </el-col>
        </el-row>
        <table class="table" >
          <tr class="tr_title">
            <td colspan="8" class="td" style="text-align: center">
              <span class="normal">房地产基本情况</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal" style="color:red">房地产名称</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.fdcmc }}</span>
            </td>
            <td class="td">
              <span class="normal">权证编号</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.qzbh }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td">
              <span class="normal" style="color:red">房地产位置</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.fdcwz }}</span>
            </td>
            <td class="td">
              <span class="normal" style="color:red">使用现状</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.syzk }}</span>
            </td>
          </tr>

          <tr class="tr">
            <td class="td">
              <span class="normal">证载用途</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ commercial_obj.zzyt }}</span>
            </td>
            <td class="td">
              <span class="normal">建筑结构</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ commercial_obj.jzjg }}</span>
            </td>
            <td class="td">
              <span class="normal" style="color:red">租金水平</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zjsp }} 元/㎡月</span>
            </td>
          </tr>

          <tr class="tr">
            <td class="td">
              <span class="normal" style="color:red">现状用途</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ commercial_obj.xzyt }}</span>
            </td>
            <td class="td">
              <span class="normal">评估楼层</span>
            </td>
            <td class="tdtext">
              <span class="units">{{ commercial_obj.pglc }}</span>
            </td>
            <td class="td">
              <span class="normal">临街状况</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.ljzk }}</span>
            </td>
          </tr>

          <tr class="tr">
            <td class="td">
              <span class="normal">四至</span>
            </td>
            <td class="tdtext" colspan="7" >
              <span class="units">东：{{ commercial_obj.sz_d }} 西：{{ commercial_obj.sz_x }} 南：{{ commercial_obj.sz_n }} 北：{{ commercial_obj.sz_b }}</span>
            </td>
          </tr>
          <tr class="tr_title">
            <td colspan="8" class="td" style="text-align: center">
              <span class="normal">房地产外部环境</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="4" >
              <span class="normal">商业繁华度</span>
            </td>
            <td class="td" >
              <span class="normal">距商业中心</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.syfhd_jsyzx }}</span>
            </td>
            <td class="td" rowspan="4" >
              <span class="normal">办公集聚度</span>
            </td>
            <td class="td" >
              <span class="normal">距商务区距离</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sz_x }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">规模</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.syfhd_gm }}</span>
            </td>
            <td class="td" >
              <span class="normal">距政府部门</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.bgjjd_zfbm }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">客流量</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.syfhd_kll }}</span>
            </td>
            <td class="td" >
              <span class="normal">规模</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.bgjjd_gm }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">主要商业</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.syfhd_zysy }}</span>
            </td>
            <td class="td" >
              <span class="normal">主要写字楼</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.bgjjd_zyxzl }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="4" >
              <span class="normal">交通便捷度</span>
            </td>
            <td class="td" >
              <span class="normal">公交线路</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">线路名：{{ commercial_obj.gjxl_xlm }}</span>
            </td>
            <td class="td" rowspan="4" >
              <span class="normal">公共设施</span>
            </td>
            <td class="td" >
              <span class="normal">银行</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.ggss_yh }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">地铁站</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >距离：{{ commercial_obj.dtz_jl }}</span>
            </td>
            <td class="td" >
              <span class="normal">超市</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.ggss_cs }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">火车站/飞机场</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >距离：{{ commercial_obj.hcz_jl }}/{{ commercial_obj.fjc_jl }}</span>
            </td>
            <td class="td" >
              <span class="normal">餐饮</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.ggss_cy }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">主要交通干线</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >名称/距离：{{ commercial_obj.zyjtgx_mc }}/{{ commercial_obj.zyjtgx_jl }}</span>
            </td>
            <td class="td" >
              <span class="normal">医院</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.ggss_yy }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="4" >
              <span class="normal">建筑物规模</span>
            </td>
            <td class="td" >
              <span class="normal">整体概况</span>
            </td>
            <td class="tdtext" colspan="6">
              <span class="units" >{{ commercial_obj.jzwgm_ztgk }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">裙楼</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">层数：{{ commercial_obj.jzwgm_ql_cs }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">用途：{{ commercial_obj.jzwgm_ql_yt }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">塔楼</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">层数：{{ commercial_obj.jzwgm_tl_cs }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">用途：{{ commercial_obj.jzwgm_tl_yt }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">地下室</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">层数：{{ commercial_obj.jzwgm_dxs_cs }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">用途：{{ commercial_obj.jzwgm_dxs_yt }}</span>
            </td>
          </tr>
          <tr class="tr_title">
            <td colspan="8" class="td" style="text-align: center">
              <span class="normal">房地产内部状况</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" colspan="2" >
              <span class="normal">项目</span>
            </td>
            <td class="td" colspan="3">
              <span class="normal">基本状况</span>
            </td>
            <td class="td" colspan="3">
              <span class="normal" >使用现状</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="8" >
              <span class="normal">设备设施</span>
            </td>
            <td class="td" >
              <span class="normal">电梯</span>
            </td>
            <td class="tdtext" colspan="3">
              <div v-if="commercial_obj.sbss_ywzdft === '有'">
                <span class="units" >自动扶梯: {{ commercial_obj.sbss_zdft_bs }} 部 {{ commercial_obj.sbss_zdft_cs }} 层</span>
              </div>
              <div v-if="commercial_obj.sbss_ywzdft === '无'">
                <span class="units" > {{ commercial_obj.sbss_ywzdft }} </span>
              </div>
              <br>
              <div v-if="commercial_obj.sbss_ywkt === '有'">
                <span class="units" >客梯：: {{ commercial_obj.sbss_kt_bs }} 部 {{ commercial_obj.sbss_kt_cs }} 层</span>
              </div>
              <div v-if="commercial_obj.sbss_ywkt === '无'">
                <span class="units" > {{ commercial_obj.sbss_ywkt }} </span>
              </div>
              <br>
              <div v-if="commercial_obj.sbss_ywht === '有'">
                <span class="units" >贷梯： {{ commercial_obj.sbss_ht_bs }} 部 {{ commercial_obj.sbss_ht_cs }} 层</span>
              </div>
              <div v-if="commercial_obj.sbss_ywht === '无'">
                <span class="units" > {{ commercial_obj.sbss_ywht }} </span>
              </div>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.sbss_zdft_syxz }}</span>
              <br>
              <span class="units" >{{ commercial_obj.sbss_kt_syxz }}</span>
              <br>
              <span class="units" >{{ commercial_obj.sbss_ht_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">防盗系统</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_fdxt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_fdxt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">给排水系统</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_jpsxt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_jpsxt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">供电系统</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_gdxt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_gdxt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">照明系统</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_zmxt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_zmxt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">空调系统</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_ktxt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_ktxt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">通讯系统</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_txxt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_txxt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">消防系统</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_xfxt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.sbss_xfxt_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" rowspan="8" >
              <span class="normal">装修情况</span>
            </td>
            <td class="td" >
              <span class="normal">外墙</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.zxqk_wq }}</span>
              <span v-if="commercial_obj.zxqk_wq ==='其他'" class="units" >{{ commercial_obj.zxqk_wq_qt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units" >{{ commercial_obj.zxqk_wq_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">内墙</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_nq }}</span>
              <span v-if="commercial_obj.zxqk_nq ==='其他'" class="units" >{{ commercial_obj.zxqk_nq_qt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_nq_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">天花</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_th }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_th_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">房间地面</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_fjdm }}</span>
              <span v-if="commercial_obj.zxqk_fjdm ==='其他'" class="units" >{{ commercial_obj.zxqk_fjdm_qt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_fjdm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">楼梯地面</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_ltdm }}</span>
              <span v-if="commercial_obj.zxqk_ltdm ==='其他'" class="units" >{{ commercial_obj.zxqk_ltdm_qt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_ltdm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">外门</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_wm }}</span>
              <span v-if="commercial_obj.zxqk_wm ==='其他'" class="units" >{{ commercial_obj.zxqk_wm_qt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_wm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">内门</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_nm }}</span>
              <span v-if="commercial_obj.zxqk_nm ==='其他'" class="units" >{{ commercial_obj.zxqk_nm_qt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_nm_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">窗</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_c }}</span>
              <span v-if="commercial_obj.zxqk_c ==='其他'" class="units" >{{ commercial_obj.zxqk_c_qt }}</span>
            </td>
            <td class="tdtext" colspan="3">
              <span class="units">{{ commercial_obj.zxqk_c_syxz }}</span>
            </td>
          </tr>
          <tr class="tr">
            <td class="td" >
              <span class="normal">备注</span>
            </td>
            <td class="tdtext" colspan="7">
              <span class="units">{{ commercial_obj.bz }}</span>
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
            <div class="col-item-value">{{ commercial_obj.dzlxfs }}</div>
            <div class="col-item-value">{{ commercial_obj.ckrq }}</div>
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
    commercial_obj: {
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
    margin-bottom: 20px;
    color: grey;
    text-align: left;
    color: red;
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
</style>
