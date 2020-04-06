<template>
  <div style="margin:10px">
    <el-row style="margin:20px 100px 20px 100px">
      <el-col :span="20" :offset="2">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"/>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <tinymce :height="600" v-model="form.content"/>
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
import { addNotices } from '@/api/publicservice/notices'
export default {
  components: {
    Tinymce
  },
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
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    addNotices() {
      const data = {
        title: this.form.title,
        content: this.form.content
      }
      addNotices(data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$router.push({ name: 'Notice' })
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
          if (this.form.title.length > 15) {
            this.$message({
              message: '标题字数长度不可超过15',
              type: 'warning',
              duration: 5 * 1000
            })
          } else {
            this.addNotices()
          }
        } else {
          return false
        }
      })
      /* if (this.form.title && this.form.content && this.form.title.length <= 15) {
        this.addNotices()
      } else {
        this.$message({
          message: '标题和内容均不可为空,且标题字数长度不可超过15',
          type: 'warning',
          duration: 5 * 1000
        })
      } */
    },
    onCancelClick() {
      this.$confirm('是否确认放弃发布？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ name: 'Notice' })
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
