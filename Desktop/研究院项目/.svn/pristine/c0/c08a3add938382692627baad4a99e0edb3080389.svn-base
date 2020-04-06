<template>
  <el-row style="padding:20px 5px 0 5px" >
    <el-col :span="17" :offset="7">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
        <el-row >
          <el-col :span="24">
            <el-form-item label="任务编号：" prop="source_task_id">
              <el-select v-model="form.source_task_id" style="width:50%;" placeholder="请选择任务编号">
                <el-option label="2018-01" value="2018-01" />
                <el-option label="2018-02" value="2018-02" />
                <el-option label="2018-03" value="2018-03" />
                <el-option label="2018-04" value="2018-04" />
                <el-option label="2018-05" value="2018-05" />
                <el-option label="2018-06" value="2018-06" />
                <el-option label="2018-07" value="2018-07" />
                <el-option label="2018-08" value="2018-08" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="物业名称：" prop="property_name">
              <el-input v-model="form.property_name" auto-complete="off" disabled="true" style="width: 50%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="任务类型：" prop="task_type">
              <el-radio-group v-model="form.task_type">
                <el-radio label="估价任务" />
                <el-radio label="复核任务" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="查勘类型：" prop="survey_type">
              <el-radio-group v-model="form.survey_type">
                <el-radio label="住宅型房地产" />
                <el-radio label="经营性房地产" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="查勘人：" prop="surveyor">
              <el-select v-model="form.surveyor" style="width:50%;" placeholder="请选择查勘人">
                <el-option label="王文银" value="王文银" />
                <el-option label="李四" value="李四" />
                <el-option label="王五" value="王五" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="22">
            <el-form-item label="预计完成时间：" prop="finish_date">
              <el-date-picker v-model="form.finish_date" type="date" size="small" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 50%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="form.remark" auto-complete="off" rows="6" type="textarea" style="width: 50%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item>
              <el-button size="small" class="row-button" @click="onCancelClick">取消</el-button>
              <el-button size="small" type="primary" class="row-button" @click="onSaveClick('form')">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import { addSurveyTask } from '@/api/survey'
export default {
  data() {
    return {
      form: {
        source_task_id: '',
        property_name: '',
        task_type: '估价任务',
        survey_type: '住宅型房地产',
        task_id: '',
        surveyor: '',
        finish_date: '',
        remark: '',
        region: ''
      },
      rules: {
        property_name: [{ required: true, message: '物业名称不能为空', trigger: 'blur' }],
        task_type: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
        survey_type: [
          { required: true, message: '请选择查勘类型', trigger: 'change' }
        ],
        source_task_id: [
          { required: true, message: '请选择任务编号', trigger: 'change' }
        ],
        surveyor: [{ required: true, message: '请选择查勘人', trigger: 'change' }],
        finish_date: [
          { required: true, message: '请选择预计完成时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.form.source_task_id = this.$route.query.source_task_id
  },
  methods: {
    getSaveParams() {
      const finish_date = parseTime(new Date(this.form.finish_date), '{y}-{m}-{d}')
      const params = {
        source_task_id: this.form.source_task_id,
        task_type: this.form.task_type,
        survey_type: this.form.survey_type,
        task_id: 'CK' + this.form.source_task_id,
        surveyor: this.form.surveyor,
        finish_date: finish_date,
        remark: this.form.remark,
        /* property_name: this.form.prj_no + this.form.bldg_no + this.form.house_no, */
        property_name: this.form.property_name
      }
      this.params = params
    },
    onCancelClick() {
      this.$router.push({ name: 'SurveyList' })
    },
    addSurveyTask() {
      this.getSaveParams()
      const now = new Date()
      const create_date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      this.params.creator = this.name
      this.params.create_time = parseTime(create_date, '{y}-{m}-{d}')
      addSurveyTask(this.params).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push({ name: 'SurveyList' })
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: err,
          duration: 5 * 1000
        })
      })
    },
    onSaveClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSurveyTask()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.row-button {
  float: right;
  margin-left: 10px;
  margin-top: 3px;
}
</style>
