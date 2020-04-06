<template>
  <div style="height:400px;border:solid 1px #000">
    <el-row>
      <el-col :span="20" :offset="1" style="font-size:22px;margin-top:10px">
        <div >查勘限制情况说明：</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="4" style="margin-top:50px">
        <div >1.是否明显改变原结构:</div>
      </el-col>
      <el-col :span="10" style="margin-top:50px">
        <div >{{ commercial_obj.xzqk_sfgbyjg }}
          <span v-if="commercial_obj.xzqk_sfgbyjg === '其它' || commercial_obj.xzqk_sfgbyjg === '其他'">({{ commercial_obj.xzqk_sfgbyjg_qt }})</span>
        </div>
      </el-col>
    </el-row>
    <el-row>

      <el-col :span="4" :offset="4" style="margin-top:20px">
        <div >2.装修情况：</div>
      </el-col>
      <el-col :span="10" style="margin-top:20px">
        <div >{{ commercial_obj.xzqk_zxqk }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="4" style="margin-top:20px">
        <div >3.使用现状：</div>
      </el-col>
      <el-col :span="10" style="margin-top:20px">
        <div >{{ commercial_obj.xzqk_syxz }}
          <span v-if="commercial_obj.xzqk_syxz === '出租' ">(租金){{ commercial_obj.xzqk_syxz_zj }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="4" style="margin-top:20px">
        <div >4.其他情况：</div>
      </el-col>
      <el-col :span="10" style="margin-top:20px">
        <div >{{ commercial_obj.xzqk_qtqk }}
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top:150px">
      <el-col :span="2" :offset="3" >
        <div >说明人：</div>
      </el-col>
      <el-col :span="3" >
        <div ><img v-if="smr_url !== ''" :src="smr_url" style="width:100px;height:25px" >
        </div>
      </el-col>
      <el-col :span="2" >
        <div >确认人：</div>
      </el-col>
      <el-col :span="3" >
        <div ><img v-if="qrr_url !== ''" :src="qrr_url" style="width:100px;height:25px" >
        </div>
      </el-col>
      <el-col :span="2">
        <div >日期：</div>
      </el-col>
      <el-col :span="3" >
        <div >{{ commercial_obj.xzqk_rq }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import { getMaterial } from '@/api/survey'
export default {
  props: {
    commercial_obj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    task_id: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      smr_url: '',
      qrr_url: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.getMaterial('说明人签名图片')
    this.getMaterial('确认人签名图片')
  },
  methods: {
    getMaterial(matrl_type) {
      getMaterial(this.task_id, { matrl_type: matrl_type }).then(response => {
        if (response.code === 200) {
          if (matrl_type === '说明人签名图片') {
            this.smr_url = response.data.length === 1 ? response.data[0].url : ''
          }
          if (matrl_type === '确认人签名图片') {
            this.qrr_url = response.data.length === 1 ? response.data[0].url : ''
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
      return parseTime(new Date(date), '{y}-{m}-{d} {h}:{i}:{s}')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
