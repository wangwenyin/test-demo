<template>
  <div class="search">
    <div ref="searchTop" class="search__top">
      <el-row >
        <el-col :span="24" >
          <el-select v-model="value_date" style="width: 120px;" placeholder="请选择价值时点" size="small" @change="onSearchBtnClick">
            <el-option
              v-for="item in value_dateOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-select v-model="usage" style="width: 120px;" placeholder="请选择物业用途" size="small" @change="onSearchBtnClick">
            <el-option
              v-for="item in usageOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-select v-model="district" style="width: 120px;" placeholder="请选择区域" clearable size="small" @change="onSearchBtnClick">
            <el-option
              v-for="item in districtOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-input v-model="prj_name" size="small" style="width: 150px;" placeholder="楼盘名称" @keyup.enter.native="onSearchBtnClick"/>
          <el-input v-model="bldg_name" size="small" style="width: 150px;" placeholder="楼栋名称" @keyup.enter.native="onSearchBtnClick"/>
          <el-input v-model="unit_no" size="small" style="width: 150px;" placeholder="户名称" @keyup.enter.native="onSearchBtnClick"/>
          <el-input v-model="cert_no" size="small" style="width: 150px;" placeholder="产权证号" @keyup.enter.native="onSearchBtnClick"/>
          <el-button type="primary" size="small" @click="onSearchBtnClick">查询</el-button>
          <el-button size="small" @click="onClearBtnClick">清空</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row style="padding:5px">
      <el-table v-loading="loading" :data="valueList" :header-cell-style="changeHeaderStyle" style="width:100%" border fit stripe size="small" >
        <el-table-column label="序号" type="index" width="50" align="center"/>
        <el-table-column prop="prj_name" min-width="250" label="楼盘名称" align="center"/>
        <!-- <el-table-column prop="district" label="行政区" align="center"/>
        <el-table-column prop="usage" label="用途" align="center"/> -->
        <el-table-column prop="bldg_name" label="楼栋名称" align="center"/>
        <el-table-column prop="unit_no" label="房号" align="center"/>
        <el-table-column prop="floor_no" label="实际层" align="center"/>
        <el-table-column prop="built_area" label="建筑面积" align="center"/>
        <el-table-column prop="each_price" label="评估单价" align="center"/>
        <el-table-column prop="total_price" label="评估总价" align="center"/>
        <el-table-column label="价值时点" min-width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.value_date }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px">
        <pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :page-sizes="listQuery.pageSizes"
          @pagination="getData" />
      </el-row>
    </el-row>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getDictionary } from '@/api/common'
import { getAppraisedvalues } from '@/api/data'
export default {
  components: { Pagination },
  data() {
    return {
      value_date: '2018-04-01',
      usage: '住宅',
      district: '',
      prj_name: '',
      bldg_name: '',
      unit_no: '',
      cert_no: '',
      value_dateOptions: '',
      usageOptions: '',
      districtOptions: '',

      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      valueList: [],
      loading: true
    }
  },
  created() {
    this.getOption()
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取下拉选项
    getOption() {
      getDictionary('用途主类').then(response => {
        this.usageOptions = response.data
      })
      getDictionary('行政区').then(response => {
        this.districtOptions = response.data
      })
      getDictionary('价值时点').then(response => {
        this.value_dateOptions = response.data
        this.value_date = this.value_dateOptions[0]
      })
    },
    // 查询
    onSearchBtnClick: function() {
      if (this.cert_no !== '') {
        this.getData()
      } else if (this.unit_no !== '') {
        if (this.bldg_name === '' || this.prj_name === '') {
          alert('为了能精确的查询户相关信息，请填写楼盘名称和楼栋名称')
        } else {
          this.getData()
        }
      } else if (this.bldg_name !== '') {
        if (this.prj_name === '') {
          alert('为了能精确的查询楼栋相关信息，请填写楼盘名称')
        } else {
          this.getData()
        }
      } else {
        this.getData()
      }
    },
    getData(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      const params = { 'usage': this.usage, 'district': this.district.length === 0 ? null : this.district.toString(), 'prj_name': this.prj_name === '' ? null : this.prj_name, 'bldg_name': this.bldg_name === '' ? null : this.bldg_name, 'unit_no': this.unit_no === '' ? null : this.unit_no, 'cert_no': this.cert_no === '' ? null : this.cert_no, 'value_date': this.value_date === '' ? null : this.value_date, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
      this.loading = true
      getAppraisedvalues(params).then(response => {
        this.valueList = response.data
        this.listQuery.total = response.total_num
        this.loading = false
      })
    },

    // 清空
    onClearBtnClick: function() {
      this.value_date = this.value_dateOptions[0]
      this.usage = '住宅'
      this.district = []
      this.prj_name = ''
      this.bldg_name = ''
      this.unit_no = ''
      this.cert_no = ''
      this.getData()
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
    text-align: center;
}
.search {
  margin-bottom: 0;
  .el-input-group__append {
    background-color: #fc6767;
    color: white;
  }
  .search__top {
    background: #F0F0F0;
    overflow: hidden;
    .el-row {
      padding: 10px;
      margin: 10px 0 10px 0px;
      background: #fff;
      div:first-child {
        input::-webkit-input-placeholder {
          color: #000;
        }
      }
      .el-select{
         margin-right: 10px;
      }
      .el-input{
         margin-right: 10px;
      }
      .fr {
        float: right;
      }
    }
    .btn {
      overflow: hidden;
      padding: 10px 0 10px 10px;
      span {
        &:nth-child(1) {
          float: left;
        }
        &:nth-child(2) {
          float: right;
          margin-right: 10px;
        }
        .el-button {
          border-radius: 0;
          margin-left: 0;
        }
      }
    }
  }
}
</style>
