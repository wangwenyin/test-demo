<template>
  <div style="height:100%">
    <div class="control" @click="onControlClick">
      <span><svg-icon :icon-class="caseActive ? 'icon_open' : 'icon_close'"/></span>
    </div>
    <div v-if="List.length !== 0" ref="detailContainner" class="detail-containner">
      <div v-for="o in List" :key="o.parcel_no" class="detail-item" @click="onCardCilck(o)">
        <el-card shadow="hover" >
          <div >
            <span> <i class="el-icon-location" /></span>
            <span style="font-size: 16px;font-weight: bold; ">{{ type==='土地'?o.parcel_no:o.prj_name }} </span>
            <span style="margin-right: 40px;float: right;">
              <el-button size="mini" type="text" @click.stop="onDetailCilck(o)">详情</el-button>
            </span>
          </div>
          <div v-if="type==='土地'">
            <div style="margin-top: 15px;margin-left: 0;font-size: 12px;color: grey;" >
              <span v-if="o.address ">{{ o.address }}</span>
            </div>
            <div style="margin-top: 9px;margin-bottom: 12px;margin-left: 0%;font-size: 12px;color: grey;">
              <span v-if="o.land_attr">{{ o.land_attr }}&nbsp;&nbsp;|</span>
              <span v-if="o.land_grade ">{{ o.land_grade }}&nbsp;&nbsp;|</span>
              <span v-if=" o.land_usage">{{ o.land_usage }}</span>
            </div>
          </div>
          <div v-else>
            <div style=" margin-top: 15px;margin-left: 0;font-size: 12px;color: grey;" >
              <span v-if="o.district">{{ o.district }}&nbsp;&nbsp;|</span>
              <span v-if="o.subdistrict">{{ o.subdistrict }}</span>
            </div>
            <div style="margin-top: 9px;margin-bottom: 12px;margin-left: 0%;font-size: 12px;color: grey;">
              <span v-if="o.bldg_num">共{{ o.bldg_num }}栋&nbsp;&nbsp;|</span>
              <span v-if="o.unit_num">共{{ o.unit_num }}户&nbsp;&nbsp;|</span>
              <span v-if="o.const_year">{{ o.const_year }}建成</span>
            </div>
            <useTag v-if="o.contain_usage" :tags="o.contain_usage"/>
          </div>
        </el-card>
      </div>
      <pagination
        :total="listQuery.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :page-sizes="listQuery.pageSizes"
        style="padding: 10px 0px;"
        layout="prev, pager, next"
        @pagination="getData" />
    </div>
    <div v-if="List.length === 0">
      <span style="color: grey;">没有符合条件的数据！</span>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import useTag from '@/views/property/components/UseTag'
export default {
  components: {
    Pagination,
    useTag
  },
  props: {
    listQuery: {
      type: Object,
      default: function() {
        return {
          page: 1,
          limit: 10,
          total: 0,
          pageSizes: [10, 20, 30, 50] }
      }
    },
    List: {
      type: Array,
      default: function() {
        return []
      }
    },
    type: {
      type: String,
      default: ''
    },
    caseActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onControlClick() {
      this.caseActive = !this.caseActive
      this.$emit('activeChange', this.caseActive)
    },
    onCardCilck(val) {
      this.$emit('onCardCilck', val)
    },
    getData(val) {
      this.$emit('getData', val)
    },
    onDetailCilck(val) {
      this.$emit('onDetailCilck', val)
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.detail-containner .el-card__body {
    padding: 12px;
}
.control {
  position: absolute;
  left: -30px;
  top: 50%;
  width: 30px;
  height: 50px;
  background-color: #fff;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
  line-height: 50px;
  text-align: center;
  transform: translateY(-25px);
}
.base_info {
  padding: 10px 22px;
  border-bottom: 1px solid #eee;
  .name {
      font-size: 24px;
      span:first-child {
      color: #011938;
      }
  }
}
.detail-containner {
  width: 101%;
  height: 98%;
  overflow: auto;
  .detail-item {
    overflow: hidden;
    .detail-top {
    margin-bottom: 5px;
    span {
      margin-right: 15px;
      color: #011938;
      font-size: 15px;
    }
    span:nth-child(1) {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #409EFF;
    }
    span:nth-child(2) {
      font-size: 20px
    }
    span:nth-child(3) {
      font-weight: bold;
    }
    span:nth-child(4) {
      float: right;
      color: red
    }
    }
    .detail-bottom {
      float: right;
      width: 96%;
      padding: 10px 15px;
      border-radius: 20px 0px 0px 20px;
      background-color: #eef5f9;
      div {
        margin-bottom: 5px
        span {
          margin-right: 15px;
          color: #011938;
          font-size: 12px;
        }
        span:last-child {
          float: right;
        }
      }
    }
  }
}
</style>
