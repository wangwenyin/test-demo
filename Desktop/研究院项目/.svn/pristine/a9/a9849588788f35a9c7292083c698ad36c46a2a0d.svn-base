<template>
  <el-dialog :visible.sync="visible" title="土地编辑" width="50%" >
    <el-form ref="editForm" :rules="rules" :model="land" label-width="120px">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-form-item label="宗地号：" >
            <el-input v-model="land.parcel_no" size="small" readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宗地面积：" prop="land_area">
            <el-input-number :precision="2" v-model.number="land.land_area" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="行政区：" prop="district">
            <el-select v-model="land.district" size="small" placeholder="请选择行政区" style="width: 100%;" >
              <el-option
                v-for="(item ,index) in districtOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="街道办：">
            <el-select v-model="land.subdistrict" size="small" placeholder="请选择街道办" style="width: 100%;">
              <el-option
                v-for="(item ,index) in subdistrictOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="土地用途：" prop="land_usage">
            <el-select v-model="land.land_usage" size="small" placeholder="请选择土地用途" style="width: 100%;" >
              <el-option
                v-for="(item ,index) in land_usageOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="土地等级：" >
            <el-select v-model="land.land_grade" size="small" placeholder="请选择土地等级" style="width: 100%;">
              <el-option
                v-for="(item ,index) in land_gradeOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="土地价格：" >
            <el-input-number :precision="2" v-model.number="land.land_price" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权利类型：" prop="land_type">
            <el-select v-model="land.land_type" size="small" placeholder="请选择权利类型" style="width: 100%;" >
              <el-option
                v-for="(item ,index) in land_typeOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="权利性质：" prop="land_attr">
            <el-select v-model="land.land_attr" size="small" placeholder="请选择权利性质" style="width: 100%;" >
              <el-option
                v-for="(item ,index) in land_attrOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="容积率：" >
            <el-input-number :precision="2" v-model.number="land.plot_ratio" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="建筑密度：" >
            <el-input-number :precision="2" v-model.number="land.built_density" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="土地使用年限：" prop="land_term">
            <el-input-number :precision="0" v-model.number="land.land_term " size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="起始日期：" prop="start_date">
            <el-date-picker
              v-model="land.start_date"
              type="date"
              size="small"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="终止日期：" prop="end_date">
            <el-date-picker
              v-model="land.end_date"
              size="small"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="X坐标：" >
            <el-input-number :precision="4" v-model.number="land.x" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Y坐标：" >
            <el-input-number :precision="4" v-model.number="land.y" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="24">
          <el-form-item label="地理位置：">
            <el-input v-model="land.address" size="small" />
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
  editImportationLands
} from '@/api/data'
import { getDictionary } from '@/api/common'
export default {
  props: {
    land: {
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
      land_usageOptions: [],
      land_gradeOptions: [],
      land_typeOptions: [],
      land_attrOptions: [],
      rules: {
        district: [{ type: 'string', required: true, message: '请选择行政区', trigger: 'blur' }],
        subdistrict: [{ type: 'string', required: true, message: '请选择街道办', trigger: 'blur' }],
        land_area: [{ type: 'number', required: true, message: '请输入土地面积', trigger: 'blur' }],
        land_usage: [{ type: 'string', required: true, message: '请选择用途', trigger: 'blur' }],
        land_type: [{ type: 'string', required: true, message: '请选择权利类型', trigger: 'blur' }],
        land_attr: [{ type: 'string', required: true, message: '请选择权利性质', trigger: 'blur' }],
        land_term: [{ type: 'number', required: false, message: '请输入使用年期', trigger: 'blur' }],
        start_date: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
        end_date: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }]
      },
      sourceLand: {}
    }
  },
  watch: {
    'land.district'(val) {
      getDictionary(val + '街道').then(response => {
        this.subdistrictOptions = response.data
      })
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
        this.land_usageOptions = response.data
      })
      getDictionary('土地等级').then(response => {
        this.land_gradeOptions = response.data
      })
      getDictionary('土地权利类型').then(response => {
        this.land_typeOptions = response.data
      })
      getDictionary('土地权利性质').then(response => {
        this.land_attrOptions = response.data
      })
    },
    // 编辑时保存楼盘数据
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editImportationLands(this.land.parcel_no, this.land).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功!'
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
          return false
        }
      })
    },
    // 编辑框，取消按钮
    onCancel() {
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
