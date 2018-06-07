<template>
  <div>
    <div id="divtop">
      <el-form ref="form" :model="form" >
        <el-form-item >
          <div>图片URL</div>
          <el-input v-model="form.PhotoUrl" placeholder="请输入图片的URL" style="width:700px;"></el-input>
        </el-form-item>
        <div>图片预览</div>
        <img id="showPhoto" src= "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521717257331&di=d4ffd8bdccdb444fef682b3d232b68ba&imgtype=0&src=http%3A%2F%2Fimg2.ctoutiao.com%2Fuploads%2F2016%2F09%2F10%2F1473472457391044.jpg" alt="识别的图片">
        <el-form-item class="btngroup">
          <el-button class="btn" type="primary" plain @click="onSubmit">开始识别</el-button>
          <el-button class="btn" @click="onClearn" >清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <result :res="result"></result>
  </div>

</template>

<script>
  import Result from '../components/Result';
    export default {
      name: "PostUrl",
      components: {
        Result,
      },
      data() {
        return {
          form: {
            PhotoUrl: ''
          },
          apiUrl : 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/21aac5e8-b14c-4c41-bc17-44e62cea5fff/url',
          // testPhotoUrl : "http://image.bitauto.com/dealer/news/100035796/183c748d-3648-418e-9b4d-1f84fc6b8c05.jpg"
          result : []
        };
      },
      methods: {
        onSubmit() {
          this.result = []
          document.getElementById("showPhoto").src = this.form.PhotoUrl
          this.$http.post(
            this.apiUrl ,
            {
              Url : this.form.PhotoUrl,
            },
            {
              // 'headers': {
              // 'Prediction-Key': '112f8f6e5cd04cbba81706d9318cfa82',
              // 'Content-Type': 'application/json'
              // }
            }).then(response => {
            console.log('success callback')
            this.result = response.body.Predictions;
            this.result.forEach(function(item, index, input) {
              item.Probability = Number(item.Probability * 100).toFixed(2)
              item.Probability += "%"
            });
          }, response => {
            console.log('error callback')
          });

        },
        onClearn() {
          this.form.PhotoUrl = ""
          this.result = []
          document.getElementById("showPhoto").src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521717257331&di=d4ffd8bdccdb444fef682b3d232b68ba&imgtype=0&src=http%3A%2F%2Fimg2.ctoutiao.com%2Fuploads%2F2016%2F09%2F10%2F1473472457391044.jpg"
        }
      }
    }
</script>

<style scoped>
  #divtop {
    /*margin-left: 780px;*/
    text-align: center;
  }
  div, img {
    margin-top: 20px;
    font-size: 25px;
  }
  .btn {
    margin-left: 20px;
    font-size: 18px;
  }
</style>
