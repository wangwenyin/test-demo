
<template>
  <div >
    <el-row >
      <el-col :span="18" :offset="3">
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="4">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">{{ building.bldg_name }} </div>
          </el-col>
          <el-col :span="4">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">
              <el-radio-group v-model="usage" size="mini">
                <el-radio v-for="item in options" v-show="item!==''" :label="item" :key="item"/>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="row-container" style="float:right">
              <el-button type="primary" size="small" @click="onEditClick">编辑</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">楼栋名称：</div>
            <div class="col-item-label">楼盘名称：</div>
            <div class="col-item-label">宗地号：</div>
            <div class="col-item-label">竣工日期：</div>
            <div class="col-item-label">建筑面积：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ building.bldg_name }}</div>
            <div class="col-item-value">{{ building.prj_name }}</div>
            <div class="col-item-value">{{ building.parcel_no }}</div>
            <div class="col-item-value">{{ building.const_enddate|formatDate }}</div>
            <div class="col-item-value">{{ building.bldg_area }}</div>
          </el-col>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">占地面积：</div>
            <div class="col-item-label">总层数：</div>
            <div class="col-item-label">房屋数量：</div>
            <div class="col-item-label">房屋性质：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ building.land_area }}</div>
            <div class="col-item-value">{{ building.bldg_floors }}</div>
            <div class="col-item-value">{{ building.unit_num }}</div>
            <div class="col-item-value">{{ building.bldg_attr }}</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-label">房屋用途1：</div>
            <div class="col-item-label">房屋用途2：</div>
            <div class="col-item-label">房屋结构1：</div>
            <div class="col-item-label">房屋结构2：</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-value">{{ building.bldg_usage1 }}</div>
            <div class="col-item-value">{{ building.bldg_usage2 }}</div>
            <div class="col-item-value">{{ building.bldg_struc1 }}</div>
            <div class="col-item-value">{{ building.bldg_struc2 }}</div>
          </el-col>
        </el-row>
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="4">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">房屋列表 </div>
          </el-col>
          <el-col :span="20">
            <div class="row-container" style="float:right">
              <el-radio-group v-model="isalluse" size="small" class="right" @change="onIsAllUseClick">
                <el-radio-button label="部分"/>
                <el-radio-button label="全部"/>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding:5px">
          <el-table v-loading="loading" :header-cell-style="changeHeaderStyle" :data="showhouseList" border size="small">
            <el-table-column width="50" type="index" label="编号" align="center"/>
            <el-table-column prop="house_no" min-width="150" label="房号"/>
            <el-table-column prop="floor_no" label="实际层"/>
            <el-table-column prop="house_area" label="建筑面积"/>
            <el-table-column prop="dwelling_size" label="户型"/>
            <el-table-column prop="dwelling_struc" label="户型结构"/>
            <el-table-column prop="house_attr" label="房屋性质"/>
            <el-table-column prop="house_usage1" label="房屋用途1">
              <template slot-scope="scope">
                <useTag :tags="scope.row.house_usage1"/>
              </template>
            </el-table-column>
            <el-table-column prop="house_usage2" label="房屋用途2"/>
          </el-table>
          <pagination
            :total="listQuery.total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :page-sizes="listQuery.pageSizes"
            @pagination="getHouseList" />
        </el-row>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="editFormVisible" title="楼栋编辑" width="50%" >
      <el-form ref="editForm" :rules="rules" :model="building" label-width="100px">
        <el-row :gutter="20" style="margin-top:20px;">
          <el-col :span="12">
            <el-form-item label="楼栋名称：" prop="bldg_name">
              <el-input v-model="building.bldg_name" maxlength="100" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼盘名称：" prop="prj_name" >
              <el-input v-model="building.prj_name " maxlength="100" size="small" readonly="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item size="small" label="竣工日期：">
              <el-date-picker
                v-model="building.const_enddate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋性质：" >
              <el-select v-model="building.bldg_attr" size="small" placeholder="请选择房屋性质" style="width: 100%;">
                <el-option
                  v-for="item in bldg_attrOptions"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="建筑面积：" prop="bldg_area">
              <el-input-number :precision="2" v-model.number="building.bldg_area" min="0" max="100000" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地面积：" prop="land_area">
              <el-input-number :precision="2" v-model.number="building.land_area" size="small" min="0" max="100000" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="总层数：" prop="bldg_floors">
              <el-input-number v-model.number="building.bldg_floors" size="small" min="0" max="1000"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋数量：" prop="unit_num">
              <el-input-number v-model.number="building.unit_num" size="small" min="0" max="10000"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="房屋用途1：" >
              <el-select v-model="building.bldg_usage1" size="small" placeholder="请选择房屋用途" style="width: 100%;" >
                <el-option
                  v-for="item in bldg_usage1Options"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋用途2：" >
              <el-select v-model="building.bldg_usage2" size="small" placeholder="请选择房屋用途" style="width: 100%;" >
                <el-option
                  v-for="item in bldg_usage2Options"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="房屋结构1：" >
              <el-select v-model="building.bldg_struc1" size="small" placeholder="请选择房屋结构" style="width: 100%;" >
                <el-option
                  v-for="item in bldg_strucOptions"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房屋结构2：" >
              <el-select v-model="building.bldg_struc2" size="small" placeholder="请选择房屋结构" style="width: 100%;" >
                <el-option
                  v-for="item in bldg_strucOptions"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button type="primary" size="small" @click="onBtnOKClick('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import useTag from '@/views/property/components/UseTag'
import Pagination from '@/components/Pagination'
import {
  buildingInfo,
  buildingHouses,
  buildingEdit
} from '@/api/data'
import { formatDate } from '@/utils/date'
import { getDictionary } from '@/api/common'
export default {
  components: { useTag, Pagination },
  filters: {
    formatDate(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      bldg_attrOptions: [],
      bldg_usage1Options: [],
      bldg_usage2Options: [],
      bldg_strucOptions: [],
      usage: this.$route.query.usage,
      building: {},
      houseList: [],
      showhouseList: [],
      options: [],
      isalluse: '全部',
      editFormVisible: false,
      rules: {
        bldg_name: [{ type: 'string', required: true, message: '请输入楼栋名称', trigger: 'blur' }],
        prj_name: [{ type: 'string', required: true, message: '请输入楼盘名称', trigger: 'blur' }],
        bldg_area: [{ required: true, message: '请输入建筑面积', trigger: 'blur' },
          { type: 'number', message: '建筑面积为数值类型', trigger: 'blur' }],
        land_area: [{ type: 'number', required: false, message: '占地面积必须为数值', trigger: 'blur' }],
        bldg_floors: [{ required: true, message: '请输入总层数', trigger: 'blur' },
          { type: 'number', message: '总层数为数值类型', trigger: 'blur' }],
        unit_num: [{ type: 'number', required: false, message: '房屋数量必须为数值', trigger: 'blur' }],
        bldg_usage1: [{ type: 'string', required: true, message: '请输入房屋用途1', trigger: 'blur' }]
      },
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      loading: true
    }
  },
  watch: {
    usage(val, val2) {
      this.onIsAllUseClick()
    },
    'building.bldg_usage1'(val) {
      this.building.bldg_usage2 = ''
      getDictionary(val + '用途细类').then(response => {
        this.bldg_usage2Options = response.data
      })
    }
  },
  created() {
    this.getOption()
  },
  mounted() {
    this.getBuilding()
    this.getHouseList()
    this.$nextTick(function() {
      window.addEventListener('scroll', this.onScroll)
    })
  },
  methods: {
    // 获取下拉选项
    getOption() {
      getDictionary('性质主类').then(response => {
        this.bldg_attrOptions = response.data
      })
      getDictionary('用途主类').then(response => {
        this.bldg_usage1Options = response.data
      })
      getDictionary(this.$route.query.usage + '用途细类').then(response => {
        this.bldg_usage2Options = response.data
      })
      getDictionary('房屋结构').then(response => {
        this.bldg_strucOptions = response.data
      })
    },
    getBuilding() {
      buildingInfo(this.$route.query.bldg_no).then(response => {
        this.building = response.data
        this.options = this.building.contain_usage.split(';')
      })
    },
    getHouseList(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      var param = { bldg_no: this.$route.query.bldg_no, usage: this.$route.query.usage, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
      this.loading = true
      buildingHouses(param).then(response => {
        this.houseList = response.data
        this.listQuery.total = response.total_num
        this.loading = false
        this.onIsAllUseClick()
      })
      this.onIsAllUseClick()
    },
    // 楼栋列表切换全部和部分
    onIsAllUseClick() {
      if (this.isalluse === '全部') {
        this.showhouseList = this.houseList
      } else {
        const tempList = []
        this.houseList.forEach(element => {
          if (element.house_usage1.indexOf(this.usage) !== -1) {
            tempList.push(element)
          }
        })
        this.showhouseList = tempList
      }
    },
    onEditClick() {
      this.editFormVisible = true
    },
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.building.bldg_struc2 !== '' && this.building.bldg_struc2 === this.building.bldg_struc1) {
            this.$message({
              type: 'info',
              message: '房屋结构1和房屋结构2不能选相同的值!'
            })
            return false
          } else {
            buildingEdit(this.$route.query.bldg_no, this.building).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
                this.editFormVisible = false
                this.getBuilding()
              } else {
                this.$message({
                  type: 'info',
                  message: response.msg
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.editFormVisible = false
      this.getBuilding()
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
.high.el-row{
  margin-top: 2%
}
.el-radio__inner {
    visibility: hidden
}
.el-radio+.el-radio{
  margin-left: -7px
}
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
.task-detail .el-step {
  &:hover {
    .el-step__head .el-step__icon, .el-step__main {
      transition: transform 0.3s ease;
      transform: scale(1.1);
      transform-origin: center;
    }
  }
  .el-step__head .el-step__icon, .el-step__main {
    cursor: pointer;
    transition: transform 0.3s ease;
    transform-origin: center;
  }
}
.el-dialog__body{
    margin-left: 20px;
    margin-right: 60px;
}
.el-dialog__footer {
    padding: 0px 80px 30px;
}
.el-dialog__header {
    padding: 30px 60px 0px;
}
.el-pagination {
    text-align: center;
}
.el-input-number--small{
      width: 100%;
}
</style>
