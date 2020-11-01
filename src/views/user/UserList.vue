<template>
  <div>
    <!-- 面包屑导航区域 -->
    <cli-breadcrumb twoLevelName="用户管理" levelName="用户列表"></cli-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input placeholder="登录名" v-model="query.userName" clearable>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="姓名" v-model="query.name" clearable>
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
          <el-button type="success" icon="el-icon-plus" @click="addUserDialog">添加</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 用户列表信息 -->
      <el-table border stripe :data="userlist">
        <el-table-column label="#" prop="id" align="center"></el-table-column>
        <el-table-column label="登录名" prop="userName" align="center"></el-table-column>
        <el-table-column label="姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="性别" prop="sex" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 1">男</span>
            <span v-else-if="scope.row.sex === 2" type="success">女</span>
            <span v-else>保密</span>
          </template>
        </el-table-column>
        <el-table-column label="生日" prop="birthday" align="center"></el-table-column>
        <el-table-column label="电话号码" prop="phone" align="center"></el-table-column>
        <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
        <el-table-column label="角色" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.status" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230px" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改用户信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserDialog(scope.row)"></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-setting" size="mini"> </el-button>
            </el-tooltip>
            <!-- 重置密码 -->
            <el-tooltip effect="dark" content="重置密码" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-thumb" size="mini" @click="resetPassWord(scope.row)"> </el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <!-- 分页区域 -->
      <el-pagination v-if="this.total > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="query.currentPage" :page-sizes="[5, 10,20,50,100]" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog :title="addOrEditFormTitle" :visible.sync="addDialogVisible" width="50%" @close="addOrEditDialogClosed"
      :close-on-click-modal=false>
      <!-- 内容主体区域 -->
      <el-form :model="addOrEditForm" ref="addOrEditFormRef" label-width="80px" :rules="addOrEditFormRules">
        <el-form-item label="登录名" prop="userName">
          <el-input v-model="addOrEditForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord" v-if="isAdd">
          <el-input v-model="addOrEditForm.passWord"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addOrEditForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="addOrEditForm.sex" label='1'>男</el-radio>
          <el-radio v-model="addOrEditForm.sex" label='2'>女</el-radio>
          <el-radio v-model="addOrEditForm.sex" label='3'>保密</el-radio>
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
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser" v-if="isAdd">确定</el-button>
        <el-button type="primary" @click="editUser" v-if="!isAdd">编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import tools from '../../tools.js'
  import CliBreadcrumb from '../../components/views/CliBreadcrumb.vue'
  export default {
    components: {
      CliBreadcrumb
    },
    data() {
      // 登录名不能重复
      var userNameRepeat = async (rule, value, cb) => {
        const params = {
          userName: value,
          id: this.addOrEditForm.id
        }
        const {
          data: res
        } = await this.$http.post('/user/check/userName', params)
        if (!res.status) {
          return cb(new Error('登录名已经存在'))
        }
        return cb()
      }
      return {
        // 用户列表数据
        userlist: [],
        // 总条数
        total: 0,
        // 查询条件
        query: {
          currentPage: 1,
          pageSize: 10,
          userName: '',
          name: '',
          sex: [],
          birthday: [],
          phone: ''
        },
        // 是否为添加
        isAdd: true,
        // 模态框标题
        addOrEditFormTitle: '添加用户',
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
              message: '请输入登录名',
              trigger: 'blur'
            },
            {
              validator: userNameRepeat,
              trigger: 'blur'
            }
          ],
          passWord: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入姓名',
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
            },
            {
              validator: tools.checkMobile,
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              validator: tools.checkEmail,
              trigger: 'blur'
            }
          ]
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
        params.sex = tools.arrayToStr(this.query.sex, ',')
        params.birthday = tools.arrayToStr(this.query.birthday, ',')
        params.currentPage = this.query.currentPage
        params.pageSize = this.query.pageSize
        const {
          data: res
        } = await this.$http.post('/user/list', params)
        if (res.status) {
          this.userlist = res.data.results
          // 设置总条数
          this.total = res.data.totalRecord
        } else {
          this.$message.error(res.msg)
        }
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        this.query.pageSize = newSize
        this.getUserList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange(newPage) {
        this.query.currentPage = newPage
        this.getUserList()
      },
      // 添加用户模态框
      addUserDialog() {
        this.isAdd = true
        this.addDialogVisible = true
        this.addOrEditFormTitle = '添加用户'
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
      },
      // 编辑用户
      editUserDialog(userInfo) {
        this.isAdd = false
        this.addDialogVisible = true
        this.addOrEditFormTitle = '编辑用户:' + userInfo.userName
        Object.assign(this.addOrEditForm, userInfo)
        this.addOrEditForm.sex = this.addOrEditForm.sex + ''
        console.log(this.addOrEditForm)
      },
      editUser() {
        this.$refs.addOrEditFormRef.validate(async valid => {
          if (!valid) return
          const {
            data: res
          } = await this.$http.post('/user/edit', this.addOrEditForm)
          if (res.status) {
            this.$message.success('编辑用户成功')
            this.getUserList()
            this.addDialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 删除用户
      async deleteUser(userInfo) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '是否删除该用户：' + userInfo.userName + '(' + userInfo.name + ')',
          '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)
        if (confirmResult !== 'confirm') {
          return
        }
        const {
          data: res
        } = await this.$http.delete('user/delete/' + userInfo.id)

        if (res.status) {
          this.$message.success('删除用户成功')
          this.getUserList()
        } else {
          return this.$message.error('删除用户失败')
        }
      },
      // 重置密码
      async resetPassWord(userInfo) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '是否重置用户密码：' + userInfo.userName + '(' + userInfo.name + ')',
          '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)
        if (confirmResult !== 'confirm') {
          return
        }
        const {
          data: res
        } = await this.$http.delete('user/resetPassWord/' + userInfo.id)

        if (res.status) {
          const h = this.$createElement
          this.$notify({
            title: '重置成功',
            type: 'success',
            message: h('i', {
              style: 'color: teal'
            }, res.data)
          })
        } else {
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
