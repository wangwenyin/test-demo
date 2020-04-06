import { constantRouterMap } from '@/router'
import { getAuthByRoleId } from '@/api/role'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(names, route) {
  if (route.name) {
    /* console.log(names.some(name => route.name.includes(name)))
    return names.some(name => route.name.includes(name)) */
    return names.indexOf(route.name) !== -1
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, names) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(names, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, names)
      }
      res.push(tmp)
    }
  })

  return res
}
const nameList = []
function getAuthByRole(roles) {
  return getAuthByRoleId(roles).then(response => {
    if (response.code === 200) {
      for (var i = 0; i < response.data.visit.length; i++) {
        nameList.push(response.data.visit[i].name)
      }
      return nameList
    } else {
      this.$notify({
        title: '错误',
        message: '修改失败!',
        type: 'error',
        duration: 2000
      })
    }
  })
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers
      /* state.routers = constantRouterMap.concat(routers) */
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters = []
        roles.forEach((role, index) => {
          getAuthByRole(role).then(nameList => {
            if (roles.length === index + 1) {
              nameList = [...new Set(nameList)]
              accessedRouters = filterAsyncRouter(constantRouterMap, nameList)
              commit('SET_ROUTERS', accessedRouters)
              resolve()
            }
          })
        })
      })
    }
  }
}

export default permission
