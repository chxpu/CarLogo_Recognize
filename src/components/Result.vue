<template>
  <div style="margin-top:40px">
    <el-table class="el-table" :data="res"  :row-class-name="tableRowClassName" style="width: 100%" >
      <el-table-column prop="Tag" label="汽车品牌"  align="center"></el-table-column>
      <el-table-column prop="Probability" label="相似度" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: 'Result',
      data() {
        return {}
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 0) {
            return 'first-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        }
      },
      props: ['res'],
    }
</script>

<style>
  .el-table .first-row {
    background: oldlace;
    color: red;
  }
</style>
