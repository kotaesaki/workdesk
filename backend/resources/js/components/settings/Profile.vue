<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2>プロフィール設定</h2>
        <div
          v-show="loading"
          class="loader-space">
          <vue-loaders-ball-spin-fade-loader
            color="#08415C"
            class="loader" />
        </div>
        <div v-show="!loading">
          <p v-show="id.login_id === 'guest'">
            ゲストユーザのため、編集できません。
          </p>
          <form
            :class="{'guestLogin': id.login_id === 'guest'}"
            enctype="multipart/form-data"
            @submit.prevent="submit">
            <profile-image-form
              :profile="profile"
              @catchImage="displayImage" />
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="name">ニックネーム</label>
                  <p>*必須</p>
                </div>
                <div class="items">
                  <input
                    id="name"
                    v-model="id.name"
                    type="text"
                    name="name">
                </div>
              </div>
            </div>   
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="website_url">ウェブサイト</label>
                </div>
                <div class="items">
                  <input
                    id="website_url"
                    v-model="profile.website_url"
                    type="text"
                    name="website_url">
                </div>
              </div>
            </div>  
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="twitter_url">Twitter</label>
                </div>
                <div class="items">
                  <input
                    id="twitter_url"
                    v-model="profile.twitter_url"
                    type="text"
                    name="twitter_url">                            
                </div>
              </div>                    
            </div>  
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="shokai">紹介文</label>
                </div>
                <div class="items">
                  <textarea
                    id="shokai"
                    v-model="profile.shokai"
                    name="shokai"
                    rows="200" />
                </div>
              </div>                    
            </div>
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="occupation">職業</label>
                </div>
                <div class="items">
                  <select
                    v-model="profile.occupation"
                    name="occupation">
                    <option value="" />
                    <option value="学生">
                      学生
                    </option>
                    <option value="主婦">
                      主婦
                    </option>
                    <option value="デザイナー">
                      デザイナー
                    </option>
                    <option value="エンジニア">
                      エンジニア
                    </option>
                    <option value="営業">
                      営業
                    </option>
                    <option value="マーケティング">
                      マーケティング
                    </option>
                    <option value="その他">
                      その他
                    </option>
                  </select>                            
                </div>
              </div>                    
            </div>
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="sex">性別</label>
                </div>
                <div class="items">
                  <select
                    v-model="profile.sex"
                    name="sex">
                    <option value="" />
                    <option value="男性">
                      男性
                    </option>
                    <option value="女性">
                      女性
                    </option>
                    <option value="その他">
                      その他
                    </option>                            
                  </select>
                </div>
              </div>                    
            </div>
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="age">年齢</label>
                </div>
                <div class="items">
                  <select
                    v-model="profile.age"
                    name="age"
                    placeholder="Select">
                    <option value="0" />
                    <option
                      v-for="n in 100"
                      :key="n"
                      :value="n + 1">
                      {{ n }}
                    </option>                    
                  </select>
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
              v-model="id.id"
              type="hidden"
              name="id">
            <button
              type="submit"
              class="submitBtn">
              変更内容を保存する
            </button>
          </form>
        </div>
      </div>
      <settings-bar />
    </div>
  </div>   
</template>
<script>
import axios from 'axios'
import ProfileImageForm from './ProfileImageForm.vue'
import settingsBar from './settingsBar.vue'
export default {
  components: { settingsBar, ProfileImageForm },
  props: {
    userId: String //idを取得
  },
  data() {
    return {
      id: {},
      profile: {},
      errors: [],
      imageData: '',
      file: '',
      loading: true,
    }
  }, 
  mounted() {
    this.getId()
      .then(()=>this.loading = false)
  },
  methods: {
    submit() {
      this.errors.splice(0)
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('id', this.id.id)
      formData.append('name', this.id.name)
      formData.append('website_url', this.profile.website_url)
      formData.append('twitter_url', this.profile.twitter_url)
      formData.append('shokai', this.profile.shokai)
      formData.append('occupation', this.profile.occupation)
      formData.append('sex', this.profile.sex)
      formData.append('age', this.profile.age)
      formData.append('icon_title', this.profile.icon_title)
      formData.append('icon_path', this.profile.icon_path)
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      axios.post('/api/profile/'+ this.userId, formData, config).then((res)=>{
        alert('保存しました')
        this.$store.dispatch('auth/fetchUser')
      }).catch(err => {
        console.log('err:', err.response.data.errors)
        const val = err.response.data.errors
        if (err.response.status === 422){
          this.validate(val)
        } else if (err.response.status === 413){
          alert('画像サイズが大きすぎます。')
        } else {
          alert('変更に失敗しました。(ステータスコード:'+ err.response.status+ ')')
        }
      })
    },
    async validate(val){
      if (val.name){
        val.name.forEach((v) =>{
          this.errors.push(v)
        })
      }
      if (val.file){
        val.file.forEach(i =>{
          this.errors.push(i)
        })
      }
      if (val.website_url){
        val.website_url.forEach(i =>{
          this.errors.push(i)
        })
      }
      if (val.twitter_url){
        val.twitter_url.forEach(i =>{
          this.errors.push(i)
        })
      }
      if (val.shokai){
        val.shokai.forEach(i =>{
          this.errors.push(i)
        })
      }
      if (val.occupation){
        val.occupation.forEach(i =>{
          this.errors.push(i)
        })
      }
      if (val.sex){
        val.sex.forEach(i =>{
          this.errors.push(i)
        })
      }
      if (val.age){
        val.age.forEach(i =>{
          this.errors.push(i)
        })
      }

    },
    async getId() {
      await axios.get('/api/profile/' + this.userId).then((res)=>{
        this.id = res.data[0]
        this.profile = res.data[1]
        if (this.profile.website_url == 'null'){
          this.profile.website_url = ''
        }
        if (this.profile.twitter_url == 'null'){
          this.profile.twitter_url = ''
        }
        if (this.profile.shokai == 'null'){
          this.profile.shokai = ''
        }
        if (this.profile.sex == 'null'){
          this.profile.sex = ''
        }
        if (this.profile.age == 'null'){
          this.profile.age = ''
        }
        if (this.profile.occupation == 'null'){
          this.profile.occupation = ''
        }
      })
    },
    displayImage(imageData, file){
      this.imageData = imageData
      this.file = file
    }

  },
    
}
</script>
<style scoped>
h2{
    margin: 3rem 0.5rem 2rem;
    background: linear-gradient(transparent 70%, #08415C 70%);
}
.contents{
    margin: 7% 0 8%;
}
.contents .explain{
    float: left;
    clear: both;
    width: 43%;
}
.contents .explain label{
    font-size: 1.2rem;
}
.contents .explain p {
    color: red;
    font-size: 0.8rem;
}
.contents .items{
    position: relative;
    display: grid;
}
.items input{
    width: 90%;
    border: 1px solid #08415C;
    position:relative;
}
.items select{
    width: 90%;
    border: 1px solid #08415C;
    position:relative;
}
.items textarea{
    width: 90%;
    height: 20vh;
    border: 1px solid #08415C;
    position:relative;
    resize: none;
}
.contents .items p{
    display: inline;
    font-size: 0.4rem;
    margin: 0;
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
.loader-space{
    width: 100%;
    height: 20vh;
    position: relative;
}
.loader{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
}
.error{
  color: red;
  font-size:0.8rem;
}
.error ul{
  list-style: none;
}
.guestLogin{
  pointer-events: none;
}
@media(max-width:767px){
  h2{
    text-align: center;
  }
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
  .items select{
    width: 100%;
    font-size: 16px;
    transform: scale(1.0);
  }
  .items textarea{
    width: 100%;
    font-size: 16px;
    transform: scale(1.0);
  }
  .contents .items p{
    font-size: 0.7rem;
  }
}
</style>