<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <img class="logo-avatar" src="" >
    <breadcrumb />
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="right-menu-item hover-effect"/>
      </el-tooltip>
      <el-tooltip effect="dark" content="反馈建议" placement="bottom">
        <feedback class="right-menu-item hover-effect"/>
      </el-tooltip>
      <el-tooltip effect="dark" content="帮助文档" placement="bottom">
        <help class="right-menu-item  hover-effect"/>
      </el-tooltip>
      <!-- <user-info :user-name="name" class="right-menu-item"/> -->
      <el-dropdown class="avatar-container right-menu-item" >
        <div class="avatar-wrapper">
          <span class="el-dropdown-link">
            {{ name }}
            <i class="el-icon-caret-bottom"/>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/changepwd/index">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Help from '@/components/Help'
import Feedback from '@/components/Feedback'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Help,
    Feedback
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: white !important;       // 修改navbar的背景色
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .right-menu-btn {
      display: inline-block;
      // padding: 0 8px;
      height: 100%;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .screenfull {
      height: 50px;
      // margin-right: 100px;
    }
    .avatar-container {
      height: 100%;
      margin-right: 30px;
      cursor: pointer;
      .avatar-wrapper {
        cursor: pointer;
        // margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -15px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .logo-avatar {
    margin: 5px;
    height: 40px;
    width: 230px;
  }
  .el-breadcrumb__inner a {
      color: black !important;    // 首页字体颜色
  }
}
</style>

