<template>
    <div class="col-md-8">
        <h2>タイムライン</h2>
        <div>
            <div class="timeline" v-for="post in postData" :key="post" v-show="posts">
                <div class="page-content">
                    <img class="post_image" :src="`../${post.photo_path}`">
                    <p>{{post.created_at}}</p>
                    <p>{{post.updated_at}}</p>
                    <span>{{post.description}}</span>
                    <div v-for="tags in tagss" :key="tags">
                        <ul v-for="tag in tags" :key="tag">
                            <li v-if="post.post_id === tag.pivot.post_id">
                                {{tag.tag_name}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-mypage-scroll="infiniteHandler"></div>
        </div>    
    </div>
</template>
<script>
export default {
    props: {
        posts: Array,
        tagss: Array,
        start:Number,
        end:Number,
        startScrollYOffset: Number,
        postData: Array,
    },
    data() {
        return {
            isGettingPosts: false
        };
    },
    methods: {
        infiniteHandler() {
            if(window.pageYOffset >= this.startScrollYOffset && !this.isGettingPosts){
                this.startScrollYOffset = window.innerHeight + window.pageYOffset;
                this.getPost();
            }
        },
        getPost(){
            this.isGettingPosts = true;
            if(this.end <= this.posts.length){
                this.postData = this.postData
                    .concat(this.posts.slice(this.start,this.end));
                this.start = this.start + 10;
                this.end = this.end + 10;
            }
            this.isGettingPosts = false;
        },
    },

}
</script>

<style  scoped>
    .post_image{
        height: 300px;
        width: 300px;
    }
</style>