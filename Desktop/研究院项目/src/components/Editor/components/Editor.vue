<template>
  <div>
    <div ref="editor" style="text-align:left">
      <textarea v-show="false" id="text1"/>
    </div>
    <div style="margin-top:20px">
      <el-button type="primary" size="small" @click="getData" >发布</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'

export default {
  name: 'Editor',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorContent: ''
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.customConfig.uploadImgShowBase64 = true
    editor.create()
    this.editorContent = this.content
    editor.txt.html(this.content)
  },
  methods: {
    getData() {
      this.$emit('getData', this.editorContent)
    }
  }
}
</script>

<style scoped>
</style>
