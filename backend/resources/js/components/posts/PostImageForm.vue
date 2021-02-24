<template>
  <div
    id="post-image-preview"
    class="post-image-preview">
    <div class="form-group">
      <div class="contents">
        <div class="explain">
          <p class="title">
            画像をアップロードする
          </p>
          <p class="required">
            ※必須
          </p>
        </div>
        <div class="uploadStep items">
          <label
            v-show="!cropImg"
            for="image"
            class="image-view">
            <input
              id="image"
              class="form-input image-btn"
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              @change="openModal">
            <div class="selectBtn">写真を選択する</div>
          </label>
          <div class="photoImage">
            <img
              v-if="cropImg"
              class="cropimg"
              :src="cropImg">
            <div
              v-if="cropImg"
              class="deleteImg"
              @click="deleteImage">
              <i class="fas fa-times deleteBatsu" />
            </div>
          </div>
        </div>
      </div>

      <!-- 以下モーダル -->
      <div
        v-show="showModal"
        class="overlay">
        <div class="modal1">
          <div class="batsu">
            <i
              class="fas fa-times batsuBtn"
              @click="closeModal" />
          </div>
          <p>トリミングする</p>
          <div
            v-if="imageData"
            class="image-box">
            <vue-cropper
              v-if="imageData"
              ref="cropper"
              :guides="true"
              :view-mode="2"
              :drag-mode="none"
              :aspect-ratio="1/1"
              :auto-crop-area="0.5"
              :min-container-width="200"
              :min-container-height="200"
              :background="true"
              :rotatable="false"
              :src="imageData"
              :img-style="{ 'width': '300px', 'height': '300px' }" />
          </div>
          <div class="modalBtn">
            <div
              class="cancelBtn"
              @click="closeModal">
              キャンセル
            </div>                    
            <div
              class="completeBtn"
              @click="cropImage">
              完了
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropperjs'

import 'cropperjs/dist/cropper.css'

export default {
  el: '#post-image-preview',
  components: {
    VueCropper
  },
  /*     props:
    [

    ], */
  data() {
    return {
      showModal: false,
      imageData: '',
      cropImg: '',
      file: '',
      blob: '',
    }
  },
  methods: {
    openModal(e) {
      let files = e.target.files
      if (files.length) {
        this.file = files[0]
        const reader = new FileReader()
        console.log(this.file)
        reader.onload = (e) => {
          this.imageData = e.target.result
          this.$refs.cropper.replace(e.target.result)
        }
        reader.readAsDataURL(this.file)
        e.target.value = ''
        this.showModal = true

      }
            
    },
    closeModal(){
      this.deleteImage()
      this.showModal = false
    },
    cropImage(){
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      let bin = atob(this.cropImg.replace(/^.*,/, ''))
      let buffer = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++){
        buffer[i] = bin.charCodeAt(i)
      }

      // Blobを作成
      this.blob = new Blob([buffer.buffer], {
        type: 'image/jpeg'
      })
      console.log(this.blob)
      this.$emit('catchBlob', this.blob)
      this.showModal = false
    },
    deleteImage(){
      console.log('写真消します')
      this.imageData = ''
      this.cropImg = ''
      this.file = ''
      this.blob = ''
      this.$emit('catchBlob', this.blob)
      console.log('写真消しました')
      //こっちでもemit送る
    },

  },
}
</script>
<style scoped>
.uploadStep{
    position:relative;
    width: 100%;
}
.image-view{
    width: 300px;
    height: 300px;
    background-color: #08415C;
    border: 2px dashed grey;
    text-align: center;
}
.selectBtn{
    margin: 71% 10% 0 10%;
    border: 1px solid;
    border-radius: 6px;
    padding: 4% 14%;
    background-color: #fff;
    cursor: pointer;
}
.selectBtn:hover{
    opacity: 0.6;
}
.overlay{
    z-index:1;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal1{
    position:relative;
    z-index: 2;
    width: 50%;
    padding: 1em;
    background-color: #fff;
    text-align: center;
    border-radius: 7px;
}
.modal1 p{
    border-bottom: 2.3px solid slategrey;
    padding: 1% 0 2% 0;
}
.modalBtn{
    margin:2% 0;
}
.cancelBtn{
    display: inline-block;
    border: 2px solid;
    border-radius: 6px;
    padding: 2% 3%;
    margin:0 2% 0 0;  
    cursor: pointer; 
}
.cancelBtn:hover{
    opacity: 0.3;
}
.completeBtn{
    display: inline-block;
    border: 2px solid #DC3E38;
    border-radius: 6px;
    padding: 2% 7%;
    background-color: #DC3E38;
    color: #fff;
    margin:0 0 0 2%;
    cursor: pointer;
}
.completeBtn:hover{
    opacity: 0.3;
}
.batsu{
    font-size:2em;
    cursor: pointer;
    position: absolute;
    top: -1.3rem;
    right: -0.8rem;
    border-radius: 50%;
    border: 1px solid #fff;
    padding: 0.5rem;
    background-color: #fff;
    width: 2.4rem;
    height: 2.4rem;
    box-shadow: 0 2px 7px grey;
}
.batsuBtn{
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.6rem;
    right: 0.65rem;
    font-size: 1.3rem;
}
.photoImage{
  position:relative;

  margin: 0 auto;
}
.deleteImg{
    position: absolute;
    border-radius: 50%;
    border: 1px solid #443311;
    padding: 0.5rem;
    background-color: #443311;
    box-shadow: 0 2px 7px grey;
    top: -1rem;
    right: 13rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}
.deleteBatsu{
    position:absolute;
    top: 0.58rem;
    right: 0.6rem;
    color: #fff;
}
.cropimg{
    width: 300px;
    height: 300px;
}
.image-box{
    width: 300px; 
    height:300px; 
    border: 1px solid gray; 
    display: inline-block;
}
label input{
    display: none;
}
@media(max-width: 1199px){
  .deleteImg{
    top: -1rem;
    right: 8rem;
  }
}
@media(max-width:1000px){
  h2{
    text-align: center;
  }
  .explain{
    float: none;
    text-align: center;
    width: auto;
  }
  .title{
    font-size:1rem;
    margin: 0;
  }
  .required{

  }
  .uploadStep{
    text-align: center;
  }
  .modal1{
    width: 93vw;
    height: 84vh;
  }
  .photoImage{
    width: 300px;
  }
  .deleteImg{
    top: -1rem;
    right: -1rem;
  }
}
</style>