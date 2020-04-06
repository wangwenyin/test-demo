<template>
  <div style="margin:10px">
    <el-row style="margin:20px 100px 20px 100px">
      <el-col :span="20" :offset="2">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small">
          <el-form-item label="标题" prop="title" >
            <el-input v-model="form.title"/>
          </el-form-item>
          <el-form-item label="内容" prop="content" >
            <tinymce :height="600" v-model="form.content"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmitClick('form')">发布</el-button>
            <!-- <el-button size="small">取消</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { addFeedBacks } from '@/api/feedback'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [{ required: true, message: '请输入反馈内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmitClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.title.length > 15) {
            this.$message({
              message: '标题字数长度不可超过15',
              type: 'warning',
              duration: 5 * 1000
            })
          } else {
            addFeedBacks({ title: this.form.title, content: this.form.content }).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '提交成功！谢谢您的反馈，我们会努力将产品做得更好，为您提供更贴心的服务。',
                  duration: 6000
                })
                // this.$router.push({ name: 'MessageManage' })
              } else {
                this.$message({
                  type: 'error',
                  message: '网络错误！',
                  duration: 6000
                })
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
