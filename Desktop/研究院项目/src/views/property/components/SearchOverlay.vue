<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active}"
    pane="labelPane"
    @draw="draw"
    @mouseover.native="active=true"
    @mouseout.native="active=false">
    <div @click="onTipClick(data)" v-text="getText"/>
  </bm-overlay>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    position: {
      type: Object,
      default: function() {
        return { lng: 114.053, lat: 22.5485 }
      } },
    type: {
      type: String,
      default: ''
    },
    activeValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: false,
      dialogTableVisible: false,
      total: 100
    }
  },
  computed: {
    getText() {
      if (this.activeValue !== '') {
        this.change(this.activeValue)
      }
      if (this.type === '土地') {
        return this.data.parcel_no
      } else {
        return this.data.prj_name
      }
    }
  },
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload
      },
      deep: true
    }
  },
  methods: {
    onTipClick(val) {
      this.$emit('onTipClick', val)
    },
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position
      const point = new BMap.Point(lng, lat)
      const pixel = map.pointToOverlayPixel(point)
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    change(value) {
      if (this.type === '土地') {
        this.data.parcel_no.indexOf(value) > -1 ? this.active = true : this.active = false
      } else {
        this.data.prj_name.indexOf(value) > -1 ? this.active = true : this.active = false
      }
    },
    keepHighLight() {
      this.active = true
      // 原因是触发了marker的mouseout事件
      /* setTimeout(() => {
          this.active =true
        }, 400)*/
    }
  }
  // ,
  // activeValue(value) {
  //   console.log(value)
  //   this.data.xmmc.indexOf(value) > -1 ? this.active = true : this.active = false
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sample {
    min-width: 50px;
    padding: 5px;
    display: block;
    background: #409EFF;
    color: #fff;
    text-align: center;
    position: absolute;
    font-size: 15px;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 3px;
  }
  .sample.active {
    background: #B00000;
    color: #fff;
    z-index: 9999;
  }
</style>
