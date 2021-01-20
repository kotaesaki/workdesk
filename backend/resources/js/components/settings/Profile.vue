<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <p>プロフィール設定</p>
            <form v-on:submit.prevent="submit">
                <div class="form-group">
                    <label for="name">ニックネーム</label>
                    <input type="text" name="name" id="name" v-model="id.name">
                </div>   
                <div class="form-group">
                    <label for="name">ウェブサイト</label>
                    <input type="text" name="website_url" id="website_url" v-model="profile.website_url">
                </div>  
                <div class="form-group">
                    <label for="name">Twitter</label>
                    <input type="text" name="twitter_url" id="twitter_url" v-model="profile.twitter_url">
                </div>  
                <div class="form-group">
                    <label for="name">紹介文</label>
                    <textarea id="shokai" name="shokai" v-model="profile.shokai"></textarea>
                </div>
                <input type="hidden" name="id" id="id" v-model="id.id">
                <button type="submit" class="btn btn-primary">変更内容を保存する</button>
             
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
            id:{},
            profile:{}
       }
   },
   methods: {
       submit() {
           let data = {
               "id" : this.id.id,
               'name':this.id.name,
               'website_url': this.profile.website_url,
               'twitter_url': this.profile.twitter_url,
               'shokai': this.profile.shokai
           };
           console.log(data);
           axios.post('/api/profile/'+ this.userId, data).then((res)=>{
               alert('保存しました');
           }).catch(err => {
                console.log('err:', err);
                console.log('失敗');
                alert('保存に失敗しました');
        });
       },
       getId() {
           axios.get('/api/profile/' + this.userId).then((res)=>{
                this.id = res.data[0];
                this.profile = res.data[1];

           })
       }
   }, 
   mounted() {
       this.getId();
   },
    
}
</script>
