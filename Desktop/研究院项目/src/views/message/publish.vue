<template>
  <div style="margin:10px">
    <el-row style="margin:20px 100px 20px 100px">
      <el-col :span="20" :offset="2">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"/>
          </el-form-item>
          <el-form-item label="发布对象" prop="publish_target">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="onCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"/>
            <el-checkbox-group v-model="form.publish_target" >
              <el-checkbox v-for="item in targets" :label="item" :key="item">{{ item }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="等级" >
            <el-radio-group v-model="form.grade">
              <el-radio label="重要"/>
              <el-radio label="普通"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.note" type="textarea"/>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <!-- <tinymce :height="300" v-model="form.content"/> -->
            <editor ref="editor" :content="form.content" @getData="getData"/>
          </el-form-item>
          <!-- 发布和取消按钮放到editor组件内 -->
          <!-- <el-form-item>
            <el-button type="primary" size="small" @click="onPublishMessageClick('form')">发布</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import Editor from '@/components/Editor/components/Editor'
import { publishMessage } from '@/api/message'
import { getDepartmentName } from '@/api/department'
export default {
  name: 'PublishMessage',
  components: { Tinymce, Editor },
  data() {
    return {
      form: {
        publisher: this.$store.state.user.name,
        title: '',
        grade: '普通',
        publish_target: [],
        content: '',
        note: ''
      },
      targets: [],
      checkAll: false,
      isIndeterminate: false,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        publish_target: [
          { required: true, message: '请选择发布对象', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if (this.$route.params.title) {
      this.form = this.$route.params
      this.isIndeterminate = (this.form.publish_target.length > 0 && this.form.publish_target.length !== this.targets.length)
      this.checkAll = (this.form.publish_target.length === this.targets.length)
    }
    this.getDepartmentName()
  },
  methods: {
    getDepartmentName() {
      getDepartmentName().then(res => {
        if (res.code === 200) {
          this.targets = res.data
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onCheckAllChange(val) {
      this.form.publish_target = val ? this.targets : []
      this.isIndeterminate = false
    },
    getData(val) {
      this.form.content = val
      this.onPublishMessageClick('form')
    },
    onPublishMessageClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.title.length > 15) {
            this.$message({
              message: '标题字数长度不可超过15',
              type: 'warning',
              duration: 5 * 1000
            })
          } else {
            publishMessage(this.form).then(response => {
              if (response.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '发布消息成功',
                  type: 'success',
                  duration: 2000
                })
                this.$router.push({ name: 'MessageManage' })
              } else {
                this.$notify({
                  title: '获取信息失败',
                  message: response.msg,
                  type: 'error',
                  duration: 2000
                })
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
