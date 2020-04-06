<template>
  <div style="padding:10px">
    <el-form ref="myForm" :model="myForm" label-width="150px">
      <el-form-item
        :rules="{
          required: true, message: '请输入旧密码', trigger: 'blur'
        }"
        prop="oldPass"
        label="旧密码">
        <el-input v-model="myForm.oldPass" type="password" style="width:200px"/>
      </el-form-item>
      <el-form-item
        :rules="{
          required: true, message: '请输入新密码', trigger: 'blur'
        }"
        prop="newPass1"
        label="新密码">
        <el-input v-model="myForm.newPass1" type="password" style="width:200px"/>
      </el-form-item>
      <el-form-item
        :rules="{
          required: true, message: '请再次输入新密码', trigger: 'blur'
        }"
        prop="newPass2"
        label="确认新密码">
        <el-input v-model="myForm.newPass2" type="password" style="width:200px"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('myForm')">确定</el-button>
        <el-button @click="resetForm('myForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { updateUserPassword } from '@/api/user'
import md5 from 'md5'
export default {
  data() {
    return {
      myForm: {
        oldPass: '',
        newPass1: '',
        newPass2: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.myForm.newPass1 === this.myForm.newPass2) {
            const params = {
              old_password: md5(this.myForm.oldPass),
              new_password: md5(this.myForm.newPass1)
            }
            updateUserPassword(this.$store.state.user.login_name, params).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: response.msg
                })
              } else {
                this.$message({
                  type: 'error',
                  message: response.msg
                })
              }
            })
          } else {
            console.log('两次输入的新密码不一致!!')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>

</style>
