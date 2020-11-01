<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{twoLevelName}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{levelName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    props: {
      // 二级名称
      twoLevelName: {
        type: String,
        default: '二级名称',
        require: true // 必填
      },
      // 当前名称
      levelName: {
        type: String,
        default: '三级名称',
        require: true // 必填
      }

    }
  }
</script>

<style>
</style>
