<template>
    <div class="comments">
        <div class="comment-content">
            <ul>
                <li v-for="comments in commentList" :key="comments.comment_id">
                    <img :src="`../../../../${comments.user[0].profile.icon_path}`" alt="" class="icon_comment">
                    <router-link v-bind:to="{ name:'mypage', params:{userId:comments.user_id}}">
                        <p class="login_id">@{{comments.user[0].login_id}}</p>
                    </router-link>
                    <p class="time">{{comments.created_at}}</p>
                    <div class="balloon">
                        <div class="says">
                            <p class="message">{{comments.comment_message}}</p>
                        </div>
                        <i class="fas fa-reply reply"></i>
                    </div>
                </li>
            </ul>
        </div>
        <form v-on:submit.prevent="submit">
            <div class="area">
                <textarea name="comment" id="comment" class="textarea" cols="30" rows="3" v-model="comment" placeholder="コメントを入力する"></textarea>
            </div>
            <button class="comment-btn">コメントする</button>
        </form>

    </div>
</template>
<script>
export default {
    computed: {
        comment:{
            get(){
                return this.$store.getters['comment/comment'];
            },
            set(value){
                this.$store.commit('comment/updateComment', value);
            }
        },
        commentList(){
            return this.$store.getters['comment/commentList'];
        },
        post(){
            return this.$store.getters['individual/post'];
        },
        user(){
            return this.$store.getters['auth/user'];
        },
    },
    methods: {
        submit() {
            this.$store.dispatch('loading/startLoad')
                .then(()=>this.$store.dispatch('comment/pushComment',
                {comment: this.comment, post_id: this.post.post_id, user_id: this.user.id}))
                .then(()=>this.$store.dispatch('loading/endLoad'));    
        },

    },
}
</script>
<style scoped>
    .icon_comment{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        float: left;
    }
    ul{
        list-style: none;
    }
    li{
        padding-top:25px;
    }
    a:hover .login_id{
        text-decoration: none;
    }
    .login_id{
        margin: 3px;
        color: #E1544F;
    }
    .time{
        font-size: .8em;
        color: #859099;
    }
    .balloon{
        width: 100%;
        text-align: left;
    }
    .says{
        width: 80%;
        display: inline-block;
        position: relative; 
        margin: 0 0 0 50px;
        padding: 10px;
        max-width: 80%;
        border-radius: 12px;
        background: #edf1ee;
    }
    .says:after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 3px; 
        left: -19px;
        border: 8px solid transparent;
        border-right: 18px solid #edf1ee;
        -webkit-transform: rotate(40deg);
        transform: rotate(40deg);
    }
    .message{
        margin-bottom: 0.5em;
        clear: both;
    }
    .reply{
        color: #2983FD;
        position: relative;
        top: 26px;
        right: 20px;
        font-size: 1.6em;
    }
    form{
        display: block;
        margin: 0 auto;
        width: 90%;
        padding: 10% 0 10%;
    }
    .textarea{
        width: 100%;
        border-radius: 10px;
        border: 1.5px solid #CFCABF;
        resize: none;
    }
    .comment-btn{
        display: block;
        margin: 2% 0 0 auto;
        border: 1.5px solid #CFCABF;
        border-radius: 2%;
        width: 13rem;
        height: 3rem;
        background-color: #fff;
        position: relative;
    }
    .comment-btn:hover{
        background-color: #CFCABF;
    }

</style>