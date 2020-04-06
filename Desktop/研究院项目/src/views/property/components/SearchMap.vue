<template>
  <baidu-map ref="baiduMap" :center="center" :zoom="zoom" :map-click="false" :scroll-wheel-zoom="true" class="baiduMap" @ready="mapReady">
    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP','BMAP_PERSPECTIVE_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"/>
    <SearchOverlay
      v-for="item in list"
      :key="item.id"
      :position="{lng: item.x, lat: item.y}"
      :data="item"
      :type="type"
      :use="use"
      :active-value="searchValue"
      @onTipClick="onTipClick"
    />
  </baidu-map>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/Map/Map'
import SearchOverlay from '@/views/property/components/SearchOverlay'
export default {
  components: { BaiduMap, SearchOverlay },
  props: {
    type: {
      type: String,
      default: 'project'
    },
    use: {
      type: String,
      default: '住宅'
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    zoom: {
      type: Number,
      default: 18
    },
    center: {
      type: Object,
      default: function() {
        return { lng: 113.939897, lat: 22.519751 }
      }
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  watch: {
    list(val, val2) {
      this.setCenter()
    }
  },
  methods: {
    mapReady({ BMap, map }) {
      this.map = map
      this.BMap = BMap
      this.refreshMap()
    },
    onTipClick(val) {
      this.$emit('onTipClick', val)
    },
    setCenter() {
      const points = []
      for (let i = 0; i < this.list.length; i++) {
        const p = this.list[i]
        points.push(new this.BMap.Point(p.x, p.y))
      }
      const view = this.map.getViewport(points)
      const mapZoom = view.zoom
      const centerPoint = view.center
      this.map.centerAndZoom(centerPoint, mapZoom)
    }
  }
}
</script>
<style>
 .Map {
  width: 100%;
  /* height: 590px; */
}
.baiduMap{
  width: 100%;
  height: 100%
}
</style>
