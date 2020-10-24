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
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表信息 -->
      <el-table border stripe>
        <el-table-column label="编号"></el-table-column>
        <el-table-column label="用户名"></el-table-column>
        <el-table-column label="真实姓名"></el-table-column>
        <el-table-column label="性别"></el-table-column>
        <el-table-column label="生日"></el-table-column>
        <el-table-column label="电话号码"></el-table-column>
        <el-table-column label="邮箱"></el-table-column>
        <el-table-column label="角色"></el-table-column>
        <el-table-column label="状态"></el-table-column>
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addOrEditForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="addOrEditForm.sex" label="1">男</el-radio>
          <el-radio v-model="addOrEditForm.sex" label="2">女</el-radio>
          <el-radio v-model="addOrEditForm.sex" label="3">保密</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="addOrEditForm.birthday" type="date" placeholder="选择日期" format="yyyy年MM月dd日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="addOrEditForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addOrEditForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="addOrEditForm.status">
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
  export default {
    data() {
      return {
        // 修改或添加表单
        addOrEditForm: {
          userName: '',
          name: '',
          sex: '3',
          birthday: '',
          phone: '',
          email: '',
          status: true
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
      getUserList() {
        console.log('获取用户信息')
      },
      // 添加用户
      addUser() {
        this.$refs.addOrEditFormRef.validate(async valid => {
          if (!valid) return
          console.log(this.addOrEditForm)
          this.addDialogVisible = false
        })
      },
      // 监听添加或修改关闭事件
      addOrEditDialogClosed() {
        // 关闭模态框,清空所有的输入内容
        this.$refs.addOrEditFormRef.resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
