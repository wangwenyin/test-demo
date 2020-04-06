<template>
  <el-row style="padding:20px 5px 0 5px" >
    <el-col :span="17" :offset="7">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
        <el-row >
          <el-col :span="24">
            <el-form-item label="任务编号：" prop="task_id">
              <el-input v-model="form.task_id" auto-complete="off" disabled="true" style="width: 50%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="来源任务编号：" prop="task_id">
              <el-input v-model="form.source_task_id" auto-complete="off" disabled="true" style="width: 50%;" />
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
          <el-col :span="24">
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
import { editSurveyTask, getSurveyTaskById } from '@/api/survey'
export default {
  data() {
    return {
      form: {
        task_type: '估价任务',
        survey_type: '住宅型房地产',
        task_id: '',
        surveyor: '',
        finish_date: '',
        remark: '',
        region: ''
      },
      rules: {
        task_type: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
        survey_type: [
          { required: true, message: '请选择查勘类型', trigger: 'change' }
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
    this.getTaskById()
  },
  methods: {
    getSaveParams() {
      const finish_date = parseTime(new Date(this.form.finish_date), '{y}-{m}-{d}')
      const params = {
        task_type: this.form.task_type,
        survey_type: this.form.survey_type,
        surveyor: this.form.surveyor,
        finish_date: finish_date,
        remark: this.form.remark
      }
      this.params = params
    },
    getTaskById() {
      getSurveyTaskById(this.$route.query.task_id).then(response => {
        if (response.code === 200) {
          this.form = response.data
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
    onCancelClick() {
      this.$router.push({ name: 'SurveyList' })
    },
    editSurveyTask() {
      this.getSaveParams()
      editSurveyTask(this.$route.query.task_id, this.params).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
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
          this.editSurveyTask()
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
