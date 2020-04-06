<template>
  <div ><!-- style="border:1px solid red" -->
    <Modal v-model="showMapComponent" :closable="false" :mask-closable="false" width="800" @on-cancel="cancel" >
      <baidu-map
        ref="baiduMap"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        :center="center"
        @click="getClickInfo"
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom">
        <!-- <bm-view style="width: 100%; height:1000px;" /> -->
        <!--  <bm-marker :position="{lng: center.lng, lat: center.lat}" /> -->
        <bml-curve-line :points="points" :editing="true" @lineupdate="update" />
      </baidu-map>
    </Modal>
  </div>
</template>
<script>
import { BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker, BmlCurveLine } from 'vue-baidu-map'
import { getLocationInfo } from '@/api/survey'
export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker,
    BmlCurveLine
  },
  props: {
    task_id: {
      type: String,
      default: function() {
        return ''
      }
    },
    center: {
      type: Object,
      default: function() {
        return { lng: 113.75179,
          lat: 23.02067 }
      }
    },
    value: {
      type: Boolean,
      default: true
    },
    mapHeight: {
      type: Number,
      default: 0
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
      zoom: 16,
      points: []
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
    this.setMapHeight()
    // 地图高度自适应
    window.onresize = () => {
      this.setMapHeight()
    }
    this.getLocationInfo()
  },
  methods: {
    setMapHeight() {
      const clientHeight = document.documentElement.clientHeight
      // const topHeight = this.$refs.searchTop ? this.$refs.searchTop.offsetHeight + 51 : 51
      this.$refs.baiduMap.$el.style.height = clientHeight - 140 + 'px'
    },
    update(e) {
      this.points = e.target.cornerPoints
    },
    getLocationInfo() {
      getLocationInfo(this.task_id).then(response => {
        if (response.code === 200) {
          response.data.forEach(element => {
            this.points.push({ lng: element.x, lat: element.y })
          })
        } else {
          this.$notify({
            title: '错误',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    /** *
     * 地图点击事件。
     */
    getClickInfo(e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    /** *
     * 确认
     */
    confirm: function() {
      console.log(this.center)
      this.showMapComponent = false
      this.$emit('confirm', this.center)
    },
    /** *
     * 取消
     */
    cancel: function() {
      this.showMapComponent = false
      this.$emit('cancel', this.showMapComponent)
    }
  }
}
</script>
<style scoped>
.serachinput{
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
