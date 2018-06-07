<template>
  <div id="app">
    <el-row>
      <el-col :span="24"><div class="title">大梁造人工智能演示</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <!-- <el-menu mode="horizontal"> -->
          <el-menu-item index="1">上传图片链接</el-menu-item>
          <el-menu-item index="2">上传图片文件</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <PostUrl v-show="this.activeIndex == '1'"/>
    <PostFile v-show="this.activeIndex == '2'"/>
  </div>
</template>

<script>
import PostUrl from './components/PostUrl'
import PostFile from './components/PostFile'

export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.activeIndex = key
    }
  },
  components: {
    PostUrl,
    PostFile
  }
}
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    /* text-align: center; */
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px; */
  }
  .title {
    text-align: center;
    height: 80px;
    font-family: Arial, Helvetica, sans-serif;
    font-size :50px
  }
</style>
