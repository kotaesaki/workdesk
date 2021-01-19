<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <p>プロフィール設定</p>
            <form action="#">
                <div class="form-group">
                    <label for="name">ニックネーム</label>
                    <input type="text" name="name" id="nickname" v-bind:value="id.name">
                </div>   
                <div class="form-group">
                    <label for="name">ウェブサイト</label>
                    <input type="text" name="name" id="nickname" v-bind:value="id.name">
                </div>  
                <div class="form-group">
                    <label for="name">紹介文</label>
                    <textarea id="shokai" name="shokai" v-model="id.name"></textarea>
                </div>
                <div class="form-group">
                    <input type="submit" name="submit" value="変更内容を保存する">
                </div>               
            </form>
        </div>
        <settings-bar></settings-bar>
    </div>
</div>   
</template>
<script>
import settingsBar from './settingsBar.vue';
export default {
  components: { settingsBar },
    props: {
        userId: String //idを取得
    },
    data() {
        return{
            id:{}
       }
   },
   methods: {
       getId() {
           axios.get('/api/mypage/' + this.userId).then((res)=>{
               this.id = res.data;
           })
       }
   }, 
   mounted() {
       this.getId();
   },
    
}
</script>
