<template>
  <div>
    <el-row style="border:1px solid #d8dce5;line-height:25px;padding:10px;">
      <el-select v-model="district" clearable placeholder="请选择行政区" size="small" style="width:200px">
        <el-option v-for="item in districtOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="subdistrict" clearable placeholder="请选择街道办" size="small" style="width:200px">
        <el-option v-for="item in subdistrictOptions" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-input v-model="prj_name" placeholder="楼盘名称" size="small" style="width:200px;"/>
      <el-input v-model="bldg_name" placeholder="楼栋名称" size="small" style="width:200px;"/>
      <el-button type="primary" size="small" @click="onSearchBtnClick">查询</el-button>
      <el-button size="small" @click="onClearBtnClick">清空</el-button>
      <el-button size="small" type="success" style="float:right;margin-right:10px;" @click="onSubmitClick">提交入库</el-button>
    </el-row>
    <el-row :gutter="10" style="padding:10px;">
      <el-table v-loading="loading" ref="prjTable" :data="buildingsData" :header-cell-style="changeHeaderStyle" style="width:100%" border fit size="small">
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
        @pagination="getBuildings" />
    </el-row>
    <BuildingEditDialog :visible="editFormVisible" :building="building" @onCloseClick="onCloseClick"/>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import BuildingEditDialog from '@/views/datatools/edit/components/BuildingEditDialog'
import {
  submitImportation, getImportationBuildings, deleteImportationBuildings
} from '@/api/data'
import { formatDate } from '@/utils/date'
import { getDictionary } from '@/api/common'
export default {
  components: { Pagination, BuildingEditDialog },
  filters: {
    formatDate(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy-MM-dd')
    } },
  data() {
    return {
      district: '',
      subdistrict: '',
      prj_name: '',
      bldg_name: '',
      districtOptions: [],
      subdistrictOptions: [],
      allFields: [
        { label: '楼栋代码', prop: 'bldg_no' },
        { label: '楼栋名称', prop: 'bldg_name' },
        { label: '楼盘名称', prop: 'prj_name' },
        { label: '宗地号', prop: 'parcel_no' },
        { label: '建筑面积', prop: 'bldg_area' },
        { label: '竣工日期', prop: 'const_enddate' },
        { label: '总层数', prop: 'bldg_floors' },
        { label: '用途1', prop: 'bldg_usage1' },
        { label: '用途2', prop: 'bldg_usage2' },
        { label: '性质', prop: 'bldg_attr' }
      ],
      buildingsData: [],
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      loading: false,
      editFormVisible: false,
      building: {}
    }
  },
  watch: {
    // 获取街道办下拉选项
    'district'(val) {
      getDictionary(val + '街道').then(response => {
        this.subdistrictOptions = response.data
        this.subdistrict = ''
      })
    }
  },
  mounted() {
    this.getOption()
    this.getBuildings()
  },
  methods: {
    // 获取下拉选项
    getOption() {
      getDictionary('行政区').then(response => {
        this.districtOptions = response.data
      })
    },
    // 获取楼盘列表信息
    getBuildings(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      this.loading = true
      const params = { 'district': this.district === '' ? null : this.district, 'subdistrict': this.subdistrict === '' ? null : this.subdistrict, 'bldg_name': this.bldg_name === '' ? null : this.bldg_name, 'prj_name': this.prj_name === '' ? null : this.prj_name, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
      getImportationBuildings(params).then(response => {
        this.buildingsData = response.data
        this.listQuery.total = response.total_num
        this.loading = false
      })
    },
    // 编辑
    onEditClick(value) {
      this.editFormVisible = true
      this.building = value
    },
    // 删除某个楼盘
    onDelClick(value) {
      const data = { id: value.id }
      deleteImportationBuildings(value.bldg_no, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getBuildings()
        } else {
          this.$message({
            type: 'info',
            message: response.msg
          })
        }
      })
    },
    // 提交入库
    onSubmitClick() {
      submitImportation('building').then(response => {
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
    // 查询
    onSearchBtnClick: function() {
      this.getBuildings()
    },
    // 清空
    onClearBtnClick: function() {
      this.district = ''
      this.subdistrict = ''
      this.bldg_name = ''
      this.prj_name = ''
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
