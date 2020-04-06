<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <div class="audit-button">
            <el-button v-if="form.status === 3" type="primary" size="mini" @click="onAuditClick" >审核</el-button>
          </div>
          <div class="sendMessage-button">
            <el-button v-if="label === '基本信息'" type="primary" size="mini" @click="onSupervisorClick" >发送消息</el-button>
          </div>
        </el-row>
        <el-tabs v-model="activeName" style="margin-left:20px" @tab-click="onTabClick">
          <el-tab-pane label="基本信息" name="first">
            <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
              <el-col :span="24">
                <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">{{ form.property_name }} </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="row-container">
                <div class="col-item-label">任务类型：</div>
                <div class="col-item-label">预计完成时间：</div>
                <!-- <div class="col-item-label">任务进度：</div> -->
                <div class="col-item-label">备注：</div>
              </el-col>
              <el-col :span="5" class="row-container">
                <div class="col-item-value">{{ form.task_type }}</div>
                <div class="col-item-value">{{ form.finish_date }}</div>
                <!-- <div class="col-item-value">{{ form.task_process }}</div> -->
                <div class="col-item-value">{{ form.remark }}</div>
              </el-col>
              <el-col :span="3" class="row-container">
                <div class="col-item-label">任务编号：</div>
                <div class="col-item-label">任务状态：</div>
                <div class="col-item-label">查勘人手机号：</div>
              </el-col>
              <el-col :span="5" class="row-container">
                <div class="col-item-value" >{{ form.task_id }}</div>
                <div class="col-item-value">
                  <span v-if="form.status ===1">待查勘</span>
                  <span v-if="form.status ===2">查勘中</span>
                  <span v-if="form.status ===3">待审核</span>
                  <span v-if="form.status ===4">重勘中</span>
                  <span v-if="form.status ===5">已完成</span>
                </div>
                <div class="col-item-value" >{{ form.mobile }}</div>
              </el-col>
              <el-col :span="4" class="row-container">
                <div class="col-item-label">查勘人：</div>
                <div class="col-item-label">查勘类型：</div>
              </el-col>
              <el-col :span="4" class="row-container">
                <div class="col-item-value">{{ form.surveyor }}</div>
                <div class="col-item-value">{{ form.survey_type }}</div>
              </el-col>
            </el-row>
            <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
              <el-col :span="24">
                <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">任务进度</div>
              </el-col>
            </el-row>
            <el-row >
              <el-progress :text-inside="true" :stroke-width="18" :percentage="form.task_progress " :status="status"/>
            </el-row>
            <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
              <el-col :span="24">
                <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:20px">消息</div>
              </el-col>
            </el-row>
            <el-row >
              <el-table ref="messageTable" :data="messageList" :header-cell-style="changeHeaderStyle" style="width:100%" border fit stripe size="small" >
                <el-table-column prop="id" label="序号" width="50">
                  <template slot-scope="scope">
                    <span>{{ scope.$index+1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" min-width="300" label="消息内容" />
                <el-table-column prop="type" label="消息类型" width="120" />
                <el-table-column prop="creator" label="发送人" width="120" />
                <el-table-column prop="create_time" label="发送时间" width="150" >
                  <template slot-scope="scope">
                    <span >{{ getParseTime(scope.row.create_time) }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-row type="flex" justify="center" style="margin-top:5px">
                <pagination
                  :total="listQuery.total"
                  :page.sync="listQuery.page"
                  :limit.sync="listQuery.limit"
                  :page-sizes="listQuery.pageSizes"
                  @pagination="getMessageById" />
              </el-row>
            </el-row>
            <!-- <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
              <el-col :span="24">
                <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">查勘路径</div>
              </el-col>
            </el-row>
            <el-row style="padding-left:20px">
              <locate :center="center" />
            </el-row> -->

          </el-tab-pane>
          <el-tab-pane label="查勘路径" name="second">
            <locate :task_id="task_id" />
          </el-tab-pane>
          <!-- 住宅型表单 -->
          <div v-if="form.survey_type ==='住宅型房地产'">
            <el-tab-pane label="住宅型查勘表格" name="third" >
              <residence-survey-form :task_id ="task_id" :residence_obj ="residence_obj" :property_name = "form.property_name"/>
            </el-tab-pane>
            <el-tab-pane label="查勘限制情况说明" name="third2" >
              <residence-limit-situation :task_id ="task_id" :residence_obj ="residence_obj" />
            </el-tab-pane>
          </div>
          <div v-if="form.survey_type ==='经营性房地产'">
            <el-tab-pane label="经营性查勘表格" name="four" >
              <commercial-survey-form :task_id="task_id" :commercial_obj ="commercial_obj" :property_name = "form.property_name" />
            </el-tab-pane>
            <el-tab-pane label="查勘限制情况说明" name="four2" >
              <commercial-limit-situation :task_id ="task_id" :commercial_obj ="commercial_obj" />
            </el-tab-pane>
          </div>
          <el-tab-pane label="查勘图片" name="fifth" >
            <survey-attachment :task_id="task_id" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="editDialogFormVisible" title="发送消息" width="32%">
      <el-form ref="editForm" :model="messageForm" :rules="rules" label-width="100px" size="small" >
        <el-row>
          <el-col :span="24">
            <el-form-item label="消息" prop="info" >
              <el-input v-model="messageForm.info" auto-complete="off" rows="10" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onBtnCancelClick">取 消</el-button>
        <el-button type="primary" @click="onBtnComfirmClick('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="editAuditVisible" title="审核" width="35%">
      <el-form ref="editAuditForm" :model="auditForm" label-width="100px" size="small" >
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果" prop="auditResult" >
              <el-radio-group v-model="auditForm.auditResult">
                <el-radio label="通过">通过</el-radio>
                <el-radio label="未通过">未通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="auditInfo" >
              <el-input v-model="auditForm.auditinfo" auto-complete="off" rows="10" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onBtnAuditCancelClick">取 消</el-button>
        <el-button type="primary" @click="onBtnAuditComfirmClick">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { formatDate } from '@/utils/date'
import { mapGetters } from 'vuex'
import locate from '@/views/survey/components/Locate'
import ResidenceSurveyForm from '@/views/survey/components/ResidenceSurveyForm'
import CommercialSurveyForm from '@/views/survey/components/CommercialSurveyForm'
import ResidenceLimitSituation from '@/views/survey/components/ResidenceLimitSituation'
import CommercialLimitSituation from '@/views/survey/components/CommercialLimitSituation'
import SurveyAttachment from '@/views/survey/components/SurveyAttachment'
import { getSurveyTaskById, auditSurveyTask, sendMessage, getMessageById, getResidenceInfo, getBusinessInfo } from '@/api/survey'
import { getUsers } from '@/api/user'
import { parseTime } from '@/utils/index'
export default {
  components: {
    locate,
    ResidenceSurveyForm,
    CommercialSurveyForm,
    SurveyAttachment,
    Pagination,
    ResidenceLimitSituation,
    CommercialLimitSituation
  },
  filters: {
    formatDate(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      form: {},
      auditForm: {
        auditResult: '通过',
        auditinfo: ''
      },
      task_id: '',
      activeName: 'first',
      width: '100%',
      messageList: [],
      editDialogFormVisible: false,
      editAuditVisible: false,
      showMapComponent: this.value,
      keyword: '',
      mapStyle: {
        width: '100%',
        height: '500px'
      },
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      zoom: 15,
      center: {
        lng: 114.064632,
        lat: 22.549225
      },
      percentage: 0,
      status: '',
      label: '基本信息',
      residence_obj: {},
      commercial_obj: {},
      messageForm: {
        info: ''
      },
      rules: {
        info: [{ required: true, message: '请输入消息内容', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name', 'login_name'
    ])
  },
  created() {
    this.task_id = this.$route.query.task_id
  },
  mounted() {
    this.getTaskById()
  },
  methods: {
    getResidenceInfo() {
      getResidenceInfo(this.task_id).then(response => {
        if (response.code === 200) {
          this.residence_obj = response.data
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getBusinessInfo() {
      getBusinessInfo(this.task_id).then(response => {
        if (response.code === 200) {
          this.commercial_obj = response.data
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getUserMobile(val) {
      const params = {
        real_name: val,
        limit: 1,
        page: 1
      }
      getUsers(params).then(response => {
        if (response.code === 200) {
          this.form.mobile = response.data.length === 1 ? response.data[0].mobile : ''
        }
        console.log(this.form.mobile)
      })
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    getMessageById(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      getMessageById(this.task_id, params).then(response => {
        this.messageList = response.data
        this.listQuery.total = response.cnt
      })
    },
    getParseTime(date) {
      return parseTime(new Date(date), '{y}-{m}-{d} {h}:{i}:{s}')
    },
    getTaskById() {
      getSurveyTaskById(this.task_id).then(response => {
        if (response.code === 200) {
          this.form = response.data
          this.form.finish_date = parseTime(new Date(this.form.finish_date), '{y}-{m}-{d}')
          this.getUserMobile(this.form.surveyor)
          this.getMessageById({ page: 1, limit: 10 })
          if (this.form.task_progress === 100) {
            this.status = 'success'
          }
          if (this.form.status === 5) {
            this.status = 'success'
            this.form.task_progress = 100
          }
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: err,
          duration: 5 * 1000
        })
      })
    },
    onAuditClick() {
      this.editAuditVisible = true
    },
    onBtnAuditCancelClick() {
      this.editAuditVisible = false
    },
    onBtnAuditComfirmClick() {
      let status = 0
      if (this.auditForm.auditResult === '通过') {
        status = 5 // 已完成
      } else {
        status = 4 // 重勘中
      }
      auditSurveyTask(this.task_id, { status: status, note: this.auditForm.auditinfo }).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: response.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: err,
          duration: 5 * 1000
        })
      })
      this.editAuditVisible = false
    },
    onDrage(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    onClick(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    // 标签点击事件
    onTabClick(tab, event) {
      /*  console.log(tab)
      console.log(event) */
      if (event.target.id === 'tab-second') {
        this.label = '查勘路径'
      }
      if (event.target.id === 'tab-third' || event.target.id === 'tab-third2') {
        this.label = '住宅型查勘表格'
        this.getResidenceInfo()
      }
      if (event.target.id === 'tab-four' || event.target.id === 'tab-four2') {
        this.label = '经营性查勘表格'
        this.getBusinessInfo()
      }
      if (event.target.id === 'tab-fifth') {
        this.label = '查勘图片'
      }
      if (event.target.id === 'tab-first') {
        this.label = '基本信息'
      }
    },
    onSupervisorClick() {
      this.editDialogFormVisible = true
    },
    onBtnCancelClick() {
      this.editDialogFormVisible = false
    },
    onBtnComfirmClick(formName) {
      const messageParams = {
        content: this.messageForm.info,
        task_id: this.task_id,
        type: '督办消息',
        creator: this.name
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sendMessage(messageParams).then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.msg
              })
              this.editDialogFormVisible = false
              this.getMessageById({ page: 1, limit: 10 })
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              type: 'error',
              message: err,
              duration: 5 * 1000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
    margin-bottom: 25px;
    color: grey;
    text-align: left;
}
.col-item-value {
    margin-bottom: 20px;
    color: grey;
    height: 23px;
    text-align: left;
     overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}
.audit-button {
  position:absolute;
  top:29px;
  right: 0px;
  z-index: 10;
}
.sendMessage-button {
  position:absolute;
  top:405px;
  right: 0px;
  z-index: 10;
}
.bm-view {
 height: 500px;
}
</style>
