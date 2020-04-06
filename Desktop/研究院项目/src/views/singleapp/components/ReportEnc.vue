<template>
  <div >
    <div class="title">房地产证复印件</div>
    <el-row>
      <div>
        <template>
          <div class="components-container">
            <div class="editor-container">
              <dropzone
                id="myVueDropzone"
                :url="url"
                :fdcdm="lddm"
                :default-img="img"
                fdclx="楼栋"
                max-files="1"
                @dropzone-success="UploadFile"/>
            </div>
          </div>
        </template>
      </div>
    </el-row>
    <div class="title">业主身份证复印件</div>
    <el-row>
      <div>
        <template>
          <div class="components-container">
            <div class="editor-container">
              <dropzone
                id="myVueDropzone1"
                :url="url"
                :fdcdm="lddm"
                :default-img="img"
                fdclx="楼栋"
                max-files="1"
                @dropzone-success="UploadFile"/>
            </div>
          </div>
        </template>
      </div>
    </el-row>
    <div class="title">实地查勘表</div>
    <el-row>
      <div>
        <template>
          <div class="components-container">
            <div class="editor-container">
              <dropzone
                id="myVueDropzone2"
                :url="url"
                :fdcdm="lddm"
                :default-img="img"
                fdclx="楼栋"
                max-files="1"
                @dropzone-success="UploadFile"/>
            </div>
          </div>
        </template>
      </div>
    </el-row>
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone'
export default {
  components: { Dropzone },
  props: {
    form: {
      type: Object,
      'default': null
    }
  },
  data() {
    return {
      url: process.env.IMG_URL
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .title {
    font-size: 15px;
     font-weight:bold;
     margin-top: 10px;
     margin-left:21px;
     margin-bottom: 10px;
  }
</style>
