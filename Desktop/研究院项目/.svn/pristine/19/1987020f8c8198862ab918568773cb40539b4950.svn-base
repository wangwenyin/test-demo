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
            <div class="col-item-label">行政区：</div>
            <div class="col-item-label">参数来源：</div>
            <div class="col-item-label">备注：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ baseinfo.creator }}</div>
            <div class="col-item-value">{{ baseinfo.scope }}</div>
            <div class="col-item-value">{{ baseinfo.source }}</div>
            <div class="col-item-value">{{ baseinfo.remark }}</div>
          </el-col>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">创建日期：</div>
            <div class="col-item-label">物业类型：</div>
            <div class="col-item-label">基准日期：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ baseinfo.create_date }}</div>
            <div class="col-item-value">{{ baseinfo.property_type }}</div>
            <div class="col-item-value">{{ baseinfo.base_date }}</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-label">参数类型：</div>
            <div class="col-item-label">物业用途：</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-value">{{ baseinfo.param_type }}</div>
            <div class="col-item-value">{{ baseinfo.property_usage }}</div>
          </el-col>
        </el-row>
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="24">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">参数信息</div>
          </el-col>
        </el-row>
        <el-table :data="tableData" :header-cell-style="changeHeaderStyle" :span-method="objectSpanMethod" border size="small" style="width: 100%; margin-top: 20px">
          <el-table-column prop="usage1" label="物业用途" />
          <el-table-column prop="usage2" label="用途子类" />
          <el-table-column prop="built_cost" label="建安造价" />
          <el-table-column prop="indirect_cost" label="间接费用" />
          <el-table-column prop="dev_profit" label="开发利润" />
          <el-table-column prop="use_term" label="耐用年限" />
          <el-table-column prop="left_ratio" label="残值率" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="onUpdateParamInfo(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="editBaseDialogFormVisible" title="修改基本信息" width="35%">
      <el-form ref="editForm" :model="editBaseinfo" :rules="baseRules" label-width="100px" size="small" >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="source" label="参数来源" >
              <el-input v-model="editBaseinfo.source" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="基准日期" prop="base_date">
              <el-date-picker
                v-model="editBaseinfo.base_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%;"/>
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
    <el-dialog :visible.sync="editCostDialogFormVisible" title="修改建安造价" width="40%">
      <el-form ref="editCostForm" :model="editCostinfo" :rules="costRules" label-width="100px" size="small" >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="usage1" label="物业用途" >
              <el-input v-model="editCostinfo.usage1" auto-complete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="usage2" label="用途子类" >
              <el-input v-model="editCostinfo.usage2" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="built_cost" label="建安造价" >
              <el-input-number v-model="editCostinfo.built_cost" class="input-number" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="indirect_cost" label="间接费用" >
              <el-input-number v-model="editCostinfo.indirect_cost" :precision="2" :step="0.01" class="input-number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="dev_profit" label="开发利润" >
              <el-input-number v-model="editCostinfo.dev_profit" :precision="2" :step="0.01" class="input-number" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="use_term" label="耐用年限" >
              <el-input-number v-model="editCostinfo.use_term" class="input-number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="left_ratio" label="残值率" >
              <el-input-number v-model="editCostinfo.left_ratio" :precision="2" :step="0.01" class="input-number" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onCostCancelClick">取 消</el-button>
        <el-button type="primary" @click="onCostComfirmClick('editCostForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPriceIndexDetailById, updatePriceIndexDetailById, getBuiltCostList, updateBuiltCostList } from '@/api/priceIndex'
export default {
  data() {
    return {
      tableData: [],
      baseinfo: {},
      editBaseinfo: {},
      editCostinfo: {},
      editBaseDialogFormVisible: false,
      editCostDialogFormVisible: false,
      baseRules: {
        source: [
          { required: true, message: '请输入参数来源', trigger: 'blur' }
        ],
        base_date: [
          { required: true, message: '请输入基准日期', trigger: 'blur' }
        ]
      },
      costRules: {
        usage1: [
          { required: true, message: '请输入物业用途', trigger: 'blur' }
        ],
        usage2: [
          { required: true, message: '请输入用途子类', trigger: 'blur' }
        ],
        built_cost: [
          { required: true, message: '请输入建安造价', trigger: 'blur' }
        ],
        indirect_cost: [
          { required: true, message: '请输入间接费用', trigger: 'blur' }
        ],
        dev_profit: [
          { required: true, message: '请输入开发利润', trigger: 'blur' }
        ],
        use_term: [
          { required: true, message: '请输入耐用年限', trigger: 'blur' }
        ],
        left_ratio: [
          { required: true, message: '请输入残值率', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getPriceIndexDetailById()
    // 获取建安造价详情
    this.getHcDetail()
  },
  methods: {
    onCostCancelClick() {
      this.editCostDialogFormVisible = false
    },
    onCostComfirmClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateBuiltCostList(this.id, this.editCostinfo).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.editCostDialogFormVisible = false
              this.getHcDetail()
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
    getPriceIndexDetailById() {
      getPriceIndexDetailById(this.id).then(res => {
        if (res.code === 200) {
          this.baseinfo = res.data
          this.editBaseinfo = JSON.parse(JSON.stringify(res.data))
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onUpdateParamInfo(index, row) {
      this.editCostinfo = {
        usage1: row.usage1,
        usage2: row.usage2,
        built_cost: row.built_cost,
        indirect_cost: row.indirect_cost,
        dev_profit: row.dev_profit,
        use_term: row.use_term,
        left_ratio: row.left_ratio
      }
      this.editCostDialogFormVisible = true
      this.$refs['editCostForm'].resetFields()
    },
    onEditClick() {
      this.editBaseDialogFormVisible = true
      /* this.$refs['editForm'].resetFields() */
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
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    getHcDetail() {
      getBuiltCostList(this.id).then(res => {
        this.tableData = res.data
      })
    },
    // 合并行或列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex === 4) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 6) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 8) {
          return {
            rowspan: 6,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.row-container{
    padding: 10px;
    /* margin-top: 10px; */
}
.col-item-label {
    margin-bottom: 20px;
    color: grey;
    text-align: left;
}
.col-item-value {
    margin-bottom: 20px;
    color: grey;
    height: 18px;
    text-align: left;
     overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}
.edit-button {
  position:absolute;
  top:20px;
  right: 0px;
  z-index: 10;
}
.input-number {
  width:263px
}
</style>
