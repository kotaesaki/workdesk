<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2>アカウント設定</h2>
        <form @submit.prevent="submit">
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
          <div>
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="e-mail">メールアドレス</label>
                </div>
                <div class="items">
                  <input
                    id="email"
                    v-model="id.email"
                    type="text"
                    name="email">
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="contents">
                <div class="explain">
                  <label for="password">パスワード</label>
                </div>
                <div class="items">
                  <input
                    id="password"
                    v-model="password"
                    :type="inputType"
                    name="password"
                    autocomplete="new-password">
                  <span
                    :class="iconType"
                    @click="changePassword" />
                  <p>※メールアドレスのみを変更される方は、現在のパスワードを入力してください。</p>
                  <p>※パスワードを変更される方は、こちらに新たなパスワードを入力してください。</p>
                </div>
              </div>
            </div>
          </div>
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
      <settings-bar />
    </div>
  </div>   
</template>
<script>
import settingsBar from './settingsBar.vue'
import axios from 'axios'
export default {
  components: { settingsBar },
  props: {
    userId: String //idを取得
  },
  data() {
    return {
      id: {},
      errors: [], //バリデーションエラー文
      password: '',
      isChecked: false,
    }
  },
  computed: {
    inputType() {
      return this.isChecked ? 'text' : 'password'
    },
    iconType(){
      return this.isChecked ? 'eye-slash' : 'eye'
    }
  }, 
  mounted() {
    this.getId()
  },
  methods: {
    changePassword(){
      this.isChecked = !this.isChecked
    },
    getId() {
      axios.get('/api/account/' + this.userId).then((res)=>{
        this.id = res.data
      })
    },
    async submit(){
      this.errors.splice(0)
      let formData = new FormData()
      formData.append('id', this.id.id)
      formData.append('email', this.id.email)
      formData.append('password', this.password)

      await axios.post('/api/account/' + this.userId, formData).then((res)=>{
        alert('変更を保存しました')
      }).catch(err => {
        const val = err.response.data.errors
        if (err.response.status === 422){
          if (val.email){
            val.email.forEach((v) =>{
              this.errors.push(v)
            })
          }
          if (val.password){
            val.password.forEach(i =>{
              this.errors.push(i)
            })
          }
        } else {
          alert('変更に失敗しました。(ステータスコード:' + err.response.status + ')')
        }

      })
    },
  },
    
}
</script>
<style scoped>
h2{
    margin: 3rem 0.5rem 2rem;
    background: linear-gradient(transparent 70%, #08415C 70%);
}
.contents{
    margin: 7% 0 14%;
}
.contents .explain{
    float: left;
    clear: both;
    padding: 1% 7%;
    width: 43%;
}
.contents .explain label{
    font-size: 1.4rem;
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
.eye::after{
    font-family: 'FontAwesome';
    content: "\f06e";
    position: absolute;
    top: 0.1rem;
    right: 3rem;  
}
.eye-slash::after{
    font-family: 'FontAwesome';
    content: "\f070";
    position: absolute;
    top: 0.1rem;
    right: 3rem;
}
.error{
  color: red;
  font-size:0.8rem
}
.error ul{
  list-style: none;
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
  .contents .items p{
    font-size: 0.7rem;
  }
  .eye::after{
    right: 1.5rem;
    font-size: 1.2rem;
  }
  .eye-slash::after{
    right: 1.5rem;
    font-size: 1.2rem;
  }
}
</style>
