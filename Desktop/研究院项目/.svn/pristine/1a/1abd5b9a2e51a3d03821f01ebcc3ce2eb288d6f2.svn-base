<template>
  <div style="border:1px solid grey">
    <Modal v-model="showMapComponent" :closable="false" :mask-closable="false" width="800" @on-cancel="cancel">
      <baidu-map
        ref="baiduMap"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        :center=" { lng: 114.064632, lat: 22.549225 }"
        class="bm-view"
        @click="getClickInfo"
      >
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"/>
        <bm-view ref="baiduView" />
        <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" @dragend="onDrage" @click="onClick"/>
        <bm-control offset="{width: '10px', height: '10px'}">
          <bm-auto-complete v-model="keyword" :sug-style="{zIndex: 999999}">
            <input type="text" placeholder="请输入搜索关键字" class="serachinput">
          </bm-auto-complete>
        </bm-control>
        <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"/>
        <NearbyOverlay v-for="item in nearbyData" :key="item.id" :position="{lng: item.x, lat: item.y}" :data="item" :showkey="showkey" :active-value="activeValue" />
      </baidu-map>
      <div
        slot="footer"
        style="position: absolute;margin-top: -53px;background: white;padding: 10px;padding-right: 44px;">
        <el-row>
          <el-col v-if="isLocating" :span="24" >
            <span>x:</span>
            <el-input v-model="center.lng" style="width:130px" readonly="true" size="small"/>
            <span>y:</span>
            <el-input v-model="center.lat" style="width:130px" readonly="true" size="small"/>
            <el-button type="primary" size="small" @click="confirm">确定</el-button>
            <el-button size="small" @click="cancel">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </Modal>
  </div>
</template>
<script>
import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker
} from 'vue-baidu-map'
import NearbyOverlay from '@/views/datatools/locate/components/NearbyOverlay'
export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker,
    NearbyOverlay
  },
  props: {
    showkey: {
      type: String,
      default: 'prj_name'
    },
    center: {
      type: Object,
      default: function() {
        return { lng: 114.064632, lat: 22.549225 }
      }
    },
    isLocating: {
      type: Boolean,
      default: false
    },
    mapHeight: {
      type: Number,
      default: 500
    },
    nearbyData: {
      type: Array,
      default: null
    },
    activeValue: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      showMapComponent: this.value,
      keyword: '',
      mapStyle: {
        width: '100%',
        height: this.mapHeight + 'px'
      },
      zoom: 15
    }
  },
  watch: {
    value: function(currentValue) {
      this.showMapComponent = currentValue
      if (currentValue) {
        this.keyword = ''
      }
    }
  },
  mounted() {
    this.setHeight()
    // 屏幕适应大小
    window.onresize = () => {
      this.setHeight()
    }
  }, methods: {
    onDrage(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    onClick(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    /** *
     * 地图点击事件。
     */
    getClickInfo(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    // syncCenterAndZoom(e) {
    //   const { lng, lat } = e.target.getCenter()
    //   this.center.lng = lng
    //   this.center.lat = lat
    //   // this.zoom = e.target.getZoom()
    // },
    /** *
     * 确认
     */
    confirm: function() {
      console.log(this.center)
      this.showMapComponent = false
      this.$emit('confirm', this.type, this.center)
    },
    /** *
     * 取消
     */
    cancel: function() {
      this.showMapComponent = false
      this.$emit('cancel', this.showMapComponent)
    },
    onSelect(select, position) {
      this.$emit('onSelect', this.type, position, select)
    },
    setHeight() {
      this.$refs.baiduView.$el.style.height = this.$refs.baiduMap.$el.style.height = document.documentElement.clientHeight - 170 + 'px'
    }
  }

}
</script>

<style scoped>
.serachinput {
  box-sizing: border-box;
  padding: 9px;
  border: 1px solid #dddee1;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 4px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}
</style>
