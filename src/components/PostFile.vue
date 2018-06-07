<template>
  <div>
    <p>识别本地图片</p>
    <el-button type="primary" plain @click="AddPhoto">上传图片</el-button>
    <div>图片预览</div>
    <img id="showphoto" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521717257331&di=d4ffd8bdccdb444fef682b3d232b68ba&imgtype=0&src=http%3A%2F%2Fimg2.ctoutiao.com%2Fuploads%2F2016%2F09%2F10%2F1473472457391044.jpg" alt="识别的图片">
    <div>
      <el-button type="primary" plain @click="onSubmit">开始识别</el-button>
      <el-button @click="onClearn">清空</el-button>
    </div>
    <form id="photoForm">
      <p><input type="file" name="photo" id="photo" @change="changepic(this)" style="display:none"></p>
    </form>
    <result :res="result"></result>
  </div>
</template>

<script>
  import Result from "../components/Result";
  import $ from "jquery";

  export default {
    name: "PostFile",
    components: {
      Result
    },
    data() {
      return {
        apiUrl:
          "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/21aac5e8-b14c-4c41-bc17-44e62cea5fff/image",
        result: []
      };
    },
    methods: {
      // 选择图片
      AddPhoto() {
        document.getElementById("photo").click();
      },
      // 读取图片并预览
      changepic() {
        let readURL = new FileReader();
        let f = document.getElementById("photo").files[0];
        readURL.readAsDataURL(f);
        readURL.onload = function(e) {
          document.getElementById("showphoto").setAttribute("src", this.result);
        };
      },
      // 提交formdata到服务器
      onSubmit() {
        this.result = [];
        var photoForm = document.getElementById("photoForm");
        var fd = new FormData(photoForm);
        this.$http.post(this.apiUrl, fd).then(
          response => {
            console.log("success callback");
            this.result = response.body.Predictions;
            this.result.forEach(function(item, index, input) {
              item.Probability = Number(item.Probability * 100).toFixed(2)
              item.Probability += "%"
            });
          },
          response => {
            console.log("error callback");
          }
        );
      },
      // 清空按钮
      onClearn() {
        this.result = [];
        document.getElementById("showphoto").src =
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521717257331&di=d4ffd8bdccdb444fef682b3d232b68ba&imgtype=0&src=http%3A%2F%2Fimg2.ctoutiao.com%2Fuploads%2F2016%2F09%2F10%2F1473472457391044.jpg";
      },
    }
  };
</script>

<style scoped>
  div,p {
    margin-top: 20px;
    margin-left: 10px;
    font-size: 20px;
    text-align: center;
  }
  #showphoto {
    height: 270px;
    width: 270px;
    margin: 10px 90px;
  }
</style>
