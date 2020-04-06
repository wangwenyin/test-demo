<template>
  <div style="margin:10px">
    <el-row style="margin:20px 100px 20px 100px">
      <el-col :span="20" :offset="2">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="small">
          <el-form-item label="问题" prop="question">
            <el-input v-model="form.question"/>
          </el-form-item>
          <el-form-item label="发布人">
            <el-input v-model="form.publisher" disabled />
          </el-form-item>
          <el-form-item label="发布时间">
            <el-input v-model="form.publish_time" disabled />
          </el-form-item>
          <el-form-item label="修改人">
            <el-input v-model="form.last_editor" disabled />
          </el-form-item>
          <el-form-item label="修改时间">
            <el-input v-model="form.edit_time" disabled />
          </el-form-item>
          <el-form-item label="答案" prop="answer">
            <tinymce :height="300" v-model="form.answer"/>
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
import { updateFaqs, getFaqsById } from '@/api/publicservice/faqs'
import { mapGetters } from 'vuex'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      form: {
        question: '',
        answer: '',
        publisher: '',
        publish_time: '',
        last_editor: '',
        edit_time: '',
        state: ''
      },
      faq_id: '',
      rules: {
        question: [
          { required: true, message: '请输入问题', trigger: 'blur' }
        ],
        answer: [{ required: true, message: '请输入答案', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.faq_id = this.$route.query.faq_id
    this.getFaqsById()
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    getFaqsById() {
      getFaqsById(this.faq_id).then(response => {
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
    updateFaqs() {
      const data = {
        question: this.form.question,
        answer: this.form.answer
      }
      updateFaqs(this.faq_id, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ name: 'PublisServiceFAQ' })
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
          if (this.form.question.length > 50) {
            this.$message({
              message: '标题字数长度不可超过50',
              type: 'warning',
              duration: 5 * 1000
            })
          } else {
            this.updateFaqs()
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
.sub-message {
  color: grey;
  text-align: center;
  font-size: 15px;
  line-height: 18px;
  margin: auto auto 10px auto;
}
</style>
