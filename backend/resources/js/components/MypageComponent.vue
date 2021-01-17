<template>
 <div class="container">

    <div class="row justify-content-center">
        <div class="col-md-8">
            <p>人気の投稿</p>

        </div>
        <div class="col-md-4">  
            <p>{{id.login_id}}</p>
            <ul id="mypage-item">
                <li v-for="item in items" :key="item.message">
                    {{ item.message }}
                </li>
            </ul>
        </div>
    </div>
</div>   
</template>
<script>
export default {
    props: {
        userId: String
    },
    data() {
        return{
            items:[
                {message: '全ての写真'},
                {message: 'フォロー'},
                {message: 'フォロワー'},
                {message: '投稿したタグ'},
                {message: 'いいねした写真'}
            ],
            id:{}
       }
   },
   methods: {
       getId() {
           axios.get('/api/mypage' + this.userId).then((res)=>{
               this.id = res.data;
           })
       }
   }, 
   mounted() {
       this.getId();
   },
    
}
</script>
