<template>
  <el-container class="home-container">
    <!--头部区-->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>管理系统脚手架</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse"
          :collapse-transition="false" router :default-active="activePath">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="/user/list">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        // 左侧菜单数据
        menulist: [],
        // 是否折叠
        isCollapse: false,
        // 被激活的链接地址
        activePath: ''
      }
    },
    methods: {
      // 退出系统
      async logout() {
        const {
          data: res
        } = await this.$http.post('/logon/logout', {})
        if (res.status) {
          window.sessionStorage.clear()
          this.$router.push('/login')
        } else {
          this.$message.error(res.msg)
        }
      },
      // 切换菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;

    img {
      margin-left: 30px;
      height: 50px;
      width: 50px;
    }
  }

  .el-header {
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center;
    color: #FFFFFF;
    font-size: 20px;

    >div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
