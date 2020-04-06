<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active, blink}"
    pane="labelPane"
    @draw="draw"
    @mouseover.native="mouseOver"
    @mouseout.native="mouseOut">
    <div @click="handleClick()" v-html="getText"/>
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
      default: null
    },
    zoom: {
      type: Number,
      default: 17
    },
    keyword: {
      type: String,
      default: ''
    },
    unique_keyword: {
      type: String,
      default: ''
    },
    priceType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: false,
      blink: false,
      hasClick: false
    }
  },
  computed: {
    getText() {
      if (this.zoom > 15) {
        return this.data.prj_name + ' ' + this.data.cnt + '个'
      } else {
        return this.data.name + '<br>' + this.data.cnt + '个'
      }
    }
  },
  watch: {
    position: {
      handler() {
        if (this.$refs.customOverlay !== null) {
          this.$refs.customOverlay.reload()
        }
      },
      // 深度监视
      deep: true
    },
    keyword(val) {
      if (!val) {
        return
      }
      // 重置
      this.active = this.blink = false
      if (this.data.prj_name.includes(val)) {
        this.active = true
      }
    },
    unique_keyword: {
      handler(newValue, oldValue) {
        this.active = this.blink = false
        if (newValue && this.data.prj_name.includes(newValue)) {
          this.blink = true
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    getPriceAndNum() {
      if (this.caseList !== null) {
        const xmCaseList = this.caseList.filter(item => {
          return this.data.prj_name === item.prj_name
        })
        let totalPrice = 0
        for (let i = 0; i < xmCaseList.length; i++) {
          const item = xmCaseList[i]
          totalPrice += item.dj
        }

        this.caseNum = xmCaseList.length
        this.averagePrice = totalPrice / this.caseNum
      }
    },
    mouseOver() {
      this.active = true
      // 派发over事件,以触发showBoundary
      if (this.zoom < 14) {
        this.data.name && this.$emit('over', this.data.name)
      }
    },
    mouseOut() {
      // 根据marker是否点击，决定mouseOut行为
      this.hasClick && this.zoom > 15 ? this.active = true : this.active = false
      this.data.name && this.$emit('out')
    },
    handleClick() {
      // 每一次点击先让所有的取消高亮（主要为了取消之前点击的）
      this.$emit('cancleActive')
      // 再让当前高亮
      this.hasClick = true
      this.active = true
      // 派发事件，获取楼盘详情
      this.$emit('markerClick', this.data)
    },
    // 绘制自定义覆盖物
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position
      const point = new BMap.Point(lng, lat)
      const pixel = map.pointToOverlayPixel(point)
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
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
    opacity: .9;
    border-radius: 3px;
  }
  .xzqMarkerClass {
    width: 90px;
    height: 90px;
    line-height: 1.5;
    padding: 15px;
    border-radius: 50%
  }
  .active {
    background: #B00000;
    z-index: 99;
  }

  .blink{
    background: #B00000;
    animation: blink 1s linear infinite;
    z-index: 99;
  }

  /* 定义keyframe动画，命名为blink */
  @keyframes blink {
    0%   { color:#fff; }
    50% { color: #fff; }
    50.01% { color: #000; }
    100% { color:#000; }
  }
</style>
