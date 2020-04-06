<template>
  <div >
    <el-row v-if="detail">
      <el-col :span="24">
        <div class="title">按用途分组情况</div>
        <div class="border" />
      </el-col>
    </el-row>
    <el-form v-if="form.result" ref="form" label-width="100px" label-position="right">
      <el-row >
        <el-col :span="22">
          <span class="row-title">结论</span>
        </el-col>
      </el-row>
      <el-row>
        <span class="row-text">
          {{ form.result.whole }}
        </span>
      </el-row>
      <el-row >
        <span class="row-title">估价水平检验</span>
      </el-row>
      <el-row>
        <el-table ref="taskTable" :data="form.app_level" :header-cell-style="changeHeaderStyle" style="width:100%" border fit stripe size="small" >
          <el-table-column prop="type" label="类型" width="100" />
          <el-table-column prop="case_num" width="120" label="案例数量" />
          <el-table-column prop="median" label="比率中位数" min-width="120" />
          <el-table-column prop="average" label="比率平均数" min-width="120" />
          <el-table-column prop="modeval" label="比率众数" min-width="120" />
          <el-table-column label="案例详情" width="100">
            <template slot-scope="scope">
              <div>
                <el-button size="mini" type="text" @click="onViewUsageClick(scope.row)">查看</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <span class="row-text">
          {{ form.result.level }}
        </span>
      </el-row>
      <el-row >
        <span class="row-title">估价结果一致性检验</span>
      </el-row>
      <el-row>
        <el-table ref="taskTable" :data="form.app_consistency" style="width:100%" border fit stripe size="small" >
          <el-table-column prop="type" label="类型" width="80" />
          <el-table-column prop="case_num" label="案例数量" width="80" />
          <el-table-column prop="rang" label="比率极差" width="80" />
          <el-table-column prop="aad" label="平均绝对离差" min-width="100" />
          <el-table-column prop="cod" label="离散系数" min-width="80" />
          <el-table-column prop="std" label="比率标准差" min-width="100" />
          <el-table-column prop="cov" label="变异系数" min-width="80" />
          <el-table-column prop="prd" label="价格相关差" min-width="100" />
          <el-table-column label="案例详情" width="80">
            <template slot-scope="scope">
              <div>
                <el-button size="mini" type="text" @click="onViewUsageClick(scope.row)">查看</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <span class="row-text">
          {{ form.result.consistency }}
        </span>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {}
      }
    },
    baseinfo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    detail: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
    }
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.form = val
      }
    }
  },
  mounted() {
    // this.onUsageChange(this.usage)
  },
  methods: {
    onViewUsageClick(val) {
      this.baseinfo.property_usage = val.type
      const routerData = {
        name: 'CaseSearch',
        query: { caller: 'ratio', baseinfo: this.baseinfo }
      }
      this.$router.push(routerData)
    },
    changeHeaderStyle(val) {
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.row-title{
  font-weight: bold
}
.row-text{
  color: #666666;
  margin-left: 4%;
  font-size: 14px;
}

.el-row {
  margin-top: 20px
}
.title {
  font-size: 17px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.border {
  border: 0.5px solid #c0c4cc;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
