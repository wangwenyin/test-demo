<template>
  <div >
    <el-row class="search-container" style="padding: 5px">
      <el-col :span="16">
        <span style="font-size:14px;margin-left: 20px;">因素类型：</span>
        <el-radio-group v-model="type" style="margin-left:10px" size="small" @change="onChangTypeClick" >
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="交易状况">交易状况</el-radio-button>
          <el-radio-button label="区位状况">区位状况</el-radio-button>
          <el-radio-button label="权益状况">权益状况</el-radio-button>
          <el-radio-button label="实物状况">实物状况</el-radio-button>
        </el-radio-group>
        <span style="font-size:14px;margin-left: 40px;">是否默认：</span>
        <el-radio-group v-model="isdefault" style="margin-left:10px" size="small" @change="onChangTypeClick">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button :label="1">默认</el-radio-button>
          <el-radio-button :label="0">非默认</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="padding:5px">
      <el-table v-loading="loading" ref="taskTable" :data="showList" :header-cell-style="changeHeaderStyle" style="width:100%" border fit stripe size="small" >
        <el-table-column label="序号" type="index" width="50" align="center"/>
        <el-table-column prop="type" label="因素类型" align="center"/>
        <el-table-column prop="description" label="因素名称" align="center"/>
        <el-table-column label="是否默认" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isdefault" size="mini">默认</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isdefault" size="mini" type="primary" @click="onSetDefaultClicK(scope.row,true)">设为默认</el-button>
            <el-button v-else size="mini" @click="onSetDefaultClicK(scope.row,false)">取消默认</el-button>
          </template>
        </el-table-column>
      </el-table>
  </el-row></div>
</template>
<script>
import { getParameter, saveParameterDefaultValue } from '@/api/singleapp'
export default {
  data() {
    return {
      type: '全部',
      isdefault: '全部',
      conditionList: [],
      showList: [],
      loading: false
    }
  },
  mounted() {
    this.getConditionInfo()
  },
  methods: {
    // 获取需要配置的参数
    getConditionInfo() {
      getParameter({ item: '住宅影响因素' }).then(response => {
        if (response.code === 200) {
          this.conditionList = response.data
          this.onChangTypeClick()
        } else {
          this.$notify({
            title: '错误',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 筛选类型
    onChangTypeClick() {
      let tempList = []
      if (this.type === '全部') {
        tempList = this.conditionList
      } else {
        this.conditionList.forEach(element => {
          if (element.type === this.type) {
            tempList.push(element)
          }
        })
      }
      let tempList1 = []
      if (this.isdefault === '全部') {
        tempList1 = tempList
      } else {
        tempList.forEach(element => {
          if (element.isdefault === this.isdefault) {
            tempList1.push(element)
          }
        })
      }
      this.showList = tempList1
    },
    // 修改默认值
    onSetDefaultClicK(obj, val) {
      saveParameterDefaultValue(obj.name, { isdefault: val }).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '默认值修改成功',
            type: 'success',
            duration: 2000
          })
          this.getConditionInfo()
        } else {
          this.$notify({
            title: '错误',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-feature{
    margin-top: 20px;
}
</style>
