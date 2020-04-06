<template>
  <el-tabs v-model="activeName" class="survey-tabs__box">
    <el-tab-pane label="查勘表格" name="first">
      <div class="survey-container">
        <div class="survey-title">
          <span v-if="back_reason" class="back-reason">退回原因：{{ back_reason }}</span>
        </div>
        <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
        <el-row>
          <el-col :span="22" :offset="1">
            <table class="table" >
              <tr class="tr_title">
                <td colspan="4" class="td">
                  <span class="title-small">区位状况</span>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">地址：</span>
                </td>
                <td class="tdtext">
                  <el-select v-model="region" size="small">
                    <el-option
                      v-for="item in regions"
                      :key="item"
                      :value="item"/>
                  </el-select>
                  <input v-model="data.form_data.location.address" type="text" placeholder="请输入" class="detail-address">
                </td>
                <td class="td">
                  <span class="normal">地理坐标：</span>
                </td>
                <td class="tdtext">
                  <span class="units">X:</span>
                  <el-input-number v-model="coordinate.x" :controls="false" size="small" placeholder="请输入" />
                  <span class="units">Y:</span>
                  <el-input-number v-model="coordinate.y" :controls="false" size="small" placeholder="请输入" />
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">公交站点：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.bus_station" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">地铁站点：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.metro_station" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">公交路线：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.bus_routes" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">交通管制：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.traffic_control" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">环境质量：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.location.env_quality">
                    <el-radio label="好">好</el-radio>
                    <el-radio label="较好">较好</el-radio>
                    <el-radio label="一般">一般</el-radio>
                    <el-radio label="较差">较差</el-radio>
                    <el-radio label="差">差</el-radio>
                  </el-radio-group>
                </td>
                <td class="td">
                  <span class="normal">环境说明：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.env_desc" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">周边景观：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.location.landscape">
                    <el-radio label="好">好</el-radio>
                    <el-radio label="较好">较好</el-radio>
                    <el-radio label="一般">一般</el-radio>
                    <el-radio label="较差">较差</el-radio>
                    <el-radio label="差">差</el-radio>
                  </el-radio-group>
                </td>
                <td class="td">
                  <span class="normal">景观说明：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.landscape_desc" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">小学学位：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.primary_school" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">初中学位：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.location.junior_high_school" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr" >
                <td class="td" >
                  <span class="normal">基础设施：</span>
                </td>
                <td class="tdtext" >
                  <textarea v-model="data.form_data.location.infrastructure" cols="30" rows="2" placeholder="请输入"/>
                </td>
                <td class="td" >
                  <span class="normal">生活设施：</span>
                </td>
                <td class="tdtext" >
                  <textarea v-model="data.form_data.location.living_facilities" cols="30" rows="2" placeholder="请输入"/>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">其他情况说明：</span>
                </td>
                <td class="tdtext" colspan="3">
                  <input v-model="data.form_data.location.other_notes" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr_title">
                <td colspan="4" class="td">
                  <span class="title-small">小区信息</span>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">物业管理公司：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.project.prop_man_company" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">物业管理水平：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.project.prop_man_level">
                    <el-radio label="好">好</el-radio>
                    <el-radio label="较好">较好</el-radio>
                    <el-radio label="一般">一般</el-radio>
                    <el-radio label="较差">较差</el-radio>
                    <el-radio label="差">差</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">物业管理费：</span>
                </td>
                <td class="tdtext">
                  <el-input-number v-model="data.form_data.project.prop_man_fee" :controls="false" size="small" />
                  <span class="units">元/平方米*月</span>
                </td>
                <td class="td">
                  <span class="normal">内部环境：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.project.internal_env">
                    <el-radio label="好">好</el-radio>
                    <el-radio label="较好">较好</el-radio>
                    <el-radio label="一般">一般</el-radio>
                    <el-radio label="较差">较差</el-radio>
                    <el-radio label="差">差</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr class="tr_title">
                <td colspan="4" class="td">
                  <span class="title-small">建筑物信息 </span>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">楼栋名称：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.building.bldg_name" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">总层数：</span>
                </td>
                <td class="tdtext">
                  <el-input-number v-model="data.form_data.building.floors" :controls="false" size="small" />
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">竣工日期：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.building.const_end_date" class="units-value" type="text" placeholder="请输入">
                  <span class="units">年</span>
                </td>
                <td class="td">
                  <span class="normal">成新率：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.building.residue_ratio" class="units-value" type="text" placeholder="请输入">
                  <span class="units">成新</span>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">建筑外观：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.building.exterior" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">建筑结构：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.building.structure" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">梯户比：</span>
                </td>
                <td class="tdtext">
                  <input v-model="elevator_unit_ratio.unit" class="units-value" type="text" placeholder="请输入">
                  <span class="units">单元</span>
                  <input v-model="elevator_unit_ratio.stairs" class="units-value" type="text" placeholder="请输入">
                  <span class="units">梯</span>
                  <input v-model="elevator_unit_ratio.house" class="units-value" type="text" placeholder="请输入">
                  <span class="units">户</span>
                </td>
                <td class="td">
                  <span class="normal">空间布局：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.building.spatial_layout" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr_title">
                <td colspan="4" class="td">
                  <span class="title-small">房屋信息 </span>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">房屋名称：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.unit_no" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">现状用途：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.actual_usage" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">所在层：</span>
                </td>
                <td class="tdtext">
                  <el-input-number v-model="data.form_data.house.actual_floor" :controls="false" size="small" />
                </td>
                <td class="td">
                  <span class="normal">建筑面积：</span>
                </td>
                <td class="tdtext">
                  <el-input-number v-model="data.form_data.house.built_in_area" :controls="false" size="small" />
                  <span class="units">㎡</span>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">房屋性质：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.nature" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">使用状况：</span>
                </td>
                <td class="tdtext">
                  <el-select v-model="data.form_data.house.usage_status" size="small">
                    <el-option
                      v-for="item in usage_status_list"
                      :key="item"
                      :value="item"/>
                  </el-select>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">朝向：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.house.fact_to">
                    <el-radio label="东">东</el-radio>
                    <el-radio label="东南">东南</el-radio>
                    <el-radio label="南">南</el-radio>
                    <el-radio label="西南">西南</el-radio><br>
                    <el-radio label="西">西</el-radio>
                    <el-radio label="东北">东北</el-radio>
                    <el-radio label="北">北</el-radio>
                    <el-radio label="西北">西北</el-radio>
                  </el-radio-group>
                </td>
                <td class="td">
                  <span class="normal">朝向说明：</span>
                </td>
                <td class="tdtext">
                  <textarea v-model="data.form_data.house.face_to_desc" cols="30" rows="2" placeholder="请输入"/>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">可视景观：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.landscape" type="text" placeholder="请输入">
                </td>
                <td class="td"/>
                <td class="tdtext"/>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">采光通风：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.house.lighting_ventilation">
                    <el-radio label="好">好</el-radio>
                    <el-radio label="较好">较好</el-radio>
                    <el-radio label="一般">一般</el-radio>
                    <el-radio label="较差">较差</el-radio>
                    <el-radio label="差">差</el-radio>
                  </el-radio-group>
                </td>
                <td class="td">
                  <span class="normal">采光通风说明：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.lighting_ventilation_desc" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">噪音废气：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.house.noise_exhaust_gas">
                    <el-radio label="好">好</el-radio>
                    <el-radio label="较好">较好</el-radio>
                    <el-radio label="一般">一般</el-radio>
                    <el-radio label="较差">较差</el-radio>
                    <el-radio label="差">差</el-radio>
                  </el-radio-group>
                </td>
                <td class="td">
                  <span class="normal">噪音废气说明：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.noise_exhaust_gas_desc" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">户型：</span>
                </td>
                <td id="house-type" class="tdtext">
                  <input v-model="houseType.room" type="text" placeholder="请输入">
                  <span class="units">房</span>
                  <input v-model="houseType.hall" type="text" placeholder="请输入">
                  <span class="units">厅</span>
                  <input v-model="houseType.guard" type="text" placeholder="请输入">
                  <span class="units">卫</span>
                  <input v-model="houseType.veranda" type="text" placeholder="请输入">
                  <span class="units">阳台</span>
                </td>
                <td class="td">
                  <span class="normal">户型结构：</span>
                </td>
                <td class="tdtext">
                  <el-select v-model="data.form_data.house.house_structure" size="small">
                    <el-option
                      v-for="item in structure_list"
                      :key="item"
                      :value="item"/>
                  </el-select>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">户型布局：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.layout" type="text" placeholder="请输入">
                </td>
                <td class="td">
                  <span class="normal">附加空间：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.additional_space" type="text" placeholder="请输入">
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">装修装饰：</span>
                </td>
                <td class="tdtext">
                  <el-radio-group v-model="data.form_data.house.decoration">
                    <el-radio label="豪华">豪华</el-radio>
                    <el-radio label="精装">精装</el-radio>
                    <el-radio label="简装">简装</el-radio>
                    <el-radio label="毛坯">毛坯</el-radio>
                  </el-radio-group>
                </td>
                <td class="td">
                  <span class="normal">装修说明：</span>
                </td>
                <td class="tdtext">
                  <textarea v-model="data.form_data.house.decoration_desc" cols="30" rows="2" placeholder="请输入"/>
                </td>
              </tr>
              <tr class="tr">
                <td class="td">
                  <span class="normal">设施设备：</span>
                </td>
                <td class="tdtext">
                  <input v-model="data.form_data.house.facility" type="text" placeholder="请输入">
                </td>
                <td class="td"/>
                <td class="tdtext"/>
              </tr>
            </table>
          </el-col>
        </el-row>
        <br>
        <span class="sub-title" >流程信息</span>
        <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
        <el-row :gutter="20">
          <el-col :span="22" :offset="1">
            <el-radio-group v-model="data.node_info.is_adjust">
              <el-radio :label="1">需要调整价格</el-radio>
              <el-radio :label="0">不需要调整价格</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col :span="22" :offset="1">
            <el-input v-model="data.node_info.reason" :rows="5" :readonly="node!==cur_node || username !== operator" type="textarea" placeholder="请输入理由"/>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col v-if="data.node_info.is_adjust === 1" :span="22" :offset="1">
            <el-select v-model="data.node_info.re_appraiser" placeholder="选择复核估价人员" size="small">
              <el-option
                v-for="(item, index) in re_appraisers"
                :key="index"
                :value="item.real_name"/>
            </el-select>
            <el-button :disabled="node!==cur_node || username !== operator" size="small" type="primary" @click="onCreateSingleappTaskClick">创建个案估价任务</el-button>
          </el-col>
          <el-col v-else :span="22" :offset="1">
            <el-select v-model="data.node_info.final_reviewer" placeholder="选择终审人员" size="small">
              <el-option
                v-for="(item, index) in final_reviewers"
                :key="index"
                :value="item.real_name"/>
            </el-select>
            <el-button :disabled="node!==cur_node || username !== operator" size="small" type="primary" @click="onSubmitFinalReviewClick">提交终审</el-button>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="查勘图片" name="second">
      <el-row>
        <dropzone id="myVueDropzone" :url="uploadUrl" :max-files="5" :default-img="defaultImg" @dropzone-success="uploadFileSuccess" @dropzone-removedFile="beforeRemovedFile" />
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { getFieldSurveyDetail, updateFieldSurvey, getUsers, getSurveyImgs, deleteSurveyImg } from '@/api/dispute/pricereview'
import Dropzone from './Dropzone'

export default {
  components: { Dropzone },
  filters: {
    scoreTotext(score) {
      if (score <= 20) {
        return '差'
      } else if (score <= 40) {
        return '较差'
      } else if (score <= 60) {
        return '一般'
      } else if (score <= 80) {
        return '较好'
      } else {
        return '好'
      }
    }
  },
  props: {
    taskId: {
      type: String,
      default: ''
    },
    cur_node: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    operator: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: 'first',
      node: '现场查勘',
      back_reason: '',
      defaultImg: [],
      data: {
        node_info: {
          is_adjust: 1,
          re_appraiser: '',
          final_reviewer: '',
          reason: ''
        },
        form_data: {
          location: {
            address: '',
            coordinate: '',
            bus_station: '',
            metro_station: '',
            bus_routes: '',
            traffic_control: '',
            env_quality: '好',
            env_desc: '',
            landscape: '好',
            landscape_desc: '',
            primary_school: '',
            junior_high_school: '',
            infrastructure: '',
            living_facilities: '',
            other_notes: ''
          },
          project: {
            prop_man_company: '',
            prop_man_fee: 0,
            prop_man_level: '好',
            internal_env: '好'
          },
          building: {
            bldg_name: '',
            floors: 0,
            const_end_date: '',
            residue_ratio: '',
            exterior: '',
            structure: '',
            elevator_unit_ratio: '',
            spatial_layout: ''
          },
          house: {
            unit_no: '',
            actual_usage: '',
            actual_floor: 0,
            built_in_area: 0,
            nature: '',
            usage_status: '自用',
            fact_to: '东',
            face_to_desc: '',
            landscape: '',
            lighting_ventilation: '好',
            lighting_ventilation_desc: '',
            noise_exhaust_gas: '好',
            noise_exhaust_gas_desc: '',
            type: '',
            house_structure: '平层',
            layout: '',
            additional_space: '',
            decoration: '精装',
            decoration_desc: '',
            facility: ''
          }
        }
      },
      coordinate: {
        x: '',
        y: ''
      },
      elevator_unit_ratio: {
        unit: '',
        stairs: '',
        house: ''
      },
      houseType: {
        room: '',
        hall: '',
        guard: '',
        veranda: ''
      },
      region: '福田区',
      regions: ['宝安区', '南山区', '福田区', '罗湖区', '龙华区', '龙岗区'],
      usage_status_list: ['自用', '出租'],
      structure_list: ['平层', '复式楼'],
      re_appraisers: [],
      final_reviewers: [],
      listQuery: {
        role: 'appraiser',
        limit: 10,
        page: 1
      }
    }
  },
  computed: {
    uploadUrl() {
      return `${process.env.BASE_API}/dispute/materials/${this.taskId}`
    }
  },
  created() {
    this.getAppraiser()
    this.getFinalReviewers()
    this.getSurveyImgs()
    // 查看或需显示退回信息时
    if (this.cur_node !== this.node || this.status === '退回') {
      this.getFieldSurveyDetail()
    }
  },
  mounted() {
    this.setFormStatus()
  },
  methods: {
    getSurveyImgs() {
      getSurveyImgs(this.taskId).then(res => {
        this.defaultImg = res.url
      })
    },
    beforeRemovedFile(file) {
      console.log(file)
      const response = file.xhr ? JSON.parse(file.xhr.response) : {}
      const urlParts = file.url ? file.url.split('/') : response.url.split('/')
      const data = {
        matrl_name: urlParts.reverse()[0]
      }
      deleteSurveyImg(this.taskId, data).then(res => {
        this.$message({ message: '删除成功', type: 'success' })
      })
    },
    uploadFileSuccess(file) {
      this.$message({ message: '上传成功！', type: 'success' })
    },
    // 获取查勘详情
    getFieldSurveyDetail() {
      const params = {
        id: this.taskId,
        node: this.node
      }
      getFieldSurveyDetail(params).then(res => {
        // 没办法，后台返回的数据结构跟传人不一样
        this.back_reason = res.data.back_reason
        this.data.node_info = {
          is_adjust: res.data.node_info.is_adjust,
          re_appraiser: res.data.node_info.appraiser,
          final_reviewer: res.data.node_info.final_reviewer,
          reason: res.data.node_info.reason
        }
        this.data.form_data.location = res.data.location
        const coordinateList = res.data.location.coordinate.split(';')
        this.coordinate = {
          x: coordinateList[0] === 'undefined' ? '' : coordinateList[0],
          y: coordinateList[1] === 'undefined' ? '' : coordinateList[1]
        }
        this.data.form_data.project = res.data.project
        this.data.form_data.building = res.data.building
        if (res.data.building.elevator_unit_ratio) {
          this.elevator_unit_ratio = {
            unit: res.data.building.elevator_unit_ratio[0],
            stairs: res.data.building.elevator_unit_ratio[1],
            house: res.data.building.elevator_unit_ratio[2]
          }
        }
        this.data.form_data.house = res.data.house
        if (res.data.house.type) {
          this.houseType = {
            room: res.data.house.type[0],
            hall: res.data.house.type[1],
            guard: res.data.house.type[2],
            veranda: res.data.house.type[3]
          }
        }
      })
    },
    getAppraiser() {
      getUsers(this.listQuery).then(res => {
        this.re_appraisers = res.data
      })
    },
    getFinalReviewers() {
      this.listQuery.role = 'final_reviewer'
      getUsers(this.listQuery).then(res => {
        this.final_reviewers = res.data
      })
    },
    // 当查看时，设置查勘form只读
    setFormStatus() {
      if (this.node !== this.cur_node) {
        const inputs = document.querySelectorAll('input')
        const textareas = document.querySelectorAll('textarea')
        const input_box_list = Array.from(inputs).concat(Array.from(textareas))
        input_box_list.forEach(input => {
          input.setAttribute('readonly', true)
        })
      }
    },
    // 创建个案查勘任务
    onCreateSingleappTaskClick() {
      if (!this.data.node_info.reason) {
        this.$message({
          message: '请填写调整原因!',
          type: 'warning'
        })
        return
      } else if (!this.data.node_info.re_appraiser) {
        this.$message({
          message: '请分配复核估价人员!',
          type: 'warning'
        })
        return
      }
      this.transformData()
      const data = { node: this.node, ...this.data.node_info, form_data: this.data.form_data }
      delete data.final_reviewer
      updateFieldSurvey(this.taskId, data).then(res => {
        if (res.msg === 'ok') {
          this.$message({
            message: '提交成功!',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ name: 'DisputeTask' })
          }, 1000)
        }
      })
    },
    // 数据处理
    transformData() {
      this.data.form_data.location.coordinate = this.coordinate.x + ';' + this.coordinate.y
      this.data.form_data.building.elevator_unit_ratio = this.elevator_unit_ratio.unit + this.elevator_unit_ratio.stairs + this.elevator_unit_ratio.house
      this.data.form_data.house.type = this.houseType.room + this.houseType.hall + this.houseType.guard + this.houseType.veranda
    },
    // 提交终审
    onSubmitFinalReviewClick() {
      if (!this.data.node_info.reason) {
        this.$message({
          message: '请填写不调整原因!',
          type: 'warning'
        })
        return
      } else if (!this.data.node_info.final_reviewer) {
        this.$message({
          message: '请分配终审人员!',
          type: 'warning'
        })
        return
      }
      this.transformData()
      const data = { node: this.node, ...this.data.node_info, form_data: this.data.form_data }
      delete data.re_appraiser
      updateFieldSurvey(this.taskId, data).then(res => {
        if (res.msg === 'ok') {
          this.$message({
            message: '提交成功!',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push({ name: 'DisputeTask' })
          }, 1000)
        }
      })
    },
    changeTaskStatus(node, status, i) {
      this.$store.commit('changeTaskStatus', { node, status, i })
      setTimeout(() => {
        this.$router.push({ name: 'DisputeTask' })
      }, 1000)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.survey-container .table {
  border-collapse:collapse;
}
.survey-container .sub-title, .title-small, .el-tabs .sub-title {
  color: grey;
  font-weight: bold;
}
.survey-container .sub-title {
  font-size: 18px;
}
.survey-container .title-small {
  font-size: 16px;
}
.survey-container .tdtext input, .tdtext textarea {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  outline: none;
  border: 0
}
.survey-container .tdtext input.fee-units-value {
  width: 70%;
}
.survey-container .tdtext input.units-value {
  width: 20%;
}
.survey-container #house-type input {
  width: 10%;
}
.survey-container .tdtext .el-select {
  float: left;
  width: 25%;
  outline: none
}
.survey-container .tdtext .detail-address {
  float: left;
  width: 75%
}
.survey-container .el-radio-group {
  margin-left: 10px;
}
.survey-container .el-radio+.el-radio {
  margin-left: 20px;
}
.survey-container .units {
  margin-left: 10px;
  color: #606266;
  font-size: 14px;
}
.survey-container .normal {
  color: #606266;
  font-size: 15px;
  font-weight: 700;
}
.survey-container .td {
  width: 13%;
  height: 33px;
  border: 1px solid #c0c4cc;
  text-align: right
}
.survey-container .tr_title .td {
  padding-left: 30px;
  text-align: left;
}
.survey-container .tdtext {
  border: .5px solid #c0c4cc;
  width: 37%;
}
.survey-container .tdtext input, .tdtext textarea {
  color: #606266;
  font-size: 14px;
}
.survey-container .survey-title {
  overflow: hidden;
}
.survey-container .survey-title .sub-title {
  float: left;
}
.survey-container .back-reason {
  float: right;
  color: red
}
.survey-container .el-input__inner {
  border: 0 !important
}
.survey-tabs__box .el-tabs__item {
  font-size: 16px
}
</style>
