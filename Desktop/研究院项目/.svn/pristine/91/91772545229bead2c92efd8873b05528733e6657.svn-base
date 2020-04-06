import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'
import Layout from '@/views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/property',
    name: 'Data',
    meta: { title: '数据管理', icon: 'datamanage' },
    children: [
      {
        path: 'property',
        name: 'SubjectProperty',
        component: () => import('@/views/property/index'),
        meta: { title: '估价对象', icon: 'property' }
      },
      {
        path: '/property/projectDetail',
        name: 'ProjectDetail',
        hidden: true,
        component: () => import('@/views/property/projectDetail.vue'),
        meta: { title: '楼盘详情', icon: 'datasearch' }
      },
      {
        path: '/property/landDetail',
        name: 'LandDetail',
        hidden: true,
        component: () => import('@/views/property/landDetail.vue'),
        meta: { title: '土地详情', icon: 'datasearch' }
      },
      {
        path: '/property/buildingDetail',
        name: 'BuildingDetail',
        hidden: true,
        component: () => import('@/views/property/buildingDetail.vue'),
        meta: { title: '楼栋详情', icon: 'datasearch' }
      },
      {
        path: 'case',
        name: 'Case',
        component: () => import('@/views/case/index'),
        redirect: '/data/case/index',
        meta: { title: '估价案例', icon: 'case' },
        children: [
          {
            path: 'index',
            name: 'CaseSearch',
            component: () => import('@/views/case/search'),
            meta: { title: '估价案例', icon: 'case' }
          },
          {
            path: 'detail',
            name: 'CaseChart',
            hidden: true,
            component: () =>
                import('@/views/case/caseChart'),
            meta: { title: '案例图表', icon: 'casesearch' }
          }
        ]
      },
      {
        path: 'value',
        name: 'Value',
        component: () => import('@/views/value/index'),
        meta: { title: '估价结果', icon: 'datasearch' }
      },
      {
        path: 'structure',
        name: 'Structure',
        component: () => import('@/views/structure/index'),
        meta: { title: '构筑物', icon: 'structure' }
      },
      {
        path: 'tools',
        name: 'DataTools',
        component: () => import('@/views/datatools/index'),
        redirect: '/data/tools/import',
        meta: { title: '数据工具', icon: 'datatools' },
        children: [
          {
            path: 'import',
            name: 'DataImport',
            component: () => import('@/views/datatools/import/index'),
            meta: { title: '数据导入', icon: 'dataimp' }
          },
          {
            path: 'edit',
            name: 'PropertyEdit',
            component: () => import('@/views/datatools/edit/index'),
            meta: { title: '属性编辑', icon: 'property_edit' }
          },
          {
            path: 'locate',
            name: 'PropertyLocate',
            component: () => import('@/views/datatools/locate/index'),
            meta: { title: '物业定位', icon: 'locate' }
          },
          {
            path: 'casematch',
            name: 'CaseMatch',
            component: () => import('@/views/datatools/casematch/index'),
            meta: { title: '案例匹配', icon: 'casematch' }
          }
        ]
      }
    ]
  },
  {
    path: '/singleapp',
    component: Layout,
    redirect: '/singleapp/index',
    name: 'Singleapp',
    meta: { title: '个案估价', icon: 'singleapp' },
    children: [
      {
        path: 'index',
        name: 'SingleappTasks',
        component: () => import('@/views/singleapp/index'),
        meta: { title: '估价任务', icon: 'singletask' }
      },
      {
        path: 'setting',
        name: 'SingleappSetting',
        component: () => import('@/views/singleapp/setting'),
        meta: { title: '参数管理', icon: 'singlesetting' },
        children: [
          {
            path: 'marketanalysis',
            name: 'MarketAnalysis',
            component: () =>
              import('@/views/singleapp/parammanage/marketAnalysis.vue'),
            meta: { title: '房地产市场分析', icon: 'singlesetting' }
          },
          {
            path: 'factorallocation',
            name: 'FactorAllocation',
            component: () =>
              import('@/views/singleapp/parammanage/factorConfigration.vue'),
            meta: { title: '因素配置管理', icon: 'singlesetting' }
          }
        ]
      },
      {
        path: 'detail',
        name: 'SingleTaskDetail',
        hidden: true,
        component: () => import('@/views/singleapp/detail'),
        meta: { title: '任务详情', icon: 'singleapp' }
      },
      {
        path: 'create',
        name: 'CreateSingleappTask',
        hidden: true,
        component: () => import('@/views/singleapp/createTask'),
        meta: { title: '创建任务', icon: 'singleapp' }
      },
      {
        path: 'adjustment',
        name: 'SingleappAdjustment',
        hidden: true,
        component: () => import('@/views/singleapp/adjustment'),
        meta: { title: '价格评估', icon: 'singleapp' }
      },
      {
        path: 'appraisedRent',
        name: 'SingleappAppraisedRent',
        hidden: true,
        component: () => import('@/views/singleapp/appraisedRent'),
        meta: { title: '租金评估', icon: 'singleapp' }
      },
      {
        path: 'appraisedCost',
        name: 'SingleappAppraisedCost',
        hidden: true,
        component: () => import('@/views/singleapp/appraisedCost'),
        meta: { title: '成本评估', icon: 'singleapp' }
      },
      {
        path: 'report',
        name: 'SingleappReport',
        hidden: true,
        component: () => import('@/views/singleapp/report'),
        meta: { title: '撰写报告', icon: 'singleapp' }
      },
      {
        path: 'NetValue',
        name: 'SingleappNetValue',
        hidden: true,
        component: () => import('@/views/singleapp/netValue'),
        meta: { title: '净值测算', icon: 'feedback' }
      }
    ]
  },
  {
    path: '/dispute',
    component: Layout,
    redirect: '/dispute/index',
    name: 'Dispute',
    meta: { title: '争议处理', icon: 'dispute' },
    children: [
      {
        path: 'index',
        name: 'DisputeTask',
        component: () => import('@/views/dispute/index'),
        meta: { title: '价格复核', icon: 'dispute' }
      },
      {
        path: 'review',
        name: 'DisputeReview',
        hidden: true,
        component: () => import('@/views/dispute/components/Review')
      },
      {
        path: 'fieldSurvey',
        name: 'DisputeFieldSurvey',
        hidden: true,
        component: () => import('@/views/dispute/components/FieldSurvey')
      },
      {
        path: 'appraisal',
        name: 'DisputeAppraisal',
        hidden: true,
        component: () => import('@/views/dispute/components/Appraisal')
      },
      {
        path: 'FinalReview',
        name: 'DisputeFinalReview',
        hidden: true,
        component: () => import('@/views/dispute/components/FinalReview')
      },
      {
        path: 'stat',
        name: 'DisputeStat',
        component: () => import('@/views/dispute/statistic'),
        meta: { title: '复核统计', icon: 'disputestat' }
      },
      {
        path: 'detail',
        name: 'DisputeDetail',
        hidden: true,
        component: () => import('@/views/dispute/detail'),
        meta: { title: '复核详情', icon: 'dispute' }
      }
    ]
  },
  {
    path: '/ratio',
    component: Layout,
    redirect: '/ratio/index',
    name: 'Ratio',
    meta: { title: '比率分析', icon: 'resultaudit' },
    children: [
      {
        path: 'index',
        name: 'RatioList',
        component: () => import('@/views/ratio/index'),
        meta: { title: '比率分析', icon: 'rate' }
      },
      {
        path: 'paramset',
        name: 'Paramset',
        hidden: true,
        component: () => import('@/views/ratio/paramset'),
        meta: { title: '参数设置', icon: 'rate' }
      },
      {
        path: 'rateanal',
        name: 'Rateanal',
        hidden: true,
        component: () => import('@/views/ratio/rateanal'),
        meta: { title: '分析结果', icon: 'districtgroup' }
      },
      {
        path: '/detail',
        name: 'RatioDetail',
        hidden: true,
        component: () => import('@/views/ratio/detail'),
        meta: { title: '任务详情', icon: 'allcondition' }
      }
    ]
  },
  {
    path: '/survey',
    component: Layout,
    redirect: '/survey/index',
    name: 'Survey',
    meta: { title: '查勘任务', icon: 'filter' },
    children: [
      {
        path: 'index',
        name: 'SurveyList',
        component: () => import('@/views/survey/index'),
        meta: { title: '任务管理', icon: 'filter' }
      },
      {
        path: 'addSurvey',
        name: 'AddSurvey',
        hidden: true,
        component: () => import('@/views/survey/addSurvey'),
        meta: { title: '创建任务', icon: 'filter' }
      },
      {
        path: 'editSurvey',
        name: 'EditSurvey',
        hidden: true,
        component: () => import('@/views/survey/editSurvey'),
        meta: { title: '编辑任务', icon: 'filter' }
      },
      {
        path: '/surveyDetail',
        name: 'SurveyDetail',
        hidden: true,
        component: () => import('@/views/survey/detail'),
        meta: { title: '任务详情', icon: 'filter' }
      }
    ]
  },
  {
    path: '/sysmanagement',
    component: Layout,
    redirect: '/sysmanagement/user',
    name: 'SysManagement',
    meta: { title: '系统管理', icon: 'sysmanagement' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'usermanage' }
      },
      {
        path: 'role',
        name: 'Role',
        hidden: true,
        component: () => import('@/views/role/index'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'role2',
        name: 'Role2',
        hidden: true,
        component: () => import('@/views/role/index_no_dialog'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'role3',
        name: 'Role3',
        // hidden: true,
        component: () => import('@/views/role/index_tree'),
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/department/index'),
        meta: { title: '部门管理', icon: 'department' }
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/company/index'),
        meta: { title: '机构管理', icon: 'company' }
      },
      {
        path: '/feedback',
        name: 'FeedBack',
        redirect: '/feedback/index',
        component: () => import('@/views/feedback/feedback'),
        meta: { title: '反馈管理', icon: 'feedback' },
        children: [
          {
            path: 'index',
            name: 'FeedbackList',
            component: () => import('@/views/feedback/index'),
            meta: { title: '反馈管理', icon: 'feedback' }
          },
          {
            path: 'submit',
            name: 'SubmitFeedback',
            hidden: true,
            component: () => import('@/views/feedback/submit'),
            meta: { title: '问题反馈', icon: 'feedback' }
          },
          {
            path: 'detail',
            name: 'FeedbackDetail',
            hidden: true,
            component: () => import('@/views/feedback/detail'),
            meta: { title: '反馈详情', icon: 'feedback' }
          }
        ]
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/log/index'),
        meta: { title: '日志管理', icon: 'log' }
      },
      {
        path: 'message',
        name: 'Message',
        redirect: '/sysmanagement/message/index',
        component: () => import('@/views/message/message'),
        meta: { title: '消息管理', icon: 'messagemanage' },
        children: [
          {
            path: 'index',
            name: 'MessageManage',
            component: () => import('@/views/message/index'),
            meta: { title: '消息管理', icon: 'messagemanage' }
          },
          {
            path: 'detail',
            name: 'MessageDetail',
            hidden: true,
            component: () => import('@/views/message/detail'),
            meta: { title: '消息详情', icon: 'messagemanage' }
          },
          {
            path: 'publish',
            name: 'MessagePublish',
            hidden: true,
            component: () => import('@/views/message/publish'),
            meta: { title: '发布消息', icon: 'messagemanage' }
          }
        ]
      },
      {
        path: 'backup',
        name: 'Backup',
        component: () => import('@/views/backup/index'),
        meta: { title: '备份管理', icon: 'backup' }
      }

    ]
  },
  {
    path: '/publicservice',
    component: Layout,
    redirect: '/publicservice/user',
    name: 'publicservice',
    meta: { title: '公众服务', icon: 'public' },
    children: [
      {
        path: 'user',
        name: 'PublicServiceUser',
        component: () => import('@/views/publicservice/user'),
        meta: { title: '用户管理', icon: 'usermanage' }
      },
      {
        path: 'log',
        name: 'PublicServiceLog',
        component: () => import('@/views/publicservice/log'),
        meta: { title: '日志管理', icon: 'log' }
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/publicservice/notice'),
        meta: { title: '通知公告', icon: 'messagemanage' }
      },
      {
        path: 'noticemodify',
        name: 'NoticeModify',
        hidden: true,
        component: () => import('@/views/publicservice/noticemodify'),
        meta: { title: '修改通知', icon: 'messagemanage' }
      },
      {
        path: 'noticepublish',
        name: 'NoticePublish',
        hidden: true,
        component: () => import('@/views/publicservice/noticepublish'),
        meta: { title: '发布通知', icon: 'messagemanage' }
      },
      {
        path: 'faq',
        name: 'PublisServiceFAQ',
        component: () => import('@/views/publicservice/faq'),
        meta: { title: '咨询答疑', icon: 'faq' }
      },
      {
        path: 'faqmodify',
        name: 'FAQModify',
        hidden: true,
        component: () => import('@/views/publicservice/faqmodify'),
        meta: { title: '修改问答', icon: 'faq' }
      },
      {
        path: 'faqpublish',
        name: 'FAQPublish',
        hidden: true,
        component: () => import('@/views/publicservice/faqpublish'),
        meta: { title: '创建问答', icon: 'faq' }
      }
    ]
  },
  {
    path: '/massapp',
    component: Layout,
    redirect: '/massapp/index',
    name: 'PriceIndex',
    meta: { title: '参数管理', icon: 'priceindex' },
    children: [
      {
        path: 'index',
        name: 'PriceIndexList',
        component: () => import('@/views/massapp/parameter/priceIndex'),
        meta: { title: '价格指数', icon: 'priceindex' }
      },
      {
        path: 'detail',
        name: 'PriceDetail',
        hidden: true,
        component: () => import('@/views/massapp/parameter/priceIndexDetail'),
        meta: { title: '指数详情', icon: 'priceindex' }
      },
      {
        path: 'basicLandPrice',
        name: 'BasicLandPrice',
        hidden: true,
        component: () => import('@/views/massapp/parameter/basicLandPrice'),
        meta: { title: '基准地价详情', icon: 'priceindex' }
      },
      {
        path: 'housingCost',
        name: 'HousingCost',
        hidden: true,
        component: () => import('@/views/massapp/parameter/housingCost'),
        meta: { title: '建安造价详情', icon: 'priceindex' }
      }
    ]
  },
  {
    path: '/changepwd',
    component: Layout,
    redirect: '/changepwd/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'ChangePwd',
        component: () => import('@/views/user/changepwd'),
        meta: { title: '修改密码', icon: 'feedback' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
