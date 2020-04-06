<template>
  <div>
    <el-row style="border:1px solid #d8dce5;line-height:25px;padding:10px;">
      <el-input v-model="bldg_name" placeholder="楼栋名称" size="small" style="width:200px;"/>
      <el-input v-model="unit_no" placeholder="户号" size="small" style="width:200px;"/>
      <el-button type="primary" size="small" @click="onSearchBtnClick">查询</el-button>
      <el-button size="small" @click="onClearBtnClick">清空</el-button>
      <el-button size="small" type="success" style="float:right;margin-right:10px;" @click="onSubmitClick">提交入库</el-button>
    </el-row>
    <el-row :gutter="10" style="padding:10px;">
      <el-table v-loading="loading" ref="prjTable" :data="HouseData" :header-cell-style="changeHeaderStyle" style="width:100%" border fit size="small">
        <el-table-column v-for="item in allFields" :prop="item.prop" :label="item.label" :key="item.prop"/>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onEditClick(scope.row)" >编辑</el-button>
            <el-button size="mini" type="danger" @click="onDelClick(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="listQuery.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :page-sizes="listQuery.pageSizes"
        style="text-align: center;"
        @pagination="getHouse" />
    </el-row>
    <HouseEditDialog :visible="editFormVisible" :house="house" @onCloseClick="onCloseClick"/>
  </div>
</template>
<script>
import HouseEditDialog from '@/views/datatools/edit/components/HouseEditDialog'
import Pagination from '@/components/Pagination'
import {
  getImportationUnits, deleteImportationUnits, submitImportation
} from '@/api/data'
export default {
  components: { Pagination, HouseEditDialog },
  data() {
    return {
      bldg_name: '',
      unit_no: '',
      allFields: [
        { label: '户代码', prop: 'house_no' },
        { label: '户号', prop: 'unit_no' },
        { label: '楼栋代码', prop: 'bldg_no' },
        { label: '楼栋名称', prop: 'bldg_name' },
        { label: '所在层', prop: 'floor_no' },
        { label: '面积', prop: 'house_area' },
        { label: '分摊面积', prop: 'house_area_comm' },
        { label: '室号部位', prop: 'house_part' },
        { label: '户型', prop: 'dwelling_size' },
        { label: '户型结构', prop: 'dwelling_struc' },
        { label: '用途大类', prop: 'house_usage1' },
        { label: '用途小类', prop: 'house_usage2' },
        { label: '房屋性质', prop: 'house_attr' }
      ],
      HouseData: [],
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      loading: false,
      editFormVisible: false,
      house: {}
    }
  },
  mounted() {
    this.getHouse()
  },
  methods: {
    // 获取楼盘列表信息
    getHouse(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      this.loading = true
      const params = { 'bldg_name': this.bldg_name === '' ? null : this.bldg_name, 'unit_no': this.unit_no === '' ? null : this.unit_no, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
      getImportationUnits(params).then(response => {
        this.HouseData = response.data
        this.listQuery.total = response.total_num
        this.loading = false
      })
    },
    onEditClick(value) {
      this.house = value
      this.editFormVisible = true
    },
    onDelClick(value) {
      const data = { id: value.id }
      deleteImportationUnits(value.house_no, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getHouse()
        } else {
          this.$message({
            type: 'info',
            message: response.msg
          })
        }
      })
    },
    // 查询
    onSearchBtnClick: function() {
      this.getHouse()
    },
    // 清空
    onClearBtnClick: function() {
      this.bldg_name = ''
      this.unit_no = ''
    },
    // 提交入库
    onSubmitClick() {
      submitImportation('house').then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: response.msg
          })
        }
      })
    },
    // 关闭编辑框
    onCloseClick(val) {
      this.editFormVisible = false
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
