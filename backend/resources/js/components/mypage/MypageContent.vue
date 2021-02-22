<template>
  <div class="col-md-8">
    <h2>タイムライン</h2>
    <div> 
      <div
        v-for="post in postData"
        v-show="posts"
        :key="post.post_id"
        class="timeline">
        <router-link :to="{ name:'individual', params: { postId: post.post_id}}">
          <div class="page-content">
            <img
              class="post_image"
              :src="`../${post.photo_path}`">
            <div class="right_side">
              <span>{{ post.description }}</span>
              <!-- <div v-for="tags in tagsData" :key="tags.tag_id" class="tags">
                                    <li v-if="post.post_id === tags.pivot.post_id">
                                        #{{tags.tag_name}}
                                    </li>
                            </div> -->
              <p>{{ post.created_at | moment }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div> 
    <div
      v-show="loading"
      class="loader-space">
      <vue-loaders-ball-spin-fade-loader
        color="#DEF2FF"
        scale="2"
        class="loader" />
    </div>   
  </div>
</template>
<script>
import moment from 'moment'

export default {
  filters: {
    moment: function (date){
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  },
  props: {
    userId: String,
  },
  data() {
    return {
    }
  },
  computed: {
    posts(){
      return this.$store.getters['mypage/posts']
    },
    tagsData(){
      return this.$store.getters['mypage/tagsData']
    },
    postData(){
      return this.$store.getters['mypage/postData']
    },
    id(){
      return this.$store.getters['mypage/id']
    },
    loading(){
      return this.$store.getters['mypage/itemLoading']
    }

  },
  mounted() {
    console.log('mypageContent mounted start')
    window.onscroll = () => {
      let bottomOfWindow = document.scrollingElement.scrollTop + window.innerHeight
      if (bottomOfWindow >= document.documentElement.offsetHeight) {
        this.$store.dispatch('loading/startLoad')
          .then(()=>this.startPost())
          .then(()=>this.$store.dispatch('loading/endLoad'))
      }
    }
    this.$store.dispatch('loading/startLoad')
      .then(()=>this.startPost())
      .then(()=>this.$store.dispatch('loading/endLoad'))
  },
  methods: {
    async startPost(){
      await this.$store.dispatch('mypage/startPost', this.userId)
    }
  },

}
</script>

<style  scoped>
    h2{
        padding: 4%;
        font-size: 2rem;
        background-color: #CFCABF;
        box-shadow: 1px 1px 6px grey;
        border-radius: 5px;
        background: linear-gradient(transparent 0%, #CFCABF 95%);

    }
    .timeline:hover{
        opacity: 0.5;
        cursor: pointer;
    }
    .page-content{
        margin:4% 0;
        border-bottom: 1px solid #CFCABF;
    }
    .post_image{
        width: 16vw;;
        float: left;
    }
    .page-content p{
        margin: 0;
        font-size: 0.8em;
        color: #859099;
        clear: both;
    }
    .page-content span{
        padding: 2% 0 0;
        position: relative;
        left: 3%;
    }
    .page-content .tags{
        display: inline-flex;
    }
    .page-content ul {
        list-style: none;
    }
    .loader-space{
        width: 100%;
        text-align: center;
        padding: 7% 0;
        margin: 10% 0 ;
    }
    .loader{
    }
</style>