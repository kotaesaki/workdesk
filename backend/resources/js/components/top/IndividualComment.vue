<template>
    <div class="comments">
        <div class="comment-content">
            <ul>
                <li v-for="comments in commentList" :key="comments.comment_id">
                    <img :src="`../../../../${comments.user[0].profile.icon_path}`" alt="" class="icon_comment">
                    <p class="login_id">{{comments.user[0].login_id}}</p>
                    <p class="time">{{comments.created_at}}</p>
                    <p class="message">{{comments.comment_message}}</p>
                </li>
            </ul>
        </div>
        <form v-on:submit.prevent="submit">
            <textarea name="comment" id="comment" cols="30" rows="10" v-model="comment"></textarea>
            <button>コメントを送信する</button>
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
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>