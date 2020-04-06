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
import ProjectProcess from './components/ProjectProcess'
import ParcelProcess from './components/ParcelProcess'
import BuildingProcess from './components/BuildingProcess'
import HouseProcess from './components/HouseProcess'
import StructureProcess from './components/StructureProcess'
export default {
  components: { ProjectProcess, ParcelProcess, BuildingProcess, HouseProcess, StructureProcess },
  data() {
    return {
      selected_target: '楼盘',
      targets: [
        { label: '楼盘', value: 'project-process' },
        { label: '宗地', value: 'parcel-process' },
        { label: '楼栋', value: 'building-process' },
        { label: '户', value: 'house-process' },
        { label: '构筑物', value: 'structure-process' }
      ],
      currentComponent: 'project-process'
    }
  },
  methods: {
    onProcessTargetChange() {
      switch (this.selected_target) {
        case '楼盘': this.currentComponent = 'project-process'; break
        case '宗地': this.currentComponent = 'parcel-process'; break
        case '楼栋': this.currentComponent = 'building-process'; break
        case '户': this.currentComponent = 'house-process'; break
        case '构筑物': this.currentComponent = 'structure-process'; break
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
