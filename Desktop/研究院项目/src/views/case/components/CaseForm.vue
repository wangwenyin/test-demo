<template>
  <div>
    <el-form ref="caseForm" :rules="rules" :model="caseForm" label-width="100px" label-position="right" size="small" >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="楼盘名称：" prop="prj_name">
            <el-autocomplete
              v-model="caseForm.prj_name"
              :fetch-suggestions="handleProjectSuggestionSearch"
              :trigger-on-focus="false"
              value-key="prj_name"
              placeholder="请输入小区（楼盘）"
              style="width:200px"
              @select="handleProjectSelect"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼栋名称：">
            <el-autocomplete
              v-model="caseForm.bldg_name"
              :fetch-suggestions="handleBuildingSuggestionSearch"
              :trigger-on-focus="false"
              :readonly="isBuildingInputReadonly"
              value-key="bldg_name"
              placeholder="请输入楼栋名称"
              style="width:200px"
              @select="handleBuildingSelect"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号：">
            <el-autocomplete
              v-model="caseForm.unit_no"
              :fetch-suggestions="handleHouseSuggestionSearch"
              :trigger-on-focus="false"
              :readonly="isHouseInputReadonly"
              value-key="unit_no"
              placeholder="请输入房号"
              style="width:200px"
              @select="handleHouseSelect"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="用途：" prop="usage">
            <el-select v-model="caseForm.usage" style="width:200px">
              <el-option
                v-for="item in usages"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="价格类型：" prop="price_type">
            <el-select v-model="caseForm.price_type" style="width:200px" @change="onPriceTypeChange">
              <el-option
                v-for="item in priceTypes"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例类型：" prop="case_type">
            <el-select v-model="caseForm.case_type" style="width:200px">
              <el-option
                v-for="item in caseTypes"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="建筑面积：" prop="built_in_area">
            <el-input-number v-model="caseForm.built_in_area" controls-position="right" style="width:200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总价(元)：" prop="total_price">
            <el-input-number v-model="caseForm.total_price" controls-position="right" style="width:200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单价(元)：">
            <el-input-number v-model="getEachPrice" disabled controls-position="right" style="width:200px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="所在层：">
            <el-input-number v-model="caseForm.case_floor" controls-position="right" style="width:200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户型：">
            <el-select v-model="caseForm.dwelling_size" style="width:200px">
              <el-option
                v-for="item in house_types"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户型结构：">
            <el-select v-model="caseForm.dwelling_struc" style="width:200px">
              <el-option
                v-for="item in house_structures"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="房屋性质：">
            <el-select v-model="caseForm.house_attr" style="width:200px">
              <el-option
                v-for="item in natures"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房屋结构：">
            <el-select v-model="caseForm.house_struc" style="width:200px">
              <el-option
                v-for="item in building_structures"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼宇类型：">
            <el-select v-model="caseForm.bldg_type" style="width:200px">
              <el-option
                v-for="item in building_types"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="来源：">
            <el-select v-model="caseForm.case_source" style="width:200px">
              <el-option
                v-for="item in sources"
                :key="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="竣工日期：">
            <el-date-picker v-model="caseForm.const_enddate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:200px"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案例时间：" prop="ex_time">
            <el-date-picker v-model="caseForm.ex_time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:200px"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-form-item label="备注：">
          <el-input v-model="caseForm.note" :rows="5" type="textarea" style="width:600px"/>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getProject_list, getBuilding_list, getUnit_list, getDictionary } from '@/api/case'
const nameObj = { usages: '用途主类', priceTypes: '价格类型', caseTypes: '案例类型', house_types: '户型', house_structures: '户型结构', natures: '性质细类', building_structures: '房屋结构', sources: '数据来源' }

export default {
  filters: {
    formatPrice(price) {
      return (price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
  },
  data() {
    return {
      caseForm: {
        match_type: '户',
        prj_name: '',
        bldg_name: '',
        unit_no: '',
        usage: '住宅',
        case_type: '交易',
        price_type: '价格',
        built_in_area: 0,
        total_price: 0,
        ex_price: 0,
        case_floor: 0,
        dwelling_size: '',
        dwelling_struc: '',
        house_attr: '',
        house_struc: '',
        bldg_type: '',
        case_source: '',
        const_enddate: '',
        ex_time: '',
        note: ''
      },
      house_types: [],
      house_structures: [],
      natures: [],
      building_structures: [],
      building_types: ['多层', '高层'],
      sources: [],
      rules: {
        prj_name: [
          { required: true, message: '请选择楼盘', trigger: 'blur' }
        ],
        usage: [
          { required: true, message: '请选择用途', trigger: 'blur' }
        ],
        price_type: [
          { required: true, message: '请选择价格类型', trigger: 'blur' }
        ],
        case_type: [
          { required: true, message: '请选择案列类型', trigger: 'blur' }
        ],
        built_in_area: [
          { required: true, message: '请输入面积', trigger: 'blur' }
        ],
        total_price: [
          { required: true, message: '请输入总价', trigger: 'blur' }
        ],
        ex_time: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ]
      },
      usages: [],
      caseTypes: [],
      priceTypes: [],
      isBuildingInputReadonly: true,
      isHouseInputReadonly: true
    }
  },
  computed: {
    getEachPrice: {
      get() {
        return Math.round(this.caseForm.total_price / this.caseForm.built_in_area)
      },
      set() {
      }
    }
  },
  created() {
    this.getAllDictionary()
  },
  methods: {
    getAllDictionary() {
      for (const key in nameObj) {
        getDictionary(nameObj[key]).then(res => {
          this[key] = res.data
        })
      }
    },
    onPriceTypeChange(value) {
      const name = value === '价格' ? '案例类型' : value + '类型'
      getDictionary(name).then(res => {
        this.caseTypes = res.data
        this.caseType = '交易'
      })
    },
    handleProjectSuggestionSearch(queryString, cb) {
      getProject_list({ prj_name: queryString }).then(res => {
        if (res.code === 200) {
          cb(res.data)
        }
      })
    },
    handleBuildingSuggestionSearch(queryString, cb) {
      const params = {
        prj_no: this.caseForm.prj_no,
        bldg_name: queryString
      }
      getBuilding_list(params).then(res => {
        if (res.code === 200) {
          cb(res.data)
        }
      })
    },
    handleHouseSuggestionSearch(queryString, cb) {
      const params = {
        bldg_no: this.caseForm.bldg_no,
        unit_no: queryString
      }
      getUnit_list(params).then(res => {
        if (res.code === 200) {
          cb(res.data)
        }
      })
    },
    handleProjectSelect(item) {
      this.caseForm.prj_no = item.prj_no
      this.isBuildingInputReadonly = false
    },
    handleBuildingSelect(item) {
      this.caseForm.bldg_no = item.bldg_no
      this.isHouseInputReadonly = false
    },
    handleHouseSelect(item) {
      this.caseForm.house_no = item.house_no
    },
    resetForm() {
      this.$refs.caseForm.resetFields()
    }
  }
}
</script>
<style>

</style>
