<template>
  <div class="search">
    <div ref="searchTop" class="search__top">
      <el-row >
        <el-col :span="24" >
          <el-select v-model="type" placeholder="请选择物业类型" size="small" @change="onSearchBtnClick">
            <el-option label="房产" value="房产"/>
            <el-option label="土地" value="土地"/>
          </el-select>
          <el-select v-model="usage" placeholder="请选择物业用途" size="small" @change="onSearchBtnClick">
            <el-option
              v-for="item in usageOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-select v-model="district" placeholder="请选择区域" clearable size="small" @change="onSearchBtnClick">
            <el-option
              v-for="item in districtOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-input v-model="name" style="width: 280px;" size="small" placeholder="请输入宗地或者楼盘名称" @keyup.enter.native="onSearchBtnClick"/>
          <el-button type="primary" size="small" @click="onSearchBtnClick">查询</el-button>
          <el-button type="info" size="small" @click="onClearBtnClick">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <SearchMap ref="baiduMap" :search-value="searchValue" :zoom="zoom" :type="type" :list="List" :center="center" @onTipClick="onDetailCilck"/>
    <div ref="cardList" :class="{ active: isCaseActive }" class="search__popBox">
      <CardList
        v-loading="loading"
        ref="casesBox"
        :list-query="listQuery"
        :list="List"
        :type="type"
        :case-active="isCaseActive"
        @activeChange="onCardListActiveChange"
        @onCardCilck="onCardCilck"
        @getData="getProject"
        @onDetailCilck="onDetailCilck"
      />
    </div>
</div></template>
<script>
import CardList from '@/views/property/components/CardList'
import SearchMap from '@/views/property/components/SearchMap'
import { getDictionary } from '@/api/common'
import { getProjectsList, getLandsList } from '@/api/data'
export default {
  components: {
    SearchMap,
    CardList
  },
  data() {
    return {
      center: { lng: 114.053, lat: 22.5485 },
      type: '房产',
      usage: '住宅',
      district: '',
      name: '',
      List: [],
      usageOptions: [],
      districtOptions: [],
      searchValue: '',
      zoom: 16,
      isCaseActive: true,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      loading: true

    }
  },
  created() {
    this.getOption()
  },
  mounted() {
    this.setHeight()
    window.onresize = () => {
      this.setHeight()
    }
    this.getProject()
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
    },
    // 查询
    onSearchBtnClick: function() {
      this.getProject()
    },
    getProject(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      if (this.type === '土地') {
        const params = { 'usage': this.usage, 'district': this.district.length === 0 ? null : this.district.toString(), 'parcel_no': this.name === '' ? null : this.name, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
        this.loading = true
        getLandsList(params).then(response => {
          this.List = response.data
          this.listQuery.total = response.total_num
          this.loading = false
          this.onCardCilck(this.List[0])
        })
      } else {
        const params = { 'usage': this.usage, 'district': this.district.length === 0 ? null : this.district.toString(), 'name': this.name === '' ? null : this.name, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
        this.loading = true
        getProjectsList(params).then(response => {
          this.List = response.data
          this.listQuery.total = response.total_num
          this.loading = false
          this.onCardCilck(this.List[0])
        })
      }
    },
    // 清空
    onClearBtnClick: function() {
      this.type = '房产'
      this.usage = '住宅'
      this.district = []
      this.name = ''
      this.getProject()
    },

    // 点击卡片 定位
    onCardCilck(val) {
      if (val.x === null) {
        val.x = 113.911
      }
      if (val.y === null) {
        val.y = 22.58
      }
      this.center = {
        lng: val.x,
        lat: val.y
      }
      if (this.type === '土地') { this.searchValue = val.parcel_no } else { this.searchValue = val.prj_name }
    },
    // 点击卡片中详情按钮
    onDetailCilck(val) {
      if (this.type === '土地') {
        const routerData = this.$router.resolve({
          name: 'LandDetail',
          query: { prop_no: val.parcel_no }
        })
        window.open(routerData.href, '_blank')
      } else {
        const routerData = this.$router.resolve({
          name: 'ProjectDetail',
          query: { prj_no: val.prj_no, usage: this.usage }
        })
        window.open(routerData.href, '_blank')
      }
    },
    // 点击卡片控件
    onCardListActiveChange(val) {
      this.isCaseActive = val
    },

    // 设置高度
    setHeight() {
      const clientHeight = document.documentElement.clientHeight
      const topHeight = this.$refs.searchTop.offsetHeight + 51
      this.$refs.baiduMap.$el.style.height = this.$refs.cardList.style.height = clientHeight - topHeight + 'px'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
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
  .search__popBox {
    position: absolute;
    right: -450px;
    bottom: 0;
    width: 450px;
    height: 728px;
    padding: 15px 0px 0px 15px;
    transition: right .5s;
    background: #fff;
    &.active {
      right: 0;
    }
  }
}
.el-loading-parent--relative {
  position: static !important;
}
</style>
