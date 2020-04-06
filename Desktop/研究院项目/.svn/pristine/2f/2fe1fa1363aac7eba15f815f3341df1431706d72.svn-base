import User from '@/views/publicservice/user'
const testRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/publicservice',
    component: () => import('@/views/layout/Layout'),
    redirect: '/publicservice/user',
    name: 'publicservice',
    meta: { title: '公众服务', icon: 'public', roles: ['admin'] },
    children: [
      {
        path: 'user',
        name: 'PublicServiceUser',
        component: User,
        meta: { title: '用户管理', icon: 'usermanage', roles: ['admin'] }
      },
      {
        path: 'log',
        name: 'PublicServiceLog',
        component: () => import('@/views/publicservice/log'),
        meta: { title: '日志管理', icon: 'log', roles: ['admin'] }
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/publicservice/notice'),
        meta: { title: '通知公告', icon: 'messagemanage', roles: ['admin'] }
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
        meta: { title: '咨询答疑', icon: 'faq', roles: ['admin'] }
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
  { path: '*', redirect: '/404', hidden: true }
]
export default testRouterMap
