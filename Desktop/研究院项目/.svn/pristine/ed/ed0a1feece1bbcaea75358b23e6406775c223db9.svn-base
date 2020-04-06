<template>
  <div style="margin:10px">
    <el-row :gutter="10">
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">估价对象</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">  <el-input v-model="form.prop_name" class="el-input--noborder" size="small" readonly/></span></td>
            <td class="table-form__col w10"> <span class="table-form__col__text">地址</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"> <el-input v-model="form.address" class="el-input--noborder" size="small" readonly/></span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">建筑面积</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input v-model="form.built_in_area" class="el-input--noborder" size="small" readonly/></span></td>
            <td class="table-form__col w10"><span class="table-form__col__text">物业用途</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"> <el-input v-model="form.prop_usage" class="el-input--noborder" size="small" readonly/></span></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row__title">
            <td colspan="5" class="table-form__col__title"><span style="margin-left:20px;">测算土地成本 </span>
            </td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">项目名称</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">面积（㎡）或修正系数</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">单价（元/㎡）</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">总价（元）</span></td>
            <td class="table-form__col"><span class="table-form__col__text">说明</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">标定地价</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/><el-input-number v-model="form.land_area" class="el-input--noborder" size="small" /></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.benchmark_value" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getBenchmarkTotal }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">单价×土地面积</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">容积率修正</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.plot_ratio" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_plot_ratio }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_plot_ratio }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">标定地价×（容积率修正系数-1）</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">使用年期修正</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.land_term" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_land_term }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_land_term }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">标定地价×（使用年限修正系数-1）</span> </td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">土地开发程度修正</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.develop_degree" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_develop_degree }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_develop_degree }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">标定地价×（土地开发程度修正系数-1）</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">楼层修正</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.floor_correct" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_floor_correct }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_floor_correct }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">标定地价×（楼层修正系数-1）</span></td>
          </tr>
          <tr class="table-form__row"><td class="table-form__col w10"><span class="table-form__col__text">期日修正</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.date_correct" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_date_correct }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_date_correct }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">标定地价×（期日修正系数-1）</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">因素修正</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.factor_correct" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_factor_correct }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_factor_correct }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">标定地价×（因素修正系数-1）</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">土地成本</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/></td>
            <!-- <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.land_cost" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.land_total" class="el-input--noborder" size="small" /></span></td> -->
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_land_cost }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_land_total }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">上述之和</span></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row__title">
            <td colspan="5" class="table-form__col__title"><span style="margin-left:20px;">测算建安成本 </span>
            </td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">项目名称</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">面积（㎡）或修正系数</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">单价（元/㎡）</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">总价（元）</span></td>
            <td class="table-form__col"><span class="table-form__col__text">说明</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">前期工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/><el-input-number v-model="form.apre_const" class="el-input--noborder" size="small" /></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.upre_const" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_pre_const }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">土建工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.acivil_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.ucivil_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_civil_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">装饰装修工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.adecor_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.udecor_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_decor_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">给排水工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.asupsew_work" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.usupsew_work" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_supsew_work }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">电气工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.aelectric_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.uelectric_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_electric_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row"><td class="table-form__col w10"><span class="table-form__col__text">弱电工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.aweak_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.uweak_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_weak_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">消防工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.afire_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.ufire_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_fire_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">燃气工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.agas_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.ugas_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_gas_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">电梯工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.aevelator_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.uevelator_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_evelator_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">空调工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.aaircon_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.uaircon_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_aircon_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">管线工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.apipeline_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.upipeline_engnie" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_pipeline_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">通讯工程</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.acommun_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.ucommun_engine" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_commun_engine }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">建安造价</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_const_cost }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_const_total }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="22" :offset="1">
        <table class="table-form">
          <tr class="table-form__row__title">
            <td colspan="5" class="table-form__col__title"><span style="margin-left:20px;">测算房屋价值 </span>
            </td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">项目名称</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">费用比率</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">单价（元/㎡）</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">总价（元）</span></td>
            <td class="table-form__col"><span class="table-form__col__text">计算方法及说明</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">专业费用</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/><el-input-number v-model="form.profession_fee" class="el-input--noborder" size="small" /></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_profession_fee }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_profession_fee }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">建安造价×费用比率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">管理费用</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.mang_fee" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_mang_fee }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_mang_fee }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">建安造价×费用比率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">投资利息</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.invest_interest" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_invest_interest }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_invest_interest }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">（土地成本+建安造价）×费用比率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">销售费用</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.selling_cost" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_selling_cost }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_selling_cost }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">评估价值×费用比率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">销售税费</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.sale_tax" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_sale_tax }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_sale_tax }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">评估价值×费用比率</span></td>
          </tr>
          <tr class="table-form__row"><td class="table-form__col w10"><span class="table-form__col__text">开发利润</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.develop_profit" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_develop_profit }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_develop_profit }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">评估价格×费用比率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">建筑物重置成本</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_replace_cost }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_replace_total }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">建安造价+专业费用+管理费用+投资利息+销售费用+销售税费+开发利润</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">建筑物折旧</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"><el-input-number v-model="form.building_deprec" class="el-input--noborder" size="small" /></span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_building_deprec }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_building_deprec }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">建筑物重置成本×费用比率</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">建筑物价值</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_building_cost }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_building_total }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">建筑物重置成本-建筑物折旧</span></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">土地价值</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_land_cost }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_land_total }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text"/></td>
          </tr>
          <tr class="table-form__row">
            <td class="table-form__col w10"><span class="table-form__col__text">评估价值</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text"/></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getPrice_cost_value }}</span></td>
            <td class="table-form__col w20"><span class="table-form__col__text">{{ getTotal_cost_total }}</span></td>
            <td class="table-form__col"><span class="table-form__col__text">土地价值+建筑物价值</span></td>
          </tr>
        </table>
      </el-col>
    </el-row>

    <el-row v-if="!detail" style="margin-top:20px">
      <el-col :span="24">
        <el-button v-if="editEnabled" size="small" class="btn--right" @click="onSubmitClick(false)">保存</el-button>
        <el-button v-if="editEnabled" size="small" class="btn--right" type="primary" @click="onSubmitClick(true)">提交</el-button>
        <!-- <el-button v-if="editEnabled" size="small" class="btn--right" type="primary" @click="onPreviousStepClick">上一步</el-button> -->
      </el-col>
    </el-row>
    <el-row v-else style="margin-top:20px;margin-bottom:20px;">
      <el-col :span="24">
        <el-button size="small" style=" float:right; margin-right:70px;" type="primary" @click="onBackClick">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCost, submitCost, gotoback } from '@/api/singleapp'
export default {
  data() {
    return {
      form: {},
      taskId: '',
      detail: false,
      editEnabled: true
    }
  },
  computed: {
    // 1.1 标定地价=单价×土地面积
    // 单价：this.form.benchmark_value
    // 总价
    getBenchmarkTotal() {
      return Math.round(this.form.land_area * this.form.benchmark_value)
    },
    // 1.2 容积率修正=标定地价×（容积率修正系数-1）
    getPrice_plot_ratio() {
      return Math.round(this.form.benchmark_value * (this.form.plot_ratio - 1))
    },
    getTotal_plot_ratio() {
      return Math.round(this.getBenchmarkTotal * (this.form.plot_ratio - 1))
    },
    // 1.3 使用年期修正=标定地价×（使用年限修正系数-1）
    getPrice_land_term() {
      return Math.round(this.form.benchmark_value * (this.form.land_term - 1))
    },
    getTotal_land_term() {
      return Math.round(this.getBenchmarkTotal * (this.form.land_term - 1))
    },
    // 1.4 土地开发程度修正=标定地价×（土地开发程度修正系数-1）
    getPrice_develop_degree() {
      return Math.round(this.form.benchmark_value * (this.form.develop_degree - 1))
    },
    getTotal_develop_degree() {
      return Math.round(this.getBenchmarkTotal * (this.form.develop_degree - 1))
    },
    // 1.5 楼层修正=标定地价×（楼层修正系数-1）
    getPrice_floor_correct() {
      return Math.round(this.form.benchmark_value * (this.form.floor_correct - 1))
    },
    getTotal_floor_correct() {
      return Math.round(this.getBenchmarkTotal * (this.form.floor_correct - 1))
    },
    // 1.6 期日修正=标定地价×（期日修正系数-1）
    getPrice_date_correct() {
      return Math.round(this.form.benchmark_value * (this.form.date_correct - 1))
    },
    getTotal_date_correct() {
      return Math.round(this.getBenchmarkTotal * (this.form.date_correct - 1))
    },
    // 1.7 因素修正=标定地价×（因素修正系数-1）
    getPrice_factor_correct() {
      return Math.round(this.form.benchmark_value * (this.form.factor_correct - 1))
    },
    getTotal_factor_correct() {
      return Math.round(this.getBenchmarkTotal * (this.form.factor_correct - 1))
    },
    // 1.8 土地成本（合计）
    getPrice_land_cost() {
      return Math.round(this.form.benchmark_value + this.getPrice_plot_ratio + this.getPrice_land_term + this.getPrice_develop_degree + this.getPrice_floor_correct + this.getPrice_date_correct + this.getPrice_factor_correct)
    },
    getTotal_land_total() {
      return Math.round(this.getBenchmarkTotal + this.getTotal_plot_ratio + this.getTotal_land_term + this.getTotal_develop_degree + this.getTotal_floor_correct + this.getTotal_date_correct + this.getTotal_factor_correct)
    },

    // 2.1 前期工程
    getTotal_pre_const() {
      return Math.round(this.form.apre_const * this.form.upre_const)
    },
    // 2.2 土建工程
    getTotal_civil_engine() {
      return Math.round(this.form.acivil_engine * this.form.ucivil_engine)
    },
    // 2.3 装饰装修工程
    getTotal_decor_engine() {
      return Math.round(this.form.adecor_engine * this.form.udecor_engine)
    },
    // 2.4 给排水工程
    getTotal_supsew_work() {
      return Math.round(this.form.asupsew_work * this.form.usupsew_work)
    },
    // 2.5 电气工程
    getTotal_electric_engine() {
      return Math.round(this.form.aelectric_engine * this.form.uelectric_engine)
    },
    // 2.6 弱电工程
    getTotal_weak_engine() {
      return Math.round(this.form.aweak_engine * this.form.uweak_engine)
    },
    // 2.7 消防工程
    getTotal_fire_engine() {
      return Math.round(this.form.afire_engine * this.form.ufire_engine)
    },
    // 2.8 燃气工程
    getTotal_gas_engine() {
      return Math.round(this.form.agas_engine * this.form.ugas_engine)
    },
    // 2.9 电梯工程
    getTotal_evelator_engine() {
      return Math.round(this.form.aevelator_engine * this.form.uevelator_engine)
    },
    // 2.10 空调工程
    getTotal_aircon_engine() {
      return Math.round(this.form.aaircon_engine * this.form.uaircon_engine)
    },
    // 2.11 管线工程
    getTotal_pipeline_engine() {
      return Math.round(this.form.apipeline_engine * this.form.upipeline_engnie)
    },
    // 2.12 通讯工程
    getTotal_commun_engine() {
      return Math.round(this.form.acommun_engine * this.form.ucommun_engine)
    },
    // 2.13 建安造价(合计)
    getPrice_const_cost() {
      return Math.round(this.form.upre_const + this.form.ucivil_engine + this.form.udecor_engine + this.form.usupsew_work + this.form.uelectric_engine + this.form.uweak_engine + this.form.ufire_engine + this.form.ugas_engine + this.form.uevelator_engine + this.form.uaircon_engine + this.form.upipeline_engnie + this.form.ucommun_engine)
    },
    getTotal_const_total() {
      return Math.round(this.getTotal_pre_const + this.getTotal_civil_engine + this.getTotal_decor_engine + this.getTotal_supsew_work + this.getTotal_electric_engine + this.getTotal_weak_engine + this.getTotal_fire_engine + this.getTotal_gas_engine + this.getTotal_evelator_engine + this.getTotal_aircon_engine + this.getTotal_pipeline_engine + this.getTotal_commun_engine)
    },
    // 3.1 专业费用=建安造价×费用比率
    getPrice_profession_fee() {
      return Math.round(this.getPrice_const_cost * this.form.profession_fee)
    },
    getTotal_profession_fee() {
      return Math.round(this.getTotal_const_total * this.form.profession_fee)
    },
    // 3.2 管理费用=建安造价×费用比率
    getPrice_mang_fee() {
      return Math.round(this.getPrice_const_cost * this.form.mang_fee)
    },
    getTotal_mang_fee() {
      return Math.round(this.getTotal_const_total * this.form.mang_fee)
    },
    // 3.3 投资利息=（土地成本+建安造价）×费用比率
    getPrice_invest_interest() {
      return Math.round((this.getPrice_const_cost + this.getPrice_land_cost) * this.form.invest_interest)
    },
    getTotal_invest_interest() {
      return Math.round((this.getPrice_const_cost + this.getPrice_land_cost) * this.form.invest_interest)
    },
    // 3.4 销售费用=评估价值×费用比率
    getPrice_selling_cost() {
      return Math.round(this.getPrice_cost_value * this.form.selling_cost)
    },
    getTotal_selling_cost() {
      return Math.round(this.getTotal_cost_total * this.form.selling_cost)
    },
    // 3.5 销售税费=评估价值×费用比率
    getPrice_sale_tax() {
      return Math.round(this.getPrice_cost_value * this.form.sale_tax)
    },
    getTotal_sale_tax() {
      return Math.round(this.getTotal_cost_total * this.form.sale_tax)
    },
    // 3.6 开发利润=评估价格×费用比率
    getPrice_develop_profit() {
      return Math.round(this.getPrice_cost_value * this.form.develop_profit)
    },
    getTotal_develop_profit() {
      return Math.round(this.getTotal_cost_total * this.form.develop_profit)
    },
    // 3.7 建筑物重置成本=建安造价+专业费用+管理费用+投资利息+销售费用+销售税费+开发利润
    // 建筑物重置成本Y = （1 + 专业费用率 + 管理费用率 + 投资利息率）*建安造价 /(1 - 销售费用率 - 销售税费率 - 开发利润率)
    getPrice_replace_cost() {
    //  return Math.round(this.getPrice_const_cost + this.getPrice_profession_fee + this.getPrice_mang_fee + this.getPrice_invest_interest + this.getPrice_selling_cost + this.getPrice_sale_tax + this.getPrice_develop_profit)
      return Math.round((1 + this.form.profession_fee + this.form.mang_fee + this.form.invest_interest) * this.getPrice_const_cost / (1 - this.form.selling_cost - this.form.sale_tax - this.form.develop_profit))
    },
    getTotal_replace_total() {
      // return Math.round(this.getTotal_const_total + this.getTotal_profession_fee + this.getTotal_mang_fee + this.getTotal_invest_interest + this.getTotal_selling_cost + this.getTotal_sale_tax + this.getTotal_develop_profit)
      return Math.round((1 + this.form.profession_fee + this.form.mang_fee + this.form.invest_interest) * this.getTotal_const_total / (1 - this.form.selling_cost - this.form.sale_tax - this.form.develop_profit))
    },
    // 3.8 建筑物折旧=建筑物重置成本×费用比率
    getPrice_building_deprec() {
      return Math.round(this.getPrice_replace_cost * this.form.building_deprec)
    },
    getTotal_building_deprec() {
      return Math.round(this.getTotal_replace_total * this.form.building_deprec)
    },
    // 3.9 建筑物价值=建筑物重置成本-建筑物折旧
    getPrice_building_cost() {
      return Math.round(this.getPrice_replace_cost - this.getPrice_building_deprec)
    },
    getTotal_building_total() {
      return Math.round(this.getTotal_replace_total - this.getTotal_building_deprec)
    },
    // 3.10 土地价值 即为表1的“土地成本”
    // 单价 this.getPrice_land_cost()
    // 总价 this.getPrice_land_cost()

    // 3.11 评估价值=土地价值+建筑物价值
    getPrice_cost_value() {
      return Math.round(this.getPrice_land_cost + this.getPrice_building_cost)
      // return Math.round(this.getPrice_land_cost)
    },
    getTotal_cost_total() {
      return Math.round(this.getTotal_land_total + this.getTotal_building_total)
      //   return Math.round(this.getTotal_land_total)
    }
  },
  mounted() {
    this.taskId = this.$route.query.taskId
    if (this.$route.query.detail === true) {
      this.detail = true
    }
    if (this.taskId) {
      this.getTaskInfo()
    } else {
      this.$notify({
        title: '错误',
        message: '缺少任务编号！',
        type: 'error',
        duration: 2000
      })
    }
  },
  methods: {
    // 获取任务信息
    getTaskInfo() {
      getCost(this.taskId).then(response => {
        if (response.code === 200) {
          this.form = response.data
        } else {
          this.$notify({
            title: '获取信息失败',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 保存提交
    onSubmitClick(val) {
      this.form.submit = val
      // 几个计算属性的值需要存下来，故另外赋值
      // 土地成本
      this.form.land_cost = this.getPrice_land_cost
      this.form.land_total = this.getTotal_land_total
      //	建安造价
      this.form.const_cost = this.getPrice_const_cost
      this.form.const_total = this.getTotal_const_total
      //	建筑物重置成本
      this.form.replace_cost = this.getPrice_replace_cost
      this.form.replace_total = this.getTotal_replace_total
      // 建筑物价值
      this.form.building_cost = this.getPrice_building_cost
      this.form.building_total = this.getTotal_building_total
      //	评估价值
      this.form.cost_value = this.getPrice_cost_value
      this.form.cost_total = this.getTotal_cost_total
      submitCost(this.form).then(response => {
        if (response.code === 200) {
          if (val) {
            this.$message({ message: '提交成功', type: 'success' })
          } else {
            this.$message({ message: '保存成功', type: 'success' })
          }
          if (response.status === '报告撰写') {
            const routerData = {
              name: 'SingleappReport',
              query: { taskId: this.taskId, status: '报告撰写' }
            }
            this.$router.push(routerData)
          }
        } else {
          alert(response.msg)
        }
      })
    },
    // 上一步
    onPreviousStepClick() {
      gotoback(this.taskId).then(response => {
        if (response.code === 200) {
          this.$router.push({ name: 'SingleappAdjustment', query: { taskId: this.taskId, method: response.method }})
        } else {
          alert(response.msg)
        }
      })
    },
    // 返回按钮
    onBackClick() {
      this.$router.push({ name: 'SingleTaskDetail', query: { id: this.taskId }})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table-form {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  .radio-btn{
    width: 70px;
  }
}
.table-form__row{
    margin-top: 0px;
    margin-bottom: 0px;
}
.table-form__row__title{
    margin-left: 10px;
    background:#3C3B3F;
    color: white;
    height: 35px;
    .td{
        border: 0.2px solid #c0c4cc;
        text-align: left;
        height: 33px;
    }
}
.table-form__col{
    margin: 0px auto 0px auto;
    border: 0.2px solid #c0c4cc;
    text-align: center;
    height: 33px;
}
 .table-form__col.w10{
   width: 10%;
  }
 .table-form__col.w16{
    width: 16.6%;
  }
 .table-form__col.w20{
    width: 20%;
  }
.table-form__col__title{
    margin: 0px auto 0px auto;
    border: 0.2px solid #c0c4cc;
    text-align: left;
    height: 33px;
}
.btn--right{
  float: right;
  margin-right:20px;
}
.table-form__col__text {
  color:#a89292;
    text-align: center;
    font-size: 15px;
}
.el-input-number {
    width: 100%;
}
</style>
<style>
.el-input--noborder .el-input__inner {
  border: 0px solid #b2b2b2;
  width: 100%;
  text-align: center
}
</style>
