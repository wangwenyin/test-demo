<template>
  <div>
    <div ref="searchTop">
      <el-row style="border:1px solid #d8dce5;line-height:25px;padding:10px;">
        <el-select v-model="district" placeholder="请选择行政区" size="small" style="width:200px">
          <el-option v-for="item in districtOptions" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-select v-model="subDistrict" placeholder="请选择街道办" size="small" style="width:200px">
          <el-option v-for="item in subdistrictOptions" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-input v-model="parcel_no" placeholder="宗地号" size="small" style="width:200px;"/>
        <el-button type="primary" size="small" @click="onSearchBtnClick">查询</el-button>
        <el-button size="small" @click="onClearBtnClick">清空</el-button>
        <el-button size="small" type="success" style="float:right;margin-right:10px;" @click="onSubmitClick">提交入库</el-button>
      </el-row>
    </div>
    <el-row :gutter="10" style="padding:10px;">
      <el-col :span="12">
        <el-table ref="prjTable" :data="LandData" :header-cell-style="changeHeaderStyle" style="width:100%" border fit size="small">
          <el-table-column v-for="item in fields" :prop="item.prop" :label="item.label" :key="item.prop"/>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button v-if="!isLocating" size="mini" type="primary" @click="onLocateClick(scope.row)">定位</el-button>
              <div v-if="isLocating&&scope.row===locatingObj" >定位中...</div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :page-sizes="listQuery.pageSizes"
          style="text-align: center;"
          @pagination="getLand" />
      </el-col>
      <el-col :span="12">
      <Locate ref="baiduMap" :nearby-data="LandData" :active-value="activeValue" :is-locating="isLocating" :center="center" showkey="parcel_no" @confirm="confirm" @cancel="cancel"/></el-col>
    </el-row>
  </div>
</template>
<script>
import Locate from '@/views/datatools/locate/components/Locate'
import Pagination from '@/components/Pagination'
import {
  getImportationLands, submitImportation, editImportationLands
} from '@/api/data'
import { getDictionary } from '@/api/common'
export default {
  components: {
    Locate,
    Pagination
  },
  data() {
    return {
      district: '',
      subDistrict: '',
      districtOptions: [],
      subdistrictOptions: [],
      parcel_no: '',
      prj_name: '',
      isShowMap: false,
      fields: [
        { label: '宗地号', prop: 'parcel_no' },
        { label: '行政区', prop: 'district' },
        { label: '街道办', prop: 'subdistrict' },
        { label: 'x坐标', prop: 'x' },
        { label: 'y坐标', prop: 'y' }
      ],
      LandData: [],
      project: {},
      testData: [],
      showList: [],
      nearbyData: [],
      activeValue: '',
      center: { lng: 114.064632, lat: 22.549225 },
      isLocating: false,
      locatingObj: null,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      }
    }
  },
  watch: {
    'district'(val) {
      getDictionary(val + '街道').then(response => {
        this.subdistrictOptions = response.data
      })
    }
  },
  mounted() {
    this.getLand()
    this.getOption()
  },
  methods: {
    // 获取下拉选项
    getOption() {
      getDictionary('行政区').then(response => {
        this.districtOptions = response.data
      })
    },
    getLand(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      this.loading = true
      const params = { 'district': this.district === '' ? null : this.district, 'subdistrict': this.subdistrict === '' ? null : this.subdistrict, 'parcel_no': this.parcel_no === '' ? null : this.parcel_no, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
      getImportationLands(params).then(response => {
        this.LandData = response.data
        this.listQuery.total = response.total_num
        this.loading = false
      })
    },
    // 提交入库
    onSubmitClick() {
      submitImportation('land').then(response => {
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
    // 查询
    onSearchBtnClick: function() {
      this.getLand()
    },
    // 清空
    onClearBtnClick: function() {
      this.district = ''
      this.subDistrict = ''
      this.parcel_no = ''
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    onLocateClick(value) {
      this.isLocating = true
      this.locatingObj = value
    },
    // 确认定位
    confirm(type, center) {
      this.isLocating = false
      this.locatingObj.x = center.lng
      this.locatingObj.y = center.lat
      console.log(this.locatingObj)
      editImportationLands(this.locatingObj.parcel_no, this.locatingObj).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '定位成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: response.msg
          })
        }
      })
    },
    // 关闭定位
    cancel(center) {
      this.isLocating = false
      console.log('center')
      console.log(center)
    },
    // 获取定位周边数据
    nearby(type, center) {

    },
    onSelect(type, position, select) {
      this.center = position
      console.log(' this.activeValue')
      console.log(select.ldmc)
      this.activeValue = select.ldmc
      this.confirm(type, position)
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
