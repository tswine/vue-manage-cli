<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form label-width="0px" class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input prefix-icon="el-icon-s-custom" v-model="loginForm.userName"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passWord">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.passWord"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          userName: 'admin',
          passWord: '123456'
        },
        // 表单验证规则
        loginFormRules: {
          userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          passWord: [{
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      // 登陆
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) {
            console.log('数据校验不过')
            return
          }
          const {
            data: res
          } = await this.$http.post('/logon/login', this.loginForm)
          if (res.status) {
            window.sessionStorage.setItem('token', res.data)
            // 重定向到主页
            this.$router.push('/home')
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 重置
      reset() {
        this.$refs.loginFormRef.resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
