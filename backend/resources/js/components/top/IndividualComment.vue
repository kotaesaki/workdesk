<template>
    <div class="comments">
        <div class="comment-content">
            <ul>
                <li>

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
                return this.$store.state['comment/comment'];
            },
            set(value){
                this.$store.commit('comment/updateComment', value);
            }
        },
        post(){
            return this.$store.getters['individual/post'];
        }
    },
    methods: {
/*         submit() {
            this.$store.dispatch('comment/pushComment');
        }, */

    },
}
</script>