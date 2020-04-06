<template>
  <el-row style="padding:20px 5px 0 5px" >
    <el-col :span="12" :offset="6">
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        size="small"
        element-loading-text="拼命加载中">
        <el-form-item v-if="form.taskId" label="任务编号" prop="taskId">
          <el-input v-model="form.taskId" disabled="true"/>
        </el-form-item>
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form.name" placeholder="可以通过下面的物业名称查询自动生成任务名称"/>
        </el-form-item>
        <el-form-item label="创建人" style="width:50%">
          <el-input v-model="form.creator" disabled="true" />
        </el-form-item>
        <el-form-item label="参与人" prop="members">
          <el-select v-model="form.members" multiple placeholder="请选择参与人员(不超过3人)" style="display:block" multiple-limit="3">
            <el-option
              v-for="item in allMembers"
              :key="item.login_name"
              :label="item.real_name"
              :value="item.real_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.create_time"
              type="date"
              placeholder="选择日期"
              disabled="true"
              value-format="yyyy-MM-dd"
              style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="预计完成时间" prop="plan_time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.plan_time"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPlanTimeChange"/>
          </el-col>
        </el-form-item>
        <el-form-item label="委托人" prop="principal">
          <el-input v-model="form.principal" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="物业名称" required>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-autocomplete
                v-model="projectName"
                :fetch-suggestions="onProjectSuggestionSearch"
                :trigger-on-focus="false"
                value-key="prj_name"
                placeholder="请输入小区（楼盘）"
                style="width:100%"
                @keyup.native="onProjectInputChange"
                @select="onProjectSelect" />
            </el-col>
            <el-col :span="8">
              <el-autocomplete
                v-model="buildingName"
                :fetch-suggestions="onBuildingSuggestionSearch"
                :disabled="!isProjectOK"
                value-key="bldg_name"
                placeholder="请输入楼栋"
                style="width:100%"
                @keyup.native="onBuildingInputChange"
                @select="onBuildingSelect"/>
            </el-col>
            <el-col :span="7">
              <el-autocomplete
                v-model="houseName"
                :fetch-suggestions="onHouseSuggestionSearch"
                :trigger-on-focus="false"
                :disabled="!isBuildingOK"
                placeholder="请输入房号"
                value-key="unit_no"
                style="width:100%"
                @keyup.native="onHouseInputChange"
                @select="onHouseSelect"/>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-form-item label="物业类型">
          <el-radio v-model="form.property_type" label="房产">房产</el-radio>
          <el-radio v-model="form.property_type" label="土地">土地</el-radio>
        </el-form-item> -->
        <el-form-item label="物业用途">
          <el-radio v-model="form.property_usage" label="住宅">住宅</el-radio>
          <el-radio v-model="form.property_usage" label="商业">商业</el-radio>
          <el-radio v-model="form.property_usage" label="办公">办公</el-radio>
          <el-radio v-model="form.property_usage" label="工业">工业</el-radio>
        </el-form-item>
        <el-form-item label="估价方法">
          <el-select v-model="form.appraisal_method" placeholder="请选择">
            <el-option
              v-for="item in appraisal_methods"
              :key="item.value"
              :label="item.value"
              :value="item.value"
              :disabled="item.disabled"/>
          </el-select>
        </el-form-item>
        <el-form-item label="估价目的">
          <el-select v-model="form.valuation_purpose" placeholder="请选择">
            <el-option
              v-for="item in appraisal_purposes"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="价值时点" prop="valuation_date">
          <el-col :span="11">
            <el-date-picker v-model="form.valuation_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note" type="textarea" maxlength="200" placeholder="最多200字"/>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!isHouseOK" type="primary" @click="onCreateTask">创建任务</el-button>
          <el-button @click="onCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { createSingleappTask } from '@/api/singleapp'
import { getUsers } from '@/api/user'
import moment from 'moment'
import { getSuggestionProjectName, getSuggestionBuildingName, getSuggestionHouseName } from '@/api/data'

export default {
  data() {
    return {
      form: {
        taskId: null,
        name: '',
        creator: this.$store.state.user.name,
        members: [],
        create_time: '',
        plan_time: '',
        property_type: '房产',
        property_usage: '住宅',
        district_selected: [],
        appraisal_method: '比较法',
        valuation_purpose: '房地产抵押价值评估',
        valuation_date: '',
        remark: null
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 3, max: 100, message: '不能少于3个字符', trigger: 'blur' }
        ],
        members: [
          { required: true, message: '请至少选择一位参与者', trigger: 'blur' }
        ],
        create_time: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        plan_time: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        principal: [
          { type: 'string', required: true, message: '请输入委托人', trigger: 'blur' }
        ],
        district_selected: [
          { required: true, message: '请选择评估区域', trigger: 'blur' }
        ],
        valuation_date: [
          { type: 'string', required: true, message: '请选择价值时点', trigger: 'change' }
        ]
        // projectName: [
        //   { type: 'string', required: true, message: '请输入', trigger: 'blur' }
        // ]
        // wymc: [
        //   { type: 'string', required: true, message: '请输入物业名称', trigger: 'blur' }
        // ]
      },
      allMembers: [],
      appraisal_methods: [
        { value: '比较法', disabled: false },
        { value: '收益法', disabled: true },
        { value: '成本法', disabled: true }
      ],
      appraisal_purposes: ['房地产抵押价值评估'],
      loading: false,
      projectName: '',
      buildingName: '',
      houseName: '',
      projectSelected: null,
      buildingSelected: null,
      houseSelected: null,
      projectSuggestions: [],
      buildingSuggestions: [],
      houseSuggestions: [],
      isProjectOK: false,
      isBuildingOK: false,
      isHouseOK: false
    }
  },
  mounted() {
    this.loading = true
    // 如果是从任务列表跳转过来，则需要根据编号获取任务信息
    if (this.$route.query.id) {
      // 根据编号获取任务信息
      this.taskId = this.$route.query.id
    } else {
      // 初始化表单
      this.form.create_time = moment().format('YYYY-MM-DD')

      // 加载参与人信息
      const params = {
        department: '评估部',
        page: 1,
        limit: 20
      }
      getUsers(params).then(response => {
        this.allMembers = response.data
        this.loading = false
      })
    }
  },
  methods: {
    onPlanTimeChange(val) {
      if (val < this.form.create_time) {
        this.$notify({
          title: '提示',
          message: '预计完成时间不能早于创建时间！',
          type: 'warning',
          duration: 3000
        })
        this.form.plan_time = ''
      }
    },
    onCreateTask() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将创建个案估价任务, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.finishCreateSingleappTask()
          }).catch((e) => {
            console.log(e)
            this.$message({
              type: 'info',
              message: '已取消创建任务'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    finishCreateSingleappTask() {
      if (this.form.members.indexOf(this.$store.state.user.name) < 0) {
        this.form.members.push(this.$store.state.user.name)
      }
      const params = {
        submit: true,
        name: this.form.name,
        creator: this.form.creator,
        members: this.form.members.join(','),
        create_time: this.form.create_time,
        plan_time: this.form.plan_time,
        client: this.form.principal,
        prj_no: this.projectSelected.prj_no,
        bldg_no: this.buildingSelected.bldg_no,
        house_no: this.houseSelected.house_no,
        prop_usage: this.form.property_usage,
        purpose: this.form.valuation_purpose,
        value_date: this.form.valuation_date,
        note: this.form.note
      }

      createSingleappTask(params).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })

          switch (this.form.appraisal_method) {
            case '比较法': this.$router.push({ name: 'CaseSearch', query: { caller: 'singleapp', prj_no: this.projectSelected.prj_no, taskId: response.taskId }}); break
            case '收益法': alert('正在开发中……'); break
            case '成本法': alert('正在开发中……'); break
          }
        } else {
          this.$notify({
            title: '失败',
            message: response.msg,
            type: 'error',
            duration: 4000
          })
        }
      })
    },
    onCancle() {
      this.$router.push({ name: 'SingleappTasks' })
      // this.$store.dispatch('setCreateTaskStep', 1)
    },
    // 处理模糊匹配查询事件
    onProjectSuggestionSearch(queryString, cb) {
      this.projectSuggestions = []
      const params = {
        prj_name: queryString
      }
      getSuggestionProjectName(params).then(res => {
        this.projectSuggestions = res.data
        cb(this.projectSuggestions)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    onBuildingSuggestionSearch(queryString, cb) {
      this.projectSuggestions = []
      const params = {
        prj_no: this.projectSelected.prj_no,
        bldg_name: queryString
      }
      getSuggestionBuildingName(params).then(res => {
        this.buildingSuggestions = res.data
        cb(this.buildingSuggestions)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    onHouseSuggestionSearch(queryString, cb) {
      this.projectSuggestions = []
      const params = {
        bldg_no: this.buildingSelected.bldg_no,
        unit_no: queryString
      }
      getSuggestionHouseName(params).then(res => {
        this.houseSuggestions = res.data
        cb(this.houseSuggestions)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    // 当楼栋输入框内容发生变化后的处理事件
    onBuildingInputChange(e) {
      if (e.key !== 'Enter') {
        this.isHouseOK = this.isBuildingOK = false
        this.houseName = ''
        this.houseSuggestions = []
        this.buildingSelected = null
        this.houseSelected = null
        this.appraisedValue = {
          each_price: null,
          total_price: null,
          value_date: null
        }
      }
    },
    onProjectInputChange(e) {
      if (e.key !== 'Enter') {
        this.isProjectOK = this.isBuildingOK = this.isHouseOK = false
        this.houseName = ''
        this.buildingName = ''
        this.houseSuggestions = []
        this.buildingSuggestions = []
        this.projectSelected = null
        this.buildingSelected = null
        this.houseSelected = null
        this.appraisedValue = {
          each_price: null,
          total_price: null,
          value_date: null
        }
      }
    },
    onHouseInputChange(e) {
      if (e.key !== 'Enter') {
        this.isHouseOK = false
        this.houseSelected = null
        this.appraisedValue = {
          each_price: null,
          total_price: null,
          value_date: null
        }
      }
    },
    // 处理模糊匹配选中事件
    onProjectSelect(item) {
      this.projectName = item.prj_name
      this.projectSelected = item
      this.isProjectOK = true
      this.buildingSuggestions = []
    },
    onBuildingSelect(item) {
      this.buildingName = item.bldg_name
      this.buildingSelected = item
      this.houseSuggestions = []
      this.isBuildingOK = true
    },
    onHouseSelect(item) {
      this.houseName = item.unit_no
      this.houseSelected = item
      this.isHouseOK = true
      this.form.name = this.projectSelected.district + this.projectSelected.subdis + this.projectName + this.buildingName + this.houseName
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
