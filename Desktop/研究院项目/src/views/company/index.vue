<template>
  <div>
    <el-row class="search-box" >
      <el-button type="primary" size="small" round @click="onOpenCreateForm" >+创建机构</el-button>
      <el-input
        v-model="searchOption.text"
        placeholder="请输入机构名称"
        class="input-with-select"
        style="width:500px;float:right"
        size="small"
        @keyup.enter.native="onInputEnter" >
        <el-button slot="append" icon="el-icon-search" @click="onBtnCompanySearchClick" />
      </el-input>
    </el-row>
    <el-row style="padding:5px">
      <el-table ref="companyTable" :data="tableData" :header-cell-style="changeHeaderStyle" style="width:100%" border fit size="small" >
        <el-table-column label="序号" type="index" width="50" align="center" />
        <el-table-column label="机构名称" align="center" prop="company_name" />
        <el-table-column label="法定代表人" align="center" prop="person" />
        <el-table-column label="资质等级" align="center" prop="level" />
        <el-table-column label="证书编号" align="center" prop="cert_no" />
        <el-table-column label="有效开始时间" align="center" prop="start_time" />
        <el-table-column label="有效截止时间" align="center" prop="end_time" />
        <el-table-column label="地址" align="center" prop="address" />
        <el-table-column label="操作" width="300" align="center" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onBtnEditClick(scope.$index, scope.row)" >编辑</el-button>
            <el-button size="mini" type="danger" @click="onBtnDeleteClick(scope.$index, scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px" >
        <pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :page-sizes="listQuery.pageSizes"
          @pagination="getCompanyList" />
      </el-row>
    </el-row>
    <el-dialog ref="dialog" :visible.sync="createFormVisible" :title="editForm.title" width="50%" >
      <el-form ref="form" :model="editForm" label-width="100px" label-position="right">
        <el-row >
          <el-col :span="12">
            <el-form-item label="机构名称" size="small" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人" prop="property_type">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="资质等级" prop="property_type">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证书编号" prop="property_type">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="有效开始时间" prop="property_type">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效截止时间" prop="property_type">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="地址" prop="property_type">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="资格证书" prop="property_type">
              <div class="components-container">
                <div class="editor-container">
                  <dropzone id="myVueDropzone" :url="uploadUrl" :max-files="1" :default-img="form.certification_image" @dropzone-success="uploadFileSuccess" @dropzone-removedFile="beforeRemovedFile" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <el-form-item label="营业执照" prop="property_type">
              <div class="components-container">
                <div class="editor-container">
                  <dropzone id="myVueDropzone2" :url="uploadUrl" :max-files="1" :default-img="form.certification_image" @dropzone-success="uploadFileSuccess" @dropzone-removedFile="beforeRemovedFile" />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onBtnOKClick('createForm')" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Dropzone from '@/components/Dropzone'
export default {
  components: { Pagination, Dropzone },
  data() {
    return {
      searchOption: {
        clause: '登录名',
        text: null
      },
      form: {},
      uploadUrl: 'https://httpbin.org/post',
      tableData: [{
        company_name: '力合物业',
        person: '张三',
        level: '一级',
        cert_no: '建房估证2010001号',
        start_time: '2016-01-01',
        end_time: '2019-01-01',
        address: '深圳市'
      },
      {
        company_name: '斯维尔',
        person: '张三',
        level: '一级',
        cert_no: '建房估证2010002号',
        start_time: '2016-01-01',
        end_time: '2019-01-01',
        address: '深圳市'
      }],
      createFormVisible: false,
      editForm: {},
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      }
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    onOpenCreateForm() {
      this.editForm = {
        title: '新增机构',
        company_name: '',
        person: '',
        level: '',
        cert_no: '',
        start_time: '',
        end_time: '',
        address: ''
      }
      this.createFormVisible = true
    },
    onBtnCompanySearchClick() {},
    onInputEnter() {},
    onBtnEditClick(val) {
      this.editForm = {
        title: '编辑机构',
        company_name: val.company_name,
        person: val.person,
        level: val.level,
        cert_no: val.cert_no,
        start_time: val.start_time,
        end_time: val.end_time,
        address: val.address
      }
      this.createFormVisible = true
    },
    onBtnDeleteClick() {},
    onCancel() {
      this.createFormVisible = false
    },
    onBtnOKClick() {},
    uploadFileSuccess() {},
    beforeRemovedFile() {},
    getCompanyList() {},
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
