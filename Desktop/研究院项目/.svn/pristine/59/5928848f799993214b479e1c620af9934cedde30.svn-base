<template>
  <div>
    <el-tabs tab-position="left" @tab-click="onTabsClick" >
      <el-tab-pane label="物业位置图">
        <dropzone
          id="myVueDropzone1"
          :url="url"
          :default-img="imgUrls_add"
          :task-id="taskId"
          :params="params_address"
          matrl-type="位置示意图"
          @dropzone-removedFile="handleRemoveAttachment"
          @dropzone-success="handleUploadFile('位置示意图')"/>
      </el-tab-pane>
      <el-tab-pane label="估价对象照片">
        <dropzone
          id="myVueDropzone2"
          :url="url"
          :params="params_property"
          :default-img="imgUrls_pic"
          @dropzone-removedFile="handleRemoveAttachment"
          @dropzone-success="handleUploadFile('位置示意图')"/>
      </el-tab-pane>
      <el-tab-pane label="权属证明资料">
        <dropzone
          id="myVueDropzone3"
          :url="url"
          :params="params_right"
          :default-img="imgUrls_right"
          @dropzone-removedFile="handleRemoveAttachment"
          @dropzone-success="handleUploadFile('位置示意图')"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone'
import { getReportAttachment, deleteReportAttachment } from '@/api/singleapp'
export default {
  components: { Dropzone },
  props: {
    taskId: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      // url: 'http://localhost:7007/ccb/v1/singleapp/material',
      url: 'http://test.daoheit.com/ccb/v1/singleapp/material',
      attachment_add: [],
      attachment_pic: [],
      attachment_right: [],
      imgUrls_add: [],
      imgUrls_pic: [],
      imgUrls_right: [],
      params_address: {
        task_id: this.taskId,
        matrl_type: '位置示意图'
      },
      params_property: {
        task_id: this.taskId,
        matrl_type: '估价对象照片'
      },
      params_right: {
        task_id: this.taskId,
        matrl_type: '权属证明资料'
      }
    }
  },
  mounted() {
    // 获取任务编号
    this.taskId = this.$route.query.taskId
    this.params = {
      name: 'erwin'
    }
    // 获取附件
    this.getReportAttachment({ matrl_type: '位置示意图' })
  },
  methods: {
    onTabsClick(tab, event) {
      switch (tab.label) {
        case '物业位置图': this.getReportAttachment({ matrl_type: '位置示意图' }); break
        case '估价对象照片': this.getReportAttachment({ matrl_type: '估价对象照片' }); break
        case '权属证明资料': this.getReportAttachment({ matrl_type: '权属证明资料' }); break
      }
    },
    handleUploadFile(type) {
      this.getReportAttachment({ matrl_type: type })
      this.$message({ message: '上传成功！', type: 'success' })
    },
    handleRemoveAttachment(file) {
      console.log(file.url)
      console.log(this.imgUrls_add)
      let matrl_name = ''
      this.attachment_add.forEach(element => {
        if (element.url === file.url) {
          matrl_name = element.matrl_name
        }
      })
      this.attachment_pic.forEach(element => {
        if (element.url === file.url) {
          matrl_name = element.matrl_name
        }
      })
      this.attachment_right.forEach(element => {
        if (element.url === file.url) {
          matrl_name = element.matrl_name
        }
      })
      const params = {
        matrl_name: matrl_name
      }
      deleteReportAttachment(this.taskId, params).then(response => {
        if (response.code === 200) {
          this.$message({ message: '删除图片成功', type: 'success' })
        } else {
          this.$message({ message: response.msg, type: 'success' })
        }
      })
    },
    getReportAttachment(params) {
      getReportAttachment(this.taskId, params).then(response => {
        console.log(response)
        if (response.code === 200) {
          const data = response.data
          if (data.length > 0) {
            switch (data[0].matrl_type) {
              case '位置示意图':
                this.attachment_add = data
                this.imgUrls_add = []
                break
              case '权属证明资料':
                this.attachment_right = data
                this.imgUrls_right = []
                break
              case '估价对象照片':
                this.attachment_pic = data
                this.imgUrls_pic = []
                break
            }
          }

          for (let i = 0; i < data.length; i++) {
            if (data[i].matrl_type === '位置示意图') {
              this.imgUrls_add.push(data[i].url)
            } else if (data[i].matrl_type === '权属证明资料') {
              this.imgUrls_right.push(data[i].url)
            } else if (data[i].matrl_type === '估价对象照片') {
              this.imgUrls_pic.push(data[i].url)
            }
          }
        } else {
          this.$notify({
            title: '错误',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
