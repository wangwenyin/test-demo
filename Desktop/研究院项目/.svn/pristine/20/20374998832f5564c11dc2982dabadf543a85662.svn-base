
<template>
  <div >
    <el-row >
      <el-col :span="18" :offset="3">
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="4">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">{{ project.prj_name }} </div>
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
            <div class="col-item-label">楼盘名称：</div>
            <div class="col-item-label">行政区：</div>
            <div class="col-item-label">街道办：</div>
            <div class="col-item-label">地理位置：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ project.prj_name }}</div>
            <div class="col-item-value">{{ project.district }}</div>
            <div class="col-item-value">{{ project.subdistrict }}</div>
            <el-tooltip v-if="project.address" placement="top">
              <div slot="content">{{ project.address }}</div>
              <div class="col-item-value">{{ project.address }}</div>
            </el-tooltip>
          </el-col>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">建筑年代：</div>
            <div class="col-item-label">容积率：</div>
            <div class="col-item-label">楼栋数量：</div>
            <div class="col-item-label">房屋数量：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ project.const_year }}</div>
            <div class="col-item-value">{{ project.plot_ratio }}</div>
            <div class="col-item-value">{{ project.bldg_num }}</div>
            <div class="col-item-value">{{ project.unit_num }}</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-label">建筑面积：</div>
            <div class="col-item-label">x坐标：</div>
            <div class="col-item-label">y坐标：</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-value">{{ project.prj_area }}</div>
            <div class="col-item-value">{{ project.x }}</div>
            <div class="col-item-value"> {{ project.y }}</div>
          </el-col>
        </el-row>
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="4">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">楼栋列表 </div>
          </el-col>
          <el-col :span="20">
            <div class="row-container" style="float:right">
              <el-radio-group v-model="isalluse" size="small" @change="onIsAllUseClick">
                <el-radio-button label="部分"/>
                <el-radio-button label="全部"/>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row style="padding:5px">
          <el-table v-loading="loading" :header-cell-style="changeHeaderStyle" :data="showBulidingsList" border size="small">
            <el-table-column width="50" type="index" label="序号" align="center"/>
            <el-table-column prop="bldg_name" min-width="150" label="楼栋名称"/>
            <el-table-column prop="bldg_floors" label="总层数"/>
            <el-table-column prop="bldg_usage1" label="涵盖性质"/>
            <el-table-column prop="contain_usage" label="涵盖用途">
              <template slot-scope="scope">
                <useTag :tags="scope.row.contain_usage"/>
              </template>
            </el-table-column>
            <el-table-column prop="const_enddate" label="竣工日期">
              <template slot-scope="scope">
                <p> {{ scope.row.const_enddate | formatDate }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="built_area" label="建筑面积"/>
            <el-table-column prop="bldg_usage2" label="涵盖用途2"/>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <router-link :to="{ name:'BuildingDetail' ,query: { bldg_no: scope.row.bldg_no,usage:usage} }" target="_blank">
                  <el-button type="text" size="small">详情</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="listQuery.total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :page-sizes="listQuery.pageSizes"
            @pagination="getBuilding" />
        </el-row>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="editFormVisible" title="楼盘编辑" width="50%" >
      <el-form ref="editForm" :rules="rules" :model="project" label-width="100px">
        <el-row :gutter="20" style="margin-top:20px;">
          <el-col :span="12">
            <el-form-item label="楼盘名称：" prop="prj_name">
              <el-input v-model="project.prj_name" maxlength="100" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑年代：" prop="const_year">
              <el-input-number v-model.number="project.const_year" :max="new Date().getFullYear()" min="1900" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="行政区：" prop="district">
              <el-select v-model="project.district" size="small" placeholder="请选择行政区" style="width: 100%;" >
                <el-option
                  v-for="item in districtOptions"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="街道办：">
              <el-select v-model="project.subdistrict" size="small" placeholder="请选择街道办" style="width: 100%;">
                <el-option
                  v-for="item in subdistrictOptions"
                  :key="item"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="12">
            <el-form-item label="建筑面积：" prop="prj_area">
              <el-input-number :precision="2" v-model.number="project.prj_area" min="0" max="100000" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="容积率：" prop="plot_ratio">
              <el-input-number :precision="2" v-model.number="project.plot_ratio" min="0" max="1000" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="24">
            <el-form-item label="地理位置：">
              <el-input v-model="project.address" maxlength="100" size="small" />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="onBtnOKClick('editForm')" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import useTag from '@/views/property/components/UseTag'
import Pagination from '@/components/Pagination'
import {
  projectInfo,
  getBuildingsList,
  projectEdit
} from '@/api/data'
import { getDictionary } from '@/api/common'
import { formatDate } from '@/utils/date'
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
      districtOptions: [],
      subdistrictOptions: [],
      usage: this.$route.query.usage,
      project: {},
      bulidingsList: [],
      showBulidingsList: [],
      options: [],
      isalluse: '全部',
      editFormVisible: false,
      rules: {
        prj_name: [{ type: 'string', required: true, message: '请输入楼盘名称', trigger: 'blur' }],
        district: [{ type: 'string', required: true, message: '请选择行政区', trigger: 'blur' }],
        prj_area: [{ type: 'number', required: false, message: '建筑面积必须为数值', trigger: 'blur' }],
        plot_ratio: [{ type: 'number', required: false, message: '容积率必须为数值', trigger: 'blur' }],
        const_year: [{ type: 'number', required: false, message: '建筑年代为4位数字的年份，如：2019', trigger: 'blur' }]
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
    'project.district'(val) {
      this.project.subdistrict = ''
      getDictionary(val + '街道').then(response => {
        this.subdistrictOptions = response.data
      })
    }
  },
  created() {
    this.getOption()
  },
  mounted() {
    this.getProject()
    this.getBuilding()
    this.$nextTick(function() {
      window.addEventListener('scroll', this.onScroll)
    })
  },
  methods: {
    // 获取下拉选项
    getOption() {
      getDictionary('行政区').then(response => {
        this.districtOptions = response.data
      })
    },
    getProject() {
      projectInfo(this.$route.query.prj_no).then(response => {
        this.project = response.data
        this.options = this.project.contain_usage.split(';')
      })
    },
    getBuilding(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      var param = { prop_type: '楼盘', prop_no: this.$route.query.prj_no, usage: this.$route.query.usage, 'page': this.listQuery.page, 'limit': this.listQuery.limit }
      this.loading = true
      getBuildingsList(param).then(response => {
        this.bulidingsList = response.data
        this.listQuery.total = response.total_num
        this.loading = false
        this.onIsAllUseClick()
      })
    },
    // 楼栋列表切换全部和部分
    onIsAllUseClick() {
      if (this.isalluse === '全部') {
        this.showBulidingsList = this.bulidingsList
      } else {
        const tempList = []
        this.bulidingsList.forEach(element => {
          if (element.contain_usage.indexOf(this.usage) !== -1) {
            tempList.push(element)
          }
        })
        this.showBulidingsList = tempList
      }
    },
    onEditClick() {
      this.editFormVisible = true
    },
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          projectEdit(this.project.prj_no, this.project).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.editFormVisible = false
              this.getProject()
            } else {
              this.$message({
                type: 'info',
                message: response.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.editFormVisible = false
      this.getProject()
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
