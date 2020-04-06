<template>
  <div>
    <el-row class="search-container" style="padding: 5px" >
      <span style="font-size:12px;color:grey;font-weidth:bold">选择处理对象：</span>
      <el-radio-group v-model="selected_target" size="small" @change="onProcessTargetChange">
        <el-radio-button v-for="item in targets" :label="item.label" :value="item.value" :key="item.value"/>
      </el-radio-group>
    </el-row>
    <div>
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="currentComponent" />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import ProjectLocate from './components/ProjectLocate'
import ParcelLocate from './components/ParcelLocate'

export default {
  components: { ProjectLocate, ParcelLocate },
  data() {
    return {
      selected_target: '楼盘',
      targets: [
        { label: '楼盘', value: 'project-locate' },
        { label: '宗地', value: 'parcel-locate' }
      ],
      currentComponent: 'project-locate'
    }
  },
  methods: {
    onProcessTargetChange() {
      switch (this.selected_target) {
        case '楼盘': this.currentComponent = 'project-locate'; break
        case '宗地': this.currentComponent = 'parcel-locate'; break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  height: 45px;
  padding: 4px;
  background-color: white;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
</style>
