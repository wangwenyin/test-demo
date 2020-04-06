<template>
  <div>
    <table class="table" >
      <tr class="tr_title">
        <td colspan="24" class="td">
          <span class="title">市场背景描述与分析 </span>
          <el-button v-if="!detail" size="small" style="margin-left: 81.2%" type="text">模板</el-button>
        </td>
      </tr>
      <tr v-if="form.market_analysis!==null" class="tr">
        <td class="td" colspan="1"><span class="normal">选用模板：</span></td>
        <td class="td" colspan="8"><el-input v-model="form.market_analysis.name" class="noborder"/></td>
        <td class="td" colspan="1"/>
        <td class="td" colspan="14"/>
      </tr>
      <tr v-if="form.market_analysis!==null" class="tr">
        <td class="td" colspan="24">
          <el-input
            :autosize="{ minRows: 2, maxRows: 8}"
            v-model="form.market_analysis.content"
            class="noborder"
            type="textarea"
            placeholder="请输入内容"/>
        </td>
      </tr>
      <tr class="tr_title">
        <td colspan="24" class="td">
          <span class="title">最高最佳利用分析 </span>
          <el-button v-if="!detail" size="small" type="text" style="margin-left:82.8%;">模板</el-button>
        </td>
      </tr>
      <tr class="tr">
        <td class="td" colspan="24">
          <el-input
            :autosize="{ minRows: 2, maxRows: 8}"
            v-model="form.best_analysis"
            class="noborder"
            type="textarea"
            placeholder="请输入内容"/>
        </td>
      </tr>
      <tr class="tr_title">
        <td colspan="24" class="td">
          <span class="title">估价方法适用性分析 </span>
          <el-button v-if="!detail" size="small" style="margin-left: 81.2%;" type="text">模板</el-button>
        </td>
      </tr>
      <tr class="tr">
        <td class="td" colspan="24">
          <el-input
            :autosize="{ minRows: 2, maxRows: 8}"
            v-model="form.usable_analysis"
            type="textarea"
            class="noborder"
            placeholder="请输入内容"/>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      'default': null
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
@import '@/styles/app.scss';
  .tr_title{
     margin-top:2%;
     margin-bottom: 0px;
     background:#f5f7fa;
     height: 35px;
     }
  .title {
     font-size: 15px;
     font-weight:bold;
     margin-top: 10px;
     margin-left:21px;
     margin-bottom: 10px;
     }

</style>
