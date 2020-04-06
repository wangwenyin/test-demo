<template>
  <el-dialog :visible.sync="visible" title="构筑物编辑" width="50%" >
    <el-form ref="editForm" :rules="rules" :model="structures" label-width="100px">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-form-item label="名称：" prop="struc_name">
            <el-input v-model="structures.struc_name" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宗地号：" prop="parcel_no">
            <el-input v-model="structures.parcel_no " size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="行政区：" prop="district">
            <el-select v-model="structures.district" size="small" placeholder="请选择行政区" style="width: 100%;" >
              <el-option
                v-for="(item ,index) in districtOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="街道办：" prop="subdistrict">
            <el-select v-model="structures.subdistrict" size="small" placeholder="请选择街道办" style="width: 100%;">
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
          <el-form-item label="地址：" prop="address">
            <el-input v-model="structures.address" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型：" prop="struc_type">
            <el-select v-model="structures.struc_type" size="small" placeholder="请选择类型" style="width: 100%;" >
              <el-option
                v-for="(item, index) in struc_typeOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
        </el-form-item></el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="用途：" prop="struc_usage">
            <el-select v-model="structures.struc_usage" size="small" placeholder="请选择户型结构" style="width: 100%;" >
              <el-option
                v-for="(item, index) in struc_usageOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="终止日期：" prop="const_enddate">
            <el-date-picker
              v-model="structures.const_enddate"
              type="date"
              size="small"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="面积：" prop="struc_area">
            <el-input-number :precision="2" v-model.number="structures.struc_area" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="占地面积：" >
            <el-input-number :precision="2" v-model.number="structures.land_area" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="onCancel">取 消</el-button>
      <el-button type="primary" size="small" @click="onBtnOKClick('editForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  editImportationStructures
} from '@/api/data'
import { getDictionary } from '@/api/common'
export default {
  props: {
    structures: {
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
      struc_typeOptions: [],
      struc_usageOptions: [],
      rules: {
        struc_name: [{ type: 'string', required: true, message: '请输入构筑物名称', trigger: 'blur' }],
        parcel_no: [{ type: 'string', required: true, message: '请输入宗地号', trigger: 'blur' }],
        address: [{ type: 'string', required: true, message: '请输入地址', trigger: 'blur' }],
        district: [{ type: 'string', required: true, message: '请选择行政区', trigger: 'blur' }],
        subdistrict: [{ type: 'string', required: true, message: '请选择街道', trigger: 'blur' }],
        struc_type: [{ type: 'string', required: true, message: '请选择类型', trigger: 'blur' }],
        struc_usage: [{ type: 'string', required: true, message: '请选择用途', trigger: 'blur' }],
        const_enddate: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
        struc_area: [{ type: 'number', required: true, message: '面积必须为数值', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'structures.district'(val) {
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
      // 性质
      getDictionary('构筑物类型').then(response => {
        this.struc_typeOptions = response.data
      })
      getDictionary('用途主类').then(response => {
        this.struc_usageOptions = response.data
      })
    },
    // 编辑时保存楼盘数据
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editImportationStructures(this.structures.struc_no, this.structures).then(response => {
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
