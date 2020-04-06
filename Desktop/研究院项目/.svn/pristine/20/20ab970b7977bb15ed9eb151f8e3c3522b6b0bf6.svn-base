<template>
  <div style="margin:10px">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-form ref="impForm" v-model="impForm" size="small" label-width="200px">
          <el-form-item label="选择导入的文件类型">
            <el-radio-group v-model="impForm.file_type" placeholder="请选择" >
              <el-radio v-for="item in file_types" :label="item" :value="item" :key="item"/>
            </el-radio-group>
            <el-button type="text" style="float: right;" @click="downLoadTemplateVisible=true">下载导入数据模板</el-button>
          </el-form-item>
          <el-form-item label="选择要上传的文件">
            <el-col :span="20"> <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" /></el-col>
            <el-col :span="4"><el-button v-if="selectedFile" :loading="downloadLoading" style="margin-left:100px;" size="small" type="primary" @click="onShowBtnClick">预览</el-button></el-col>
          </el-form-item>
          <el-form-item label="导入的目标">
            <el-radio-group v-model="impForm.target" placeholder="请选择">
              <el-radio v-for="item in targetsList" :label="item.label" :value="item.label" :key="item.key" disabled/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="导入进度">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" style="margin-top:10px;margin-bottom:10px;"/>
            <div id="logContent" class="logs" >
              <div v-for="(log,index) in logs" :key="index" class="log">
                <div :class="{'log-success': log.type==='sucess', 'log-fail': log.type==='fail','log-info':log.type==='info'}">{{ log.info }}</div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button v-if="selectedFile" :loading="imping" type="primary" @click="onStarImportClick">开始导入</el-button>
            <el-button v-if="errorTable.length>0" type="info" @click="onDownloadErrorClick">下载导入失败的数据</el-button>
            <el-button :loading="imping" @click="onGotoHandleClick">进入处理</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="fileDataVisible" title="文件数据" width="50%" >
      <el-table :data="showTableData" :header-cell-style="changeHeaderStyle" border size="small">
        <el-table-column v-for="item of allFields" :prop="item.label" :label="item.label" :key="item.label"/>
      </el-table>
      <pagination
        :total="listQuery.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :page-sizes="listQuery.pageSizes"
        @pagination="pagination" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onCloseBtnClick">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="downLoadTemplateVisible" title="下载导入模板" width="50%" >
      <el-row style="margin-left: 60px;">
        <el-button type="primary" size="small" @click="onDownLoadTemplateClick('project')">楼盘</el-button>
        <el-button type="primary" size="small" @click="onDownLoadTemplateClick('land')">宗地</el-button>
        <el-button type="primary" size="small" @click="onDownLoadTemplateClick('building')">楼栋</el-button>
        <el-button type="primary" size="small" @click="onDownLoadTemplateClick('house')">户</el-button>
        <el-button type="primary" size="small" @click="onDownLoadTemplateClick('structure')">构筑物</el-button>
        <el-button type="primary" size="small" @click="onDownLoadTemplateClick('case')">案例</el-button>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="downLoadTemplateVisible=false" >关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import UploadExcelComponent from '@/components/UploadExcel/UploadExcel'
import { importation, deleteImportation, getImportationFields, getImportationTemplate } from '@/api/data'
import { mapGetters } from 'vuex'

export default {
  components: { Pagination, UploadExcelComponent },
  data() {
    return {
      impForm: {
        file_type: 'excel',
        target: ''
      },
      imp_logs: '',
      file_types: ['excel', 'csv', 'access'],
      targetsList: [
        { key: 'project', label: '楼盘' },
        { key: 'land', label: '宗地' },
        { key: 'building', label: '楼栋' },
        { key: 'house', label: '户' },
        { key: 'structure', label: '构筑物' },
        { key: 'case', label: '案例' }
      ],
      getRightTemplate: false,
      url: process.env.IMP_FILE_API,
      imp_file_params: {},
      selectedFile: false,
      fileDataVisible: false,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      percentage: 0,
      logs: [],
      logTop: 0,
      isStartImp: false,
      isImpComplete: false,
      imping: false,
      tableData: [],
      showTableData: [],
      errorTable: [],
      sucessTable: [],
      allFields: [],
      taskId: '',
      total: 0,
      pagesize: 3000,
      totalPage: 0,
      downLoadTemplateVisible: false
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  updated: function() {
    this.$nextTick(function() {
      var div = document.getElementById('logContent')
      div.scrollTop = div.scrollHeight
    })
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isLt2M) {
        this.selectedFile = true
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 2m in size.',
        type: 'warning'
      })
      this.selectedFile = false
      return false
    },

    handleSuccess({ results, header }) {
      this.getRightTemplate = false
      this.tableData = results
      this.judgeTemplate(header, 0)
      this.pagination()
      this.listQuery.total = this.tableData.length
    },
    onStarImportClick() {
      this.errorTable = []
      this.sucessTable = []
      this.imping = true
      this.checkData()
      this.importData()
    },
    // 判断模板
    judgeTemplate(header, index) {
      if (!this.getRightTemplate) {
        if (index < this.targetsList.length) {
          const ele = this.targetsList[index]
          getImportationFields(ele.key).then(response => {
            const fieldsHeard = []
            response.fields.forEach(element => {
              fieldsHeard.push(element.label)
            })
            if (header.sort().toString() === fieldsHeard.sort().toString()) {
              this.allFields = response.fields
              this.impForm.target = ele.label
              this.getRightTemplate = true
            } else {
              index++
              this.judgeTemplate(header, index)
            }
          })
        } else {
          this.logs.push({ type: 'fail', info: '模板不匹配，请检查模板!' })
          this.$message({
            type: 'error',
            message: '模板不匹配，请检查模板!'
          })
        }
      }
    },
    // 检查数据
    checkData() {
      this.logs.push({ type: 'info', info: '开始检查数据！' })
      for (let index = 0; index < this.tableData.length; index++) {
        const element = this.tableData[index]
        let haserror = false
        this.allFields.forEach(field => {
          // 判断必填项是否填写
          if (field.required === 1) {
            if (element[field.label] === undefined) {
              this.logs.push({ type: 'fail', info: '第' + (index + 1) + '条数据缺少字段:' + field.label })
              haserror = true
            }
          }
          // 判断Number类型是否正确
          if (field.type === 'number') {
            if (element[field.label] !== undefined) {
              if (isNaN(element[field.label])) {
                this.logs.push({ type: 'fail', info: '第' + (index + 1) + '条数据字段:' + field.label + '的应为数字' })
                haserror = true
              }
            }
          }
        }
        )
        if (!haserror) {
          this.sucessTable.push(element)
          this.logs.push({ type: 'sucess', info: '第' + (index + 1) + '条数据检查成功！' })
        } else {
          this.errorTable.push(element)
        }
      }
      this.logs.push({ type: 'info', info: '检查完毕！其中成功' + this.sucessTable.length + '条，失败' + this.errorTable.length + '条。' })
    },
    importData() {
      this.total = this.sucessTable.length
      this.totalPage = Math.ceil(this.sucessTable.length / this.pagesize)
      this.logs.push({ type: 'info', info: '开始导入，总计' + this.total + '条。预计分' + this.totalPage + '次提交。' })
      this.submitData(1)
    },
    submitData(index) {
      this.percentage += 100 / this.totalPage
      if (this.totalPage - index > -1) {
        const tempList = this.sucessTable.slice((index - 1) * this.pagesize, index * this.pagesize)
        const data = {
          id: this.taskId,
          type: this.impForm.target,
          total: this.total,
          remain: this.total - this.pagesize * index > 0 ? this.total - this.pagesize * index : 0,
          cur_num: index === this.totalPage ? this.total - this.pagesize * (index - 1) : this.pagesize,
          operator: this.name,
          data: tempList
        }
        importation(data).then(res => {
          this.taskId = res.data
          if (res.code === 200) {
            this.logs.push({ type: 'sucess', info: '第' + index + '次提交，本次提交成功' + data.cur_num + '条数据，还剩' + data.remain + '条。' })
            index++
            this.submitData(index)
          } else {
            this.logs.push({ type: 'fail', info: res.msg })
            this.logs.push({ type: 'info', info: '导入失败，开始回滚数据' })
            if (this.taskId === '') {
              deleteImportation(0, null)
            } else {
              deleteImportation(1, { id: this.taskId, type: this.impForm.target })
            }
            this.logs.push({ type: 'fail', info: '导入失败，检查数据再重新导入！' })
            this.submitData(this.totalPage + 1)
          }
        })
      } else {
        this.percentage = 100
        this.logs.push({ type: 'fail', info: '导入完毕！' })
        this.imping = false
        this.tableData = []
        this.sucessTable = []
        this.selectedFile = false
      }
    },
    onDownloadErrorClick() {
      this.downloadLoading = true
        import('@/components/UploadExcel/Export2Excel').then(excel => {
          const filterVal = []
          this.allFields.forEach(element => {
            filterVal.push(element.prop)
          })
          const list = this.errorTable
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: filterVal,
            data,
            filename: this.impForm.target + new Date().getDate()
          })
          this.downloadLoading = false
        })
    },
    onGotoHandleClick() {
      const routerData = this.$router.resolve({
        name: 'PropertyEdit',
        query: { targets: this.impForm.target }
      })
      window.open(routerData.href, '_blank')
    },
    onDownLoadTemplateClick(type) {
      getImportationTemplate(type).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          window.location.href = response.url
        } else {
          this.$message({
            type: 'info',
            message: response.msg
          })
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    pagination(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      } else {
        this.listQuery.page = 1
      }
      this.showTableData = this.tableData.slice((this.listQuery.page - 1) * this.listQuery.limit, this.listQuery.page * this.listQuery.limit)
    },
    onShowBtnClick() {
      this.fileDataVisible = true
    },
    onCloseBtnClick() {
      this.fileDataVisible = false
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }

  }
}
</script>
<style lang="scss" scoped>
.logs {
      width: 100%;
      height: 400px;
      font-size: 18px;
      overflow: auto;
      padding: 20px 50px;
      margin-top: 10px;
      background: #ebf5ff;
      .log {
        margin-top: 5px;
        .log-success {
          color: #00A854
        }
        .log-fail {
          color: #F04134
        }
         .log-info {
          color: #333333
        }
      }
    }
</style>
