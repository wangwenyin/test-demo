<template>
  <el-dialog :visible.sync="visible" :before-close="onCancel" :title="title" width="50%">
    <el-form ref="editForm" :rules="rules" :model="project" label-width="100px">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-form-item label="楼盘名称：" prop="prj_name">
            <el-input v-model="project.prj_name" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宗地号：" prop="parcel_no">
            <el-input v-model="project.parcel_no" size="small" />
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
          <el-form-item label="街道办：" prop="subdistrict" >
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
          <el-form-item label="地址：" prop="address">
            <el-input v-model="project.address" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="包含用途：">
            <el-select v-model="contain_usage" size="small" multiple placeholder="请选择用途" style="width: 100%;">
              <el-option
                v-for="(item, index) in usageOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="建筑面积：">
            <el-input-number :precision="2" v-model.number="project.prj_area" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="占地面积：" >
            <el-input-number :precision="2" v-model.number="project.land_area" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="容积率：">
            <el-input-number :precision="2" v-model.number="project.plot_ratio" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="建筑年代：" prop="const_year">
            <el-input-number :precision="0" v-model.number="project.const_year" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="总楼栋数：">
            <el-input-number :precision="0" v-model.number="project.bldg_num" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总户数：">
            <el-input-number :precision="0" v-model.number="project.unit_num" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="x坐标：">
            <el-input-number :precision="4" v-model.number="project.x" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="y坐标：">
            <el-input-number :precision="4" v-model.number="project.y" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="onCancel">取 消</el-button>
      <el-button size="small" type="primary" @click="onBtnOKClick('editForm')" >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  addImportationProjects, editImportationProjects
} from '@/api/data'
import { getDictionary } from '@/api/common'
export default {
  props: {
    project: {
      type: Object,
      default: function() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      districtOptions: [],
      subdistrictOptions: [],
      usageOptions: [],
      rules: {
        prj_name: [{ type: 'string', required: true, message: '请输入楼盘名称', trigger: 'blur' }],
        parcel_no: [{ type: 'string', required: true, message: '请输入宗地号', trigger: 'blur' }],
        district: [{ type: 'string', required: true, message: '请选择行政区', trigger: 'change' }],
        subdistrict: [{ type: 'string', required: true, message: '请选择街道', trigger: 'change' }],
        const_year: [{ type: 'number', required: true, message: '建筑年代为4位数字的年份，如：2019', trigger: 'blur' }],
        address: [{ type: 'string', required: true, message: '请填写地址', trigger: 'blur' }]
      },
      contain_usage: [],
      title: ''
    }
  },
  watch: {
    'project.district'(val) {
      getDictionary(val + '街道').then(response => {
        this.subdistrictOptions = response.data
      })
    },
    visible(val) {
      if (val) {
        if (this.project.contain_usage) {
          this.contain_usage = this.project.contain_usage.split(';')
        }
        if (this.project.prj_no) {
          this.title = '编辑楼盘'
        } else {
          this.title = '新增楼盘'
        }
      }
    }
  },
  mounted() {
    this.getOption()
  },
  methods: {
    // 获取下拉选项
    getOption() {
      getDictionary('行政区').then(response => {
        this.districtOptions = response.data
      })
      getDictionary('用途主类').then(response => {
        this.usageOptions = response.data
      })
    },
    // 编辑时保存楼盘数据
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果存在this.project.prj_no则为编辑，否则为新增
          this.project.contain_usage = this.contain_usage !== null ? this.contain_usage.toString().replace(',', ';') : ''
          this.project.const_year = this.project.const_year.toString()
          this.project.prj_area = this.project.prj_area.toString()
          this.project.plot_ratio = this.project.plot_ratio.toString()
          this.project.bldg_num = this.project.bldg_num.toString()
          this.project.unit_num = this.project.unit_num.toString()
          this.project.x = this.project.x.toString()
          this.project.y = this.project.y.toString()
          if (this.project.prj_no) {
            editImportationProjects(this.project.prj_no, this.project).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                })
                this.$emit('onCloseClick', false)
              } else {
                this.$message({
                  type: 'info',
                  message: response.msg
                })
              }
            })
          } else {
            const date = new Date()
            this.project.id = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString()
            addImportationProjects(this.project).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
                this.$emit('onCloseClick', false)
              } else {
                this.$message({
                  type: 'info',
                  message: response.msg
                })
              }
            })
          }
          if (this.$refs['editForm'] !== undefined) {
            this.$nextTick(() => {
              this.$refs['editForm'].resetFields()
            })
          }
        } else {
          return false
        }
      })
    },
    // 编辑框，取消按钮
    onCancel() {
      if (this.$refs['editForm'] !== undefined) {
        this.$nextTick(() => {
          this.$refs['editForm'].resetFields()
        })
      }
      this.$emit('onCloseClick', false)
    }
  }
}
</script>
<style  lang="scss" scoped>
.el-input-number--small{
      width: 100%;
}
</style>
