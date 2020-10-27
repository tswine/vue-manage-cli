<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input placeholder="用户名" v-model="query.userName" clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="真实姓名" v-model="query.name" clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="电话号码" v-model="query.phone" clearable>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select multiple placeholder="性别" v-model="query.sex">
            <el-option key="1" label="男" value="1"> </el-option>
            <el-option key="2" label="女" value="2"> </el-option>
            <el-option key="3" label="保密" value="3"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="col-top">
          <el-date-picker type="daterange" range-separator="至" start-placeholder="生日日期" end-placeholder="生日日期"
            value-format="yyyy-MM-dd" v-model="query.birthday">
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="col-top">
        </el-col>
        <el-col :span="6" class="col-top">
          <el-button type="primary" icon="el-icon-search" @click="getUserList">查询</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 用户列表信息 -->
      <el-table border stripe :data="userlist">
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="userName"></el-table-column>
        <el-table-column label="真实姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="生日" prop="birthday"></el-table-column>
        <el-table-column label="电话号码" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.status" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"> </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addOrEditDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addOrEditForm" ref="addOrEditFormRef" label-width="80px" :rules="addOrEditFormRules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addOrEditForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="addOrEditForm.passWord"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addOrEditForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="addOrEditForm.sex" label="1">男</el-radio>
          <el-radio v-model="addOrEditForm.sex" label="2">女</el-radio>
          <el-radio v-model="addOrEditForm.sex" label="3">保密</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="addOrEditForm.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
            format="yyyy年MM月dd日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="addOrEditForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addOrEditForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch :active-value="1" :inactive-value="0" v-model="addOrEditForm.status">
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import utils from '../../tools.js'
  export default {
    data() {
      return {
        // 用户列表数据
        userlist: [],
        // 查询条件
        query: {
          currentPage: 1,
          pageSize: 20,
          userName: '',
          name: '',
          sex: [],
          birthday: [],
          phone: ''
        },
        // 修改或添加表单
        addOrEditForm: {
          userName: '',
          passWord: '',
          name: '',
          sex: '3',
          birthday: '',
          phone: '',
          email: '',
          status: 1
        },
        // 控制添加用户对话框
        addDialogVisible: false,
        // 添加或修改表单的验证规则对象
        addOrEditFormRules: {
          userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          passWord: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }],
          birthday: [{
            required: true,
            message: '请选择生日',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      // 获取用户信息
      async getUserList() {
        const params = {}
        params.userName = this.query.userName
        params.name = this.query.name
        params.phone = this.query.phone
        params.sex = utils.arrayToStr(this.query.sex, ',')
        params.birthday = utils.arrayToStr(this.query.birthday, ',')
        params.currentPage = this.query.currentPage
        params.pageSize = this.query.pageSize
        const {
          data: res
        } = await this.$http.post('/user/list', params)
        if (res.status) {
          this.userlist = res.data.results
        } else {
          this.$message.error(res.msg)
        }
      },
      // 添加用户
      addUser() {
        this.$refs.addOrEditFormRef.validate(async valid => {
          if (!valid) return
          const {
            data: res
          } = await this.$http.post('/user/add', this.addOrEditForm)
          if (res.status) {
            this.$message.success('添加用户成功')
            this.getUserList()
            this.addDialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 监听添加或修改关闭事件
      addOrEditDialogClosed() {
        // 关闭模态框,清空所有的输入内容
        this.$refs.addOrEditFormRef.resetFields()
      },
      // 更新用戶状态
      async userStateChanged(userInfo) {
        const params = {
          status: userInfo.status
        }
        const {
          data: res
        } = await this.$http.post(`user/update/status/${userInfo.id}`, params)
        if (res.status) {
          this.$message.success('更新用户状态成功')
        } else {
          userInfo.status = !userInfo.status
          return this.$message.error(res.msg)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .col-top {
    margin-top: 15px;
  }
</style>
