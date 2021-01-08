<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
export default {
  name: "Home",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const res = await getUserList();
      this.tableData = res || [];
    }
  }
};
</script>

<style lang="scss" scoped></style>
