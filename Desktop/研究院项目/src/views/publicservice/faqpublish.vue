<template>
  <div style="margin:10px">
    <el-row style="margin:20px 100px 20px 100px">
      <el-col :span="20" :offset="2">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small">
          <el-form-item label="问题" prop="question">
            <el-input v-model="form.question"/>
          </el-form-item>
          <el-form-item label="答案" prop="answer">
            <tinymce :height="600" v-model="form.answer"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmitClick('form')">发布</el-button>
            <el-button size="small" @click="onCancelClick">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { addFaqs } from '@/api/publicservice/faqs'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        question: '',
        answer: ''
      },
      rules: {
        question: [
          { required: true, message: '请输入问题', trigger: 'blur' }
        ],
        answer: [{ required: true, message: '请输入答案', trigger: 'blur' }]
      }
    }
  },
  methods: {
    addFaqs() {
      const data = {
        question: this.form.question,
        answer: this.form.answer
      }
      addFaqs(data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push({ name: 'PublisServiceFAQ' })
        } else {
          this.$message({
            type: 'error',
            message: '新增失败!',
            duration: 5 * 1000
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '网络出错!',
          duration: 5 * 1000
        })
      })
    },
    onSubmitClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.question.length > 50) {
            this.$message({
              message: '标题字数长度不可超过50',
              type: 'warning',
              duration: 5 * 1000
            })
          } else {
            this.addFaqs()
          }
        } else {
          return false
        }
      })
    },
    onCancelClick() {
      this.$confirm('是否确认放弃发布？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'PublisServiceFAQ' })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  margin-top: 10px;
  text-align: center;
}
</style>
