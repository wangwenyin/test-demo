<template>
  <div>
    <el-row class="search-box" >
      <el-input v-model="searchOption.text" placeholder="请输入查询内容" size="small" style="float:right;margin-right:10px;width:400px" >
        <el-select slot="prepend" v-model="searchOption.clause" style="width:120px;" placeholder="请选择">
          <el-option label="指数名称" value="指数名称"/>
          <el-option label="物业类型" value="物业类型"/>
          <el-option label="物业用途" value="物业用途"/>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="onSearchClick"/>
      </el-input>
    </el-row>
    <div style="margin:10px;">
      <el-table :data="priceIndexList" :header-cell-style="changeHeaderStyle" style="width: 100%;" border fit size="small">
        <el-table-column label="序号" type="index" width="50" align="center"/>
        <el-table-column label="指数名称" min-width="200" align="center" prop="name" />
        <el-table-column label="行政区" align="center" prop="scope" />
        <el-table-column label="物业类型" align="center" prop="property_type" />
        <el-table-column label="物业用途" align="center" prop="property_usage" />
        <el-table-column label="时间类型" align="center" prop="date_type" />
        <el-table-column label="参数类型" align="center" prop="param_type" />
        <el-table-column label="指数来源" align="center" prop="source" />
        <el-table-column label="基准日期" align="center" prop="base_date" />
        <el-table-column label="操作" align="center" width="100" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onDetailClick(scope.$index, scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px">
        <pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getPriceIndex" />
      </el-row>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getPriceIndexList } from '@/api/priceIndex'
export default {
  components: { Pagination },
  data() {
    return {
      searchOption: {
        clause: '请选择',
        text: null
      },
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      priceIndexList: []
    }
  },
  mounted() {
    this.getPriceIndex()
  },
  methods: {
    getPriceIndex(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        condition: this.searchOption.clause === '请选择' ? '指数名称' : this.searchOption.clause,
        content: this.searchOption.text === '' ? null : this.searchOption.text
      }
      getPriceIndexList(params).then(res => {
        if (res.code === 200) {
          this.priceIndexList = res.data
          this.listQuery.total = res.total_num
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
      /* this.$http.get('src/mock/priceIndex.json', params).then(response => {
        this.priceIndexList = response.data.data
        this.listQuery.total = response.data.data.length
      }, response => {
        console.log('数据加载失败')
      }) */
    },
    onDetailClick(index, row) {
      switch (row.param_type) {
        case '基准地价':
          this.$router.push({ name: 'BasicLandPrice', query: { id: row.id }})
          break
        case '建安造价':
          this.$router.push({ name: 'HousingCost', query: { id: row.id }})
          break
        default:
          this.$router.push({ name: 'PriceDetail', query: { id: row.id }})
      }
      // const task = JSON.stringify(this.tableData[index])
      // localStorage.setItem('curTask', task)
      // this.$router.push({ name: 'PriceDetail' })
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    onSearchClick() {
      this.getPriceIndex({ page: 1, limit: 10 })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
