<template>
  <el-dialog :visible.sync="visible" title="楼盘编辑" width="50%" >
    <el-form ref="editForm" :rules="rules" :model="building" label-width="100px">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-form-item label="楼栋名称：" prop="bldg_name">
            <el-input v-model="building.bldg_name" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="楼盘名称：" prop="prj_name">
            <el-input v-model="building.prj_name " size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item size="small" label="宗地号：" prop="parcel_no">
            <el-input v-model="building.parcel_no " size="small" />
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
          <el-form-item size="small" label="竣工日期：" prop="const_enddate">
            <el-date-picker
              v-model="building.const_enddate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="楼栋性质：" >
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
            <el-input-number :precision="2" v-model.number="building.bldg_area" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="占地面积：" >
            <el-input-number :precision="2" v-model.number="building.land_area" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="总层数：" prop="bldg_floors">
            <el-input-number :precision="0" v-model.number="building.bldg_floors" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总户数：" >
            <el-input-number :precision="0" v-model.number="building.unit_num" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="房屋用途1：" prop="bldg_usage1">
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
</template>
<script>
import {
  editImportationBuildings
} from '@/api/data'
import { getDictionary } from '@/api/common'
export default {
  props: {
    building: {
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
      bldg_attrOptions: [],
      bldg_usage1Options: [],
      bldg_usage2Options: [],
      bldg_strucOptions: [],
      usageOptions: [],
      rules: {
        bldg_name: [{ type: 'string', required: true, message: '请输入楼栋名称', trigger: 'blur' }],
        prj_name: [{ type: 'string', required: true, message: '请输入楼盘名称', trigger: 'blur' }],
        const_enddate: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
        bldg_area: [{ type: 'number', required: true, message: '请输入面积', trigger: 'blur' }],
        bldg_floors: [{ type: 'number', required: false, message: '请输入总层数', trigger: 'blur' }],
        bldg_usage1: [{ type: 'string', required: true, message: '请输入房屋用途1', trigger: 'blur' }],
        parcel_no: [{ type: 'string', required: true, message: '请输入宗地号', trigger: 'blur' }]
      },
      contain_usage: []
    }
  },
  watch: {
    'building.bldg_usage1'(val) {
      getDictionary(val + '用途细类').then(response => {
        this.bldg_usage2Options = response.data
      })
    },
    visible(val) {
      if (val) {
        if (this.building.contain_usage) {
          this.contain_usage = this.building.contain_usage.split(';')
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
      getDictionary('用途主类').then(response => {
        this.usageOptions = response.data
      })
    },
    // 编辑时保存楼盘数据
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.building.contain_usage = this.contain_usage !== null ? this.contain_usage.toString().replace(',', ';') : ''
          editImportationBuildings(this.building.bldg_no, this.building).then(response => {
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
