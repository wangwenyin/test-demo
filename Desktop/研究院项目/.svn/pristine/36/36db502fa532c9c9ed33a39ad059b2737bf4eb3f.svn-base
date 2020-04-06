<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-box__desc">
        <div class="desc-name">
          <h2>MASSAPP</h2>
          <p>房地产税基批量评估系统</p>
        </div>
      </div>
      <div class="form-box">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              placeholder="口令"
              @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item v-if="errorCnt>2 && !isPass" prop="verify">
            <Verify
              :type="verifyOption.type"
              :width="verifyOption.width"
              :height="verifyOption.height"
              :show-button="verifyOption.showButton"
              @success="isPass=true"
              @error="isPass=false" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <a href="">由**提供技术服务</a>
    </div>
  </div>
</template>

<script>
import Verify from 'vue2-verify'

export default {
  name: 'Login',
  components: { Verify },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'wangm',
        password: '88888888'
      },
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      verifyOption: {
        type: 1,
        width: '80%',
        height: '40px',
        showButton: true
      },
      isPass: true,
      errorCnt: Number(localStorage.getItem('cnt') || 0),
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      if (!this.isPass) {
        this.$notify({
          title: '警告',
          message: '请先完成验证！',
          type: 'warning'
        })
        return
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            localStorage.removeItem('cnt')
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            this.errorCnt++
            localStorage.setItem('cnt', this.errorCnt)
            if (this.errorCnt > 2) {
              this.isPass = false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#fff;
$light_gray:rgb(58, 56, 56);

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #2d3a4b !important;
      }
      &::-webkit-input-placeholder {
        color: #2d3a4b;
      }
    }
  }
  .el-form-item {
    border-bottom: 1px solid rgba(12, 11, 11, 0.1);
    border-radius: 5px;
    color: black;
    .verify-btn {
      position: absolute;
      right: 20px;
      bottom: 8px;
      width: 100px;
      background-color: #409eff
    }
  }
  .el-button--primary {
    background: #409eff;
    border-radius: 3px 4px 4px 4px;
    border: solid 1px #3694f4
  }
  .svg-icon {
    opacity: .3;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url('http://test.daoheit.com/static/login/login.png');
  background-size: cover;
  &::after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: brightness(80%) drop-shadow(10px 10px 10px #000);
    // filter: blur(2px);
    z-index: -1;
  }
  .login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    min-width: 520px;
    height: 400px;
    background: #fff;
    margin: 150px auto;
    .login-box__desc {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 2;
      height: 100%;
      text-align: center;
      color: #fff;
      background-color: #4271b9;
      background-image: url('../../assets/logo_bg1.png');
      .desc-name {
        h2 {
          font-size: 26px
        }
        p {
          letter-spacing: 3px
        }
      }
    }
    .form-box {
      flex: 3;
      .login-form {
        width: 80%;
        margin: 0 auto
      }
    }
  }
  .footer {
    width:100%;
    height:35px;
    line-height:35px;
    position:fixed;
    bottom:0px;
    left:0px;
    font-size:14px;
    color:white ;
    text-align:center;
  }
}
// 适应1920分辨率
@media screen and (min-width: 1920px) {
  .login-container .login-box {
    width: 45%;
    height: 490px;
    margin: 250px auto 0;
  }
}
</style>

