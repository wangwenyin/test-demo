
<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="8">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">{{ baseinfo.name }} </div>
          </el-col>
          <el-col :span="16">
            <div class="edit-button">
              <el-button type="primary" size="mini" @click="onEditClick">修改</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">创建人：</div>
            <div class="col-item-label">维护时点：</div>
            <div class="col-item-label">物业用途：</div>
            <div class="col-item-label">指数来源：</div>
            <div class="col-item-label">备注：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ baseinfo.creator }}</div>
            <div class="col-item-value">{{ baseinfo.revise_period }}</div>
            <div class="col-item-value">{{ baseinfo.property_usage }}</div>
            <div class="col-item-value">{{ baseinfo.source }}</div>
            <div class="col-item-value">{{ baseinfo.remark }}</div>
          </el-col>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">创建日期：</div>
            <div class="col-item-label">行政区：</div>
            <div class="col-item-label">时间类型：</div>
            <div class="col-item-label">开始日期：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ baseinfo.create_date }}</div>
            <div class="col-item-value">{{ baseinfo.scope }}</div>
            <div class="col-item-value">{{ baseinfo.date_type }}</div>
            <div class="col-item-value">{{ baseinfo.start_date }}</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-label">维护人员：</div>
            <div class="col-item-label">物业类型：</div>
            <div class="col-item-label">指数类型：</div>
            <div class="col-item-label">截止日期：</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-value">{{ baseinfo.reviser }}</div>
            <div class="col-item-value">{{ baseinfo.property_type }}</div>
            <div class="col-item-value"> {{ baseinfo.index_type }}</div>
            <div class="col-item-value"> {{ baseinfo.end_date }}</div>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <div />
          </el-col>
          <el-col v-show="addButton" :span="16" >
            <div class="add-button">
              <el-button type="primary" size="mini" class="add" @click="onAddClick">添加</el-button>
            </div>
          </el-col>
          <el-col v-show="selectYear" :span="16" >
            <div class="select-year">
              <el-date-picker v-model="year" size="mini" type="year" value-format="yyyy" placeholder="选择年" @change="onChangeYearClick"/>
            </div>
          </el-col>
        </el-row>
        <el-tabs @tab-click="onTabClick" >
          <el-tab-pane label="指数列表" >
            <div style="overflow: hidden">
              <el-table :header-cell-style="changeHeaderStyle" :data="priceDetailList1" border size="small" stripe style="width: 50%; float: left">
                <el-table-column prop="period" min-width="100" label="时间"/>
                <el-table-column prop="value" label="指数"/>
                <el-table-column prop="ring_ratio" label="环比"/>
                <el-table-column prop="year_ratio" label="同比" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="onUpdatePriceIndex(scope.$index, scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="onDeletePriceIndex(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :header-cell-style="changeHeaderStyle" :data="priceDetailList2" border size="small" stripe style="width: 50%; float: left">
                <el-table-column prop="period" min-width="100" label="时间"/>
                <el-table-column prop="value" label="指数"/>
                <el-table-column prop="ring_ratio" label="环比"/>
                <el-table-column prop="year_ratio" label="同比" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="onUpdatePriceIndex(scope.$index, scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="onDeletePriceIndex(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <pagination
              :total="listQuery.total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              :page-sizes="listQuery.pageSizes"
              @pagination="getPriceDetailList" />
          </el-tab-pane>
          <el-tab-pane label="指数折线图" >
            <line-chart ref="priceIndexEchart" :data="indexList" :id="id" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="editBaseDialogFormVisible" title="修改基本信息" width="35%">
      <el-form ref="editForm" :model="editBaseinfo" :rules="baseRules" label-width="100px" size="small" >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="source" label="指数来源" >
              <el-input v-model="editBaseinfo.source" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="维护人员" prop="reviser">
              <el-input v-model="editBaseinfo.reviser" auto-complete="off" />
              <!-- <el-select v-model="editForm.department" placeholder="请选择" style="width:100%" >
                <el-option v-for="item in userOptions" :key="item" :label="item" :value="item" />
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="维护时点" prop="revise_period" >
              <el-select v-model="editBaseinfo.revise_period" placeholder="请选择" style="width:100%" >
                <el-option v-for="item in 28" :label="'每月'+ item + '日'" :value="'每月'+ item + '日'" :key="'每月'+ item + '日'" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark" >
              <el-input v-model="editBaseinfo.remark" auto-complete="off" rows="6" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onBtnCancelClick">取 消</el-button>
        <el-button type="primary" @click="onBtnComfirmClick('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="editIndexDialogFormVisible" :title="priceIndexForm.title" width="20%">
      <el-form ref="priceIndexForm" :model="priceIndexForm" :rules="priceRules" label-width="100px" size="small" >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="period" label="时间值" >
              <el-date-picker
                :disabled="priceIndexForm.title === '修改指数'"
                v-model="priceIndexForm.period"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM"
                style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="指数值" prop="value">
              <el-input-number v-model="priceIndexForm.value" style="width:245px" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onIndexCancelClick">取 消</el-button>
        <el-button type="primary" @click="onIndexComfirmClick('priceIndexForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import LineChart from '../components/LineChart'
import { getPriceIndexDetailById, updatePriceIndexDetailById, getPriceIndexById, addOrUpdateIndex } from '@/api/priceIndex'
export default {
  components: { Pagination, LineChart },
  data() {
    return {
      baseinfo: {},
      editBaseinfo: {},
      priceDetailList1: [],
      priceDetailList2: [],
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      addButton: true,
      selectYear: false,
      id: '',
      userOptions: [],
      editBaseDialogFormVisible: false,
      priceIndexData: [],
      priceIndexForm: {},
      editIndexDialogFormVisible: false,
      indexParam: {},
      year: '',
      dataTable: [],
      indexList: [],
      priceRules: {
        period: [
          { required: true, message: '请输入时间', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入指数', trigger: 'blur' }
        ]
      },
      baseRules: {
        source: [
          { required: true, message: '请输入指数来源', trigger: 'blur' }
        ],
        reviser: [
          { required: true, message: '请输入维护人员', trigger: 'blur' }
        ],
        revise_period: [
          { required: true, message: '请输入维护时点', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  },
  created() {
    this.id = this.$route.query.id
    this.year = new Date().getFullYear() - 1 + ''
    // this.onChangeYearClick(this.year)
  },
  mounted() {
    this.getPriceIndexDetailById()
    this.getPriceDetailList()
    this.$nextTick(function() {
      window.addEventListener('scroll', this.onScroll)
    })
  },
  methods: {
    onChangeYearClick(value) {
      this.indexList = []
      const paramEchart = {
        id: this.id,
        index_type: '价格指数',
        page: this.listQuery.page,
        limit: 1000
      }
      getPriceIndexById(this.id, paramEchart).then(res => {
        if (res.code === 200) {
          this.dataTable = res.data
          this.dataTable.forEach(item => {
            if (item.period.includes(value)) {
              this.indexList.push(item)
            }
          })
          this.indexList = this.indexList.reverse()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onBtnComfirmClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePriceIndexDetailById(this.id, this.editBaseinfo).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.baseinfo = this.editBaseinfo
              this.editBaseDialogFormVisible = false
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '网络错误'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onBtnCancelClick() {
      this.editBaseDialogFormVisible = false
    },
    getPriceIndexDetailById() {
      this.baseinfo = []
      this.editBaseinfo = []
      getPriceIndexDetailById(this.id).then(res => {
        if (res.code === 200) {
          this.baseinfo = res.data
          console.log(this.baseinfo)
          this.editBaseinfo = JSON.parse(JSON.stringify(res.data))
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onTabClick(tab, event) {
      if (event.target.innerText === '指数折线图') {
        this.addButton = false
        this.selectYear = true
        this.onChangeYearClick(this.year)
        this.$nextTick(() => {
          this.$refs.priceIndexEchart.chart.resize()
        })
      } else {
        this.addButton = true
        this.selectYear = false
      }
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    getPriceDetailList(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      this.priceDetailList1 = []
      this.priceDetailList2 = []
      const param = {
        id: this.id,
        index_type: '价格指数',
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      getPriceIndexById(this.id, param).then(res => {
        if (res.code === 200) {
          this.dataTable = res.data
          this.priceDetailList1 = res.data.slice(0, this.listQuery.limit / 2)
          this.priceDetailList2 = res.data.slice(this.listQuery.limit / 2, this.listQuery.limit + 1)
          this.listQuery.total = res.total_num
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onAddClick() {
      this.priceIndexForm = {
        title: '添加指数',
        period: null,
        value: null
      }
      this.editIndexDialogFormVisible = true
      this.$refs['priceIndexForm'].resetFields()
    },
    onEditClick() {
      this.editBaseDialogFormVisible = true
      /* this.$refs['editForm'].resetFields() */
    },
    onUpdatePriceIndex(index, row) {
      this.priceIndexForm = {
        title: '修改指数',
        period: row.period,
        value: row.value
      }
      this.editIndexDialogFormVisible = true
      this.$refs['priceIndexForm'].resetFields()
    },
    onIndexCancelClick() {
      this.editIndexDialogFormVisible = false
    },
    addOrUpdateIndex(param, val) {
      addOrUpdateIndex(this.indexParam).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: val + '成功'
          })
          this.editIndexDialogFormVisible = false
          this.getPriceDetailList({ page: 1, limit: 10 })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onIndexComfirmClick(formName) {
      this.indexParam = {
        id: this.id.toString(),
        period: this.priceIndexForm.period,
        value: this.priceIndexForm.value,
        index_type: '价格指数',
        name: this.baseinfo.name
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.priceIndexForm.title === '添加指数') {
            this.indexParam.type = 1
            this.addOrUpdateIndex(this.indexParam, '添加')
          }
          if (this.priceIndexForm.title === '修改指数') {
            this.indexParam.type = 2
            this.addOrUpdateIndex(this.indexParam, '修改')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onDeletePriceIndex(index, row) {
      this.indexParam = {
        id: this.id.toString(),
        period: row.period,
        value: row.value
      }
      this.indexParam.type = 3
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addOrUpdateIndex(this.indexParam, '删除')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.row-container{
    padding: 10px;
    /* margin-top: 10px; */
}
.col-item-label {
    /* margin-top: 10px; */
    margin-bottom: 20px;
    color: grey;
    text-align: left;
}
.col-item-value {
    /* margin-top: 10px; */
    margin-bottom: 20px;
    color: grey;
    height: 18px;
    text-align: left;
     overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}
.el-pagination {
    text-align: center;
}
.add-button {
  position:absolute;
  top:3px;
  right: 0px;
  z-index: 10;
}
.select-year {
  position:absolute;
  top:3px;
  right: 0px;
  z-index: 10;
}
.edit-button {
  position:absolute;
  top:20px;
  right: 0px;
  z-index: 10;
}
</style>

