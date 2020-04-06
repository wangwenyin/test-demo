<template>
  <div >
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="8">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">{{ baseinfo.name }} </div>
          </el-col>
          <el-col :span="16">
            <div class="edit-button">
              <el-button type="primary" size="mini" @click="onEditClick">修改</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">创建人：</div>
            <div class="col-item-label">行政区：</div>
            <div class="col-item-label">参数来源：</div>
            <div class="col-item-label">备注：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ baseinfo.creator }}</div>
            <div class="col-item-value">{{ baseinfo.scope }}</div>
            <div class="col-item-value">{{ baseinfo.source }}</div>
            <div class="col-item-value">{{ baseinfo.remark }}</div>
          </el-col>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">创建日期：</div>
            <div class="col-item-label">物业类型：</div>
            <div class="col-item-label">基准日期：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ baseinfo.create_date }}</div>
            <div class="col-item-value">{{ baseinfo.property_type }}</div>
            <div class="col-item-value">{{ baseinfo.base_date }}</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-label">参数类型：</div>
            <div class="col-item-label">物业用途：</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-value">{{ baseinfo.param_type }}</div>
            <div class="col-item-value">{{ baseinfo.property_usage }}</div>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="8">
            <el-button type="plain" size="mini" class="download-button" @click="onDownloadClick">下载模板</el-button>
          </el-col>
          <el-col v-if="termUploadShow" :span="16">
            <el-button type="primary" size="mini" class="upload-button" @click="onUploadTermClick">上传使用年期</el-button>
          </el-col>
          <el-col v-if="rjlUploadShow" :span="16">
            <el-button type="primary" size="mini" class="upload-button" @click="onUploadRjlClick">上传容积率表</el-button>
          </el-col>
        </el-row>
        <el-tabs @tab-click="onTabClick" >
          <el-tab-pane label="使用年期修正系数表" >
            <div style="overflow: hidden">
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData1" border size="small" stripe style="width: 28%; float: left">
                <el-table-column prop="id" label="序号" width="50">
                  <template slot-scope="scope">
                    <span>{{ scope.$index+1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="period" label="使用年限" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData2" border size="small" stripe style="width: 24%; float: left">
                <el-table-column prop="period" label="使用年限" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData3" border size="small" stripe style="width: 24%; float: left">
                <el-table-column prop="period" label="使用年限" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData4" border size="small" stripe style="width: 24%; float: left">
                <el-table-column prop="period" label="使用年限" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="容积率修正系数表" >
            <div >
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData5" border size="small" stripe style="width: 28%; float: left">
                <el-table-column prop="id" label="序号" width="50">
                  <template slot-scope="scope">
                    <span>{{ scope.$index+1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="period" label="容积率" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData6" border size="small" stripe style="width: 24%; float: left">
                <el-table-column prop="period" label="容积率" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData7" border size="small" stripe style="width: 24%; float: left">
                <el-table-column prop="period" label="容积率" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
              <el-table :header-cell-style="changeHeaderStyle" :data="tableData8" border size="small" stripe style="width: 24%; float: left">
                <el-table-column prop="period" label="容积率" />
                <el-table-column prop="value" label="修正系数" />
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="editBaseDialogFormVisible" title="修改基本信息" width="35%">
      <el-form ref="editForm" :model="editBaseinfo" :rules="baseRules" label-width="100px" size="small" >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="source" label="参数来源" >
              <el-input v-model="editBaseinfo.source" auto-complete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="基准日期" prop="base_date">
              <el-date-picker
                v-model="editBaseinfo.base_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark" >
              <el-input v-model="editBaseinfo.remark" auto-complete="off" rows="6" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onBtnCancelClick">取 消</el-button>
        <el-button type="primary" @click="onBtnComfirmClick('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="uploadTermDialogVisible" title="上传使用年期修正系数" width="50%">
      <template>
        <div class="components-container">
          <div class="editor-container">
            <upload-excel-component :on-success="onSuccess" :before-upload="onBeforeUpload" />
          </div>
        </div>
      </template>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onUploadCancelClick">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="uploadRjlDialogVisible" title="上传容积率修正系数" width="50%">
      <template>
        <div class="components-container">
          <div class="editor-container">
            <upload-excel-component :on-success="onRjlSuccess" :before-upload="onRjlBeforeUpload" />
          </div>
        </div>
      </template>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onUploadRjlCancelClick">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const TABLE_LEN = 20
const TABLE_NUM = 4
import UploadExcelComponent from '@/components/UploadExcel/UploadExcel'
import { getPriceIndexDetailById, updatePriceIndexDetailById, getPriceIndexById, downloadTemplate, uploadTemplate } from '@/api/priceIndex'
export default {
  components: { UploadExcelComponent },
  data() {
    return {
      baseinfo: {},
      editBaseinfo: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      tableData6: [],
      tableData7: [],
      tableData8: [],
      editBaseDialogFormVisible: false,
      termUploadShow: true,
      rjlUploadShow: false,
      uploadTermDialogVisible: false,
      uploadRjlDialogVisible: false,
      baseRules: {
        source: [
          { required: true, message: '请输入参数来源', trigger: 'blur' }
        ],
        base_date: [
          { required: true, message: '请输入基准日期', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  created() {
    this.id = this.$route.query.id
    this.getPriceIndexDetailById()
    // 使用年期
    this.getTermFactor()
    // 容积率
    this.getRjlFactor()
  },
  methods: {
    onRjlSuccess({ results, header }) {
      const data = {
        id: this.id,
        index_type: '容积率修正',
        data: results
      }
      uploadTemplate(data).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
          this.uploadRjlDialogVisible = false
          this.getRjlFactor()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onRjlBeforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    onUploadRjlClick() {
      this.uploadRjlDialogVisible = true
    },
    onUploadRjlCancelClick() {
      this.uploadRjlDialogVisible = false
    },
    onUploadCancelClick() {
      this.uploadTermDialogVisible = false
    },

    onBeforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    onUploadTermClick() {
      this.uploadTermDialogVisible = true
    },
    onSuccess({ results, header }) {
      const data = {
        id: this.id,
        index_type: '使用年期修正',
        data: results
      }
      uploadTemplate(data).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '上传成功！'
          })
          this.uploadTermDialogVisible = false
          this.getTermFactor()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onDownloadClick() {
      downloadTemplate().then(res => {
        if (res.code === 200) {
          window.location.href = res.url
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    getPriceIndexDetailById() {
      getPriceIndexDetailById(this.id).then(res => {
        if (res.code === 200) {
          this.baseinfo = res.data
          this.editBaseinfo = JSON.parse(JSON.stringify(res.data))
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    onTabClick(tab, event) {
      if (event.target.innerText === '使用年期修正系数表') {
        this.termUploadShow = true
        this.rjlUploadShow = false
      }
      if (event.target.innerText === '容积率修正系数表') {
        this.rjlUploadShow = true
        this.termUploadShow = false
      }
    },
    onEditClick() {
      this.editBaseDialogFormVisible = true
      /* this.$refs['editForm'].resetFields() */
    },
    onBtnComfirmClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePriceIndexDetailById(this.id, this.editBaseinfo).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.baseinfo = this.editBaseinfo
              this.editBaseDialogFormVisible = false
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '网络错误'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onBtnCancelClick() {
      this.editBaseDialogFormVisible = false
    },
    onEditFactorClick() {},
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    getTermFactor() {
      const param = {
        id: this.id,
        index_type: '使用年期修正',
        page: 1,
        limit: 200
      }
      getPriceIndexById(this.id, param).then(res => {
        if (res.code === 200) {
          const data = res.data
          if (data.length) {
          // 根据常量来遍历
            for (let i = 0; i < TABLE_NUM; i++) {
              if (i === TABLE_NUM - 1) {
                this['tableData' + (i + 1)] = data.slice(TABLE_LEN * i, data.length)
              } else {
                this['tableData' + (i + 1)] = data.slice(TABLE_LEN * i, TABLE_LEN * (i + 1))
              }
            }
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    },
    getRjlFactor() {
      const param = {
        id: this.id,
        index_type: '容积率修正',
        page: 1,
        limit: 200
      }
      getPriceIndexById(this.id, param).then(res => {
        if (res.code === 200) {
          const data = res.data
          if (data.length) {
          // 根据常量来遍历
            for (let i = 0; i < TABLE_NUM; i++) {
              if (data.length) {
                for (let i = 0; i < TABLE_NUM; i++) {
                  this['tableData' + (TABLE_NUM + i + 1)] = data.slice(TABLE_LEN * i, TABLE_LEN * (i + 1))
                }
              }
            }
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '网络错误'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.row-container{
    padding: 10px;
    /* margin-top: 10px; */
}
.col-item-label {
    /* margin-top: 10px; */
    margin-bottom: 20px;
    color: grey;
    text-align: left;
}
.col-item-value {
    /* margin-top: 10px; */
    margin-bottom: 20px;
    color: grey;
    height: 18px;
    text-align: left;
     overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}
.upload-button {
  position:absolute;
  top:5px;
  right: 0px;
  z-index: 10;
}
.edit-button {
  position:absolute;
  top:20px;
  right: 0px;
  z-index: 10;
}
.download-button {
  position:absolute;
  top:6px;
  right: 110px;
  z-index: 10;
}
</style>
