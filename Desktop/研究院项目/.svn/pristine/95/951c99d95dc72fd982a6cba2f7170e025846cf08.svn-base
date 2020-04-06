<template>
  <el-dialog :visible.sync="visible" title="户编辑" width="50%" >
    <el-form ref="editForm" :rules="rules" :model="house" label-width="100px">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-form-item label="户号" prop="unit_no">
            <el-input v-model="house.unit_no" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="楼栋名称：" prop="bldg_name">
            <el-input v-model="house.bldg_name " size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="所在层：" prop="floor_no">
            <el-input-number v-model.number="house.floor_no" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面积：" prop="house_area">
            <el-input-number :precision="2" v-model.number="house.house_area" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="分摊面积：" >
            <el-input-number :precision="2" v-model.number="house.house_area_comm" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="室号部位：">
            <el-input v-model="house.house_part " size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="户型：" >
            <el-select v-model="house.dwelling_size" size="small" placeholder="请选择户型" style="width: 100%;" >
              <el-option
                v-for="(item, index) in dwelling_sizeOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户型结构：">
            <el-select v-model="house.dwelling_struc" size="small" placeholder="请选择户型结构" style="width: 100%;" >
              <el-option
                v-for="(item, index) in dwelling_strucOptions"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="用途大类：" prop="bldg_usage1">
            <el-select v-model="house.house_usage1" size="small" placeholder="请选择用途大类" style="width: 100%;" >
              <el-option
                v-for="(item, index) in house_usage1Options"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用途小类：" >
            <el-select v-model="house.house_usage2" size="small" placeholder="请选择用途小类" style="width: 100%;" >
              <el-option
                v-for="(item, index) in house_usage2Options"
                :key="index"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="房屋性质：" >
            <el-select v-model="house.house_attr" size="small" placeholder="请选择房屋性质" style="width: 100%;" >
              <el-option
                v-for="(item, index) in house_attrOptions"
                :key="index"
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
</template>
<script>
import {
  editImportationUnits
} from '@/api/data'
import { getDictionary } from '@/api/common'
export default {
  props: {
    house: {
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
      dwelling_sizeOptions: [],
      dwelling_strucOptions: [],
      house_usage1Options: [],
      house_usage2Options: [],
      house_attrOptions: [],
      rules: {
        unit_no: [{ type: 'string', required: true, message: '请输入户号', trigger: 'blur' }],
        bldg_name: [{ type: 'string', required: true, message: '请输入楼栋名称', trigger: 'blur' }],
        floor_no: [{ type: 'number', required: true, message: '请输入所在层', trigger: 'blur' }],
        house_area: [{ type: 'number', required: true, message: '请输入面积', trigger: 'blur' }],
        house_usage1: [{ type: 'string', required: true, message: '请选择用途大类', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'house.house_usage1'(val) {
      getDictionary(val + '用途小类').then(response => {
        this.house_usage2Options = response.data
      })
    }
  },
  mounted() {
    this.getOption()
  },
  methods: {
  // 获取下拉选项
    getOption() {
      getDictionary('户型').then(response => {
        this.dwelling_sizeOptions = response.data
      })
      getDictionary('户型结构').then(response => {
        this.dwelling_strucOptions = response.data
      })
      getDictionary('用途主类').then(response => {
        this.house_usage1Options = response.data
      })
      getDictionary('性质主类').then(response => {
        this.house_attrOptions = response.data
      })
    },
    // 编辑时保存楼盘数据
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editImportationUnits(this.house.house_no, this.house).then(response => {
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
