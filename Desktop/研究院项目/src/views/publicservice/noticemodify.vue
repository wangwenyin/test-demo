<template>
  <div style="margin:10px">
    <el-row style="margin:20px 100px 20px 100px">
      <el-col :span="20" :offset="2">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="small">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"/>
          </el-form-item>
          <el-form-item label="发布人">
            <el-input v-model="form.publisher" disabled />
          </el-form-item>
          <el-form-item label="发布时间">
            <el-input v-model="form.publish_time" disabled />
          </el-form-item>
          <el-form-item label="修改人">
            <el-input v-model="form.editor" disabled />
          </el-form-item>
          <el-form-item label="修改时间">
            <el-input v-model="form.edit_time" disabled />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <tinymce :height="300" v-model="form.content"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmitClick('form')">发布</el-button>
            <el-button size="small" @click="onCancelClick">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { updateNotices, getNoticesById } from '@/api/publicservice/notices'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        content: '',
        title: '',
        publisher: '',
        publish_time: '',
        editor: '',
        edit_time: '',
        state: ''
      },
      notice_id: '',
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.notice_id = this.$route.query.notice_id
    this.getNoticesById()
  },
  methods: {
    onBlur() {
    },
    getNoticesById() {
      getNoticesById(this.notice_id).then(response => {
        if (response.code === 200) {
          this.form = response.data
        } else {
          this.$message({
            type: 'error',
            message: '获取失败!',
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
    updateNotices() {
      const data = {
        title: this.form.title,
        content: this.form.content
      }
      updateNotices(this.notice_id, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ name: 'Notice' })
        } else {
          this.$message({
            type: 'error',
            message: '修改失败!',
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
            this.updateNotices()
          }
        } else {
          return false
        }
      })
      /* if (this.form.title && this.form.content && this.form.title.length <= 15) {
        this.updateNotices()
      } else {
        this.$message({
          message: '标题和内容均不可为空,且标题字数长度不可超过15',
          type: 'warning',
          duration: 5 * 1000
        })
      } */
    },
    onCancelClick() {
      this.$confirm('是否确认放弃修改？', '提示', {
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
.sub-message {
  color: grey;
  text-align: center;
  font-size: 15px;
  line-height: 18px;
  margin: auto auto 10px auto;
}
</style>
