<template>
  <div class="container postUpload">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h2>写真を投稿する</h2>
        <form
          enctype="multipart/form-data"
          @submit.prevent="submit">
          <post-image-form
            :cart-items="cartItems"
            @catchBlob="uploadBlob"
            @catchCropImg="uploadCropImg" />
          <post-tag-form @catchTag="uploadTag" />
          <post-item-form
            :crop-img="cropImg"
            @catchCartItems="uploadCartItems" />
          <div class="form-group">
            <div class="contents">
              <div class="explain">
                <p class="title">
                  コメントを追加する
                </p>
                <p class="required">
                  ※必須
                </p>
              </div>
              <div class="items">
                <textarea
                  id="description"
                  v-model="description"
                  class="commentArea"
                  name="description"
                  cols="30"
                  rows="10"
                  placeholder="コメントを入力する" />
              </div>
            </div>
          </div>
          <p
            v-if="errors.length"
            class="error">
            <ul>
              <li
                v-for="error in errors"
                :key="error">
                {{ error }}
              </li>
            </ul>
          </p>
          <input
            id="id"
            v-model="userId"
            type="hidden"
            name="id">
          <button
            type="submit"
            class="submitBtn"
            :disabled="isPosting">
            写真を投稿する
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import PostImageForm from './PostImageForm.vue'
import PostTagForm from './PostTagForm.vue'
import MultipostAboidable from '../../mixins/multipost_aboidable'
import PostItemForm from './PostItemForm.vue'
import axios from 'axios'
export default {
  components: { PostImageForm, PostTagForm, PostItemForm },
  mixins: [MultipostAboidable],
  props: {
    userId: String
  },
  data() {
    return {
      id: '',
      profile: '',
      errors: [],
      blob: '',
      cropImg: '',
      tag: '',
      description: '',
      cartItems: ''
    }
  },
  methods: {
    async submit() {
      
      this.errors.splice(0)
      let imageName = Math.random().toString(32).substring(2)
      let formData = new FormData()
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      if (this.tag.length > 0) {
        this.tag.forEach((text, index) => {
          formData.append('tag[' + index + ']', text)
        })
      } else {
        formData.append('tag', [])
      }
      if (this.cartItems.length > 0){
        this.cartItems.forEach((text, index)=>{
          formData.append('items[' + index + ']', JSON.stringify(text))
        })
      } else {
        formData.append('items', [])
      }
      if (!this.blob){
        formData.append('file', '')
      } else {
        formData.append('file', this.blob, imageName + '.jpg')
      }
      formData.append('description', this.description)
      formData.append('id', this.userId)
      this.avoidMultipost(async()=>{
        await axios.post('/api/post_upload/' + this.userId, formData, config).then(()=>{
          this.$router.push({name: 'mypage'})
          alert('投稿しました')
        }).catch(err=>{
          console.log(err.response)
          const val = err.response.data.errors
          if (err.response.status === 422){
            if (val.file){
              val.file.forEach((v) =>{
                this.errors.push(v)
              })
            }
            if (val.tag){
              val.tag.forEach(i =>{
                this.errors.push(i)
              })
            }
            if (val.description){
              val.description.forEach(i =>{
                this.errors.push(i)
              })
            }
          } else if (err.response.status === 413){
            alert('画像サイズが大きすぎます')
          } else {
            alert('投稿に失敗しました。(ステータスコード:' + err.response.status + ')')
          }
        })
      })
    },
    getId() {
      axios.get('/api/post_upload/' + this.userId).then((res)=>{
        this.id = res.data[0]
        this.profile = res.data[1]
      })
    },
    uploadBlob(blob){
      this.blob = blob
    },
    uploadCropImg(cropImg){
      this.cropImg = cropImg
    },
    uploadTag(tag){
      this.tag = tag
    },
    uploadCartItems(cartItems){
      this.cartItems = cartItems
    }
  },
}
</script>
<style>
.postUpload h2{
    padding: 3rem 4rem;
}
.postUpload .contents{
    margin: 5%;
    display: inline;
}
.postUpload .contents .explain{
    float: left;
    clear: both;
    padding: 1% 7%;
    width: 43%;
}
.postUpload .contents .title{
    font-size:1.4rem;
}
.postUpload .required{
    color: red;
    font-size: 0.7rem;
    padding: 0 4%;
}

.commentArea{
    resize: none;
    border: 1px solid #cde;
    border-radius: 6px;
    width: 53%;
    height: 10vw;
}
.submitBtn{
    border: 2px solid grey;
    border-radius: 6px;
    margin: 0 auto 20%;
    display: block;
    padding: 2% 8%;
    font-size: 1.2rem;
    background-color: #08415C;
    color: #fff;
}
.submitBtn:hover{
    opacity: 0.6;
}
.error{
  color: red;
  font-size:0.8rem;
  text-align: center;
}
.error ul{
  padding: 0;
  list-style: none;
}
@media(max-width:1000px){
  h2{
    text-align: center;
  }
  .postUpload .contents .explain{
    float: none;
    text-align: center;
    width: auto;
  }
  .postUpload .contents .title{
    font-size:1rem;
    margin: 0;
  }
  .items{
    text-align: center;
  }
  .commentArea{
    width: 100%;
    height: 100vw;
    font-size: 16px;
    transform: scale(1.0);
  }
}
</style>