<template>
  <div
    id="file-preview"
    class="file-preview">
    <div class="form-group">
      <div class="contents">
        <div class="explain">
          <p>アイコン</p>
        </div>
        <div class="items">
          <img
            v-if="imageData"
            class="userInfo__icon"
            :src="imageData">
          <img
            v-if="imageData1"
            class="userInfo__icon"
            :src="`../${imageData1.icon_path}`">                     
          <label
            class="form-label image-label"
            for="image">
            <input
              id="image"
              class="form-input image-btn"
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              style="display:none;"
              @change="onFileChange">
            <div>アイコンを変更する</div>
          </label>   
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  el: '#file-preview',
  props: ['profile'],
  data() {
    return {
      imageData: '', //プレビュー画像格納用変数
      imageData1: this.profile.icon_path, //初期表示用の画像
      file: '',
    }
  },
  watch: {
    profile(newValue) {
      this.imageData1 = newValue
    },
  },
  mounted() {
        
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files

      if (files.length > 0) {

        this.file = files[0]
        const reader = new FileReader()
        console.log(this.file)

        reader.onload = (e) => {
          this.imageData = e.target.result
          this.imageData1 = ''
          this.$emit('catchImage', this.imageData, this.file)

        }
        reader.readAsDataURL(this.file)
      }
    }
  },
}
</script>
<style scoped>
.contents{
    margin: 7% 0 8%;
}
.contents .explain{
    float: left;
    clear: both;
    width: 43%;
}
.contents .explain p{
    font-size: 1.2rem;
}
.contents .items{
    position: relative;
}
.items input{
    width: 90%;
    border: 1px solid #CFCABF;
    position:relative;
}
.items label{
    display: inline;
}
.items label div{
    display: inline-block;
    border: 1px solid;
    border-radius: 5px;
    padding: 2%;
    margin: 0;
    cursor: pointer;
}
.items label div:hover{
    opacity: 0.6;;
}
.userInfo__icon{
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
}
@media(max-width: 767px){
  .contents .explain{
    float: none;
    text-align: center;
    width: auto;
  }
  .contents .title{
    font-size:1rem;
    margin: 0;
  }
  .items{
    text-align: center;
  }
  .items input{
    width: 100%;
    font-size: 16px;
    transform: scale(1.0);
  }
}
</style>