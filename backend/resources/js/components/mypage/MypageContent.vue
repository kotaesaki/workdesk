<template>
    <div class="col-md-8">
        <p>タイムライン</p>
        <div>
            <div class="timeline" v-for="post in posts" :key="post">
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
        </div>    
    </div>
</template>
<script>
export default {
    props: {
        posts: Array,
        tagss: Array,

    },
    data() {
        return {
            property: 'value',
        };
    },

}
</script>

<style  scoped>
    .post_image{
        height: 300px;
        width: 300px;
    }
</style>