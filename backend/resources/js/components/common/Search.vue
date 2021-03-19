<template>
  <div class="search">
    <div
      class="box"
      :class="{'flugSearch': btnFlug === 0}">
      <i
        class="fas fa-search"
        :class="{'flugSearch': btnFlug === 1}" />
      <input
        id="search"
        v-model="word"
        type="search"
        class="searchBox"
        placeholder="キーワードを入力..."
        @keydown.enter="trigger">
      <p
        class="cancelBtn"
        @click="closeSearch(); showSearch()">
        キャンセル
      </p>
    </div>
    <div
      class="searchBtn"
      @click="showSearch">
      <i class="fas fa-search" />
    </div>
    <div
      v-if="result"
      v-scroll-lock="result"
      class="list">
      <div>
        <ul class="tab_list">
          <li
            :class="{'active': isActive === '1'}"
            @click="changeTab('1')">
            タグ
          </li>
          <li
            :class="{'active': isActive === '2'}"
            @click="changeTab('2')">
            ユーザー
          </li>
        </ul>
      </div>
      <div class="article">
        <div
          v-show="isActive === '1'"
          class="tagSearch item">
          <ul>
            <li
              v-for="tag in tagArray"
              :key="tag.tag_id"
              @click="closeSearch(); showSearch()">
              <router-link
                :to="{ name:'tag', params:{tagId: tag.tag_id}}">
                <p>
                  {{ tag.tag_name }}
                </p>
              </router-link>
            </li>
            <p v-show="tagArray.length === 0 && !loading">
              検索結果 0件...
            </p>
          </ul>
        </div>
        <div
          v-show="isActive === '2'"
          class="userSearch item">
          <ul>
            <li 
              v-for="user in userArray"
              :key="user.id"
              @click="closeSearch(); showSearch()">
              <router-link
                :to="{name: 'mypage', params: {userId: user.id}}">
                <p>{{ user.name }}</p>
                <p>@{{ user.login_id }}</p>
              </router-link>
            </li>
            <p v-show="userArray.length === 0 && !loading">
              検索結果 0件...
            </p>
          </ul>
        </div>
      </div>
      <div
        v-show="loading"
        class="loader-space">
        <vue-loaders-line-scale
          color="#222"
          class="loader" />
      </div>
    </div>
    <div
      v-if="result"
      class="overlay"
      @click="closeSearch" />
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      isActive: '1',
      btnFlug: 0,
    }
  },
  computed: {
    word: {
      get() {
        return this.$store.getters['search/word']
      },
      set(val) {
        this.$store.commit('search/setWord', val)
        
      },
    },
    result(){
      return this.$store.getters['search/result']
    },
    tagArray(){
      return this.$store.getters['search/tagArray']
    },
    userArray(){
      return this.$store.getters['search/userArray']
    },
    loading(){
      return this.$store.getters['search/loading']
    }
  },
  methods: {
    async trigger(e){
      if (e.keyCode !== 13) return
      this.$store.dispatch('search/trigger')
    },
    changeTab(val) {
      this.isActive = val
    },
    closeSearch(){
      this.$store.commit('search/setResult', false)
    },
    
    showSearch(){
      if (this.btnFlug === 0){
        this.btnFlug = 1
      } else if (this.btnFlug === 1){
        this.btnFlug = 0
      }
    }
  },
}
</script>
<style scoped>
.search{
  position: relative;
  min-width: 26rem;
  width: 29rem;
  margin-left: 7rem;
  margin-right: 1rem;
  z-index: 10000;
  height: 0.1rem;
  top: -1rem;
}
.search .box {
  position: relative;
}
.search i{
  position: absolute;
  top: 0.4rem;
  left: 0.6rem;
  color: grey;
}
.cancelBtn{
  display: none;
}
.searchBtn{
  display: none;
}
.search input{
  width: 100%;
  border: 1px solid #eae7e2;
  padding-left: 2rem;
  background: aliceblue;
  outline: none;
}
.search input:focus{
  background-color: #fff;
  border: 1px solid #eae7e2;

}
.overlay{
  z-index:1001;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
li:hover{
  opacity: 0.6;
}
.list{
  position: relative;
  width: 100%;
  height: 43rem;
  border-radius: 7px;
  box-shadow: 1px 1px 11px lightgrey;
  background: #fff;
  z-index: 1002;
}
.tab_list {
  box-shadow: 0px 1px 8px darkgrey;
  overflow: hidden;
  list-style: none;
  padding: 0;
  width: 100%;
  height: 8%;
  z-index: 1002;
}
.tab_list li {
  float: left;
  padding: 10px 20px;
  cursor: pointer;
  transition: .3s;
  width: 50%;
  text-align: center;
}
.tab_list li:not(:first-child) {
  border-left: none;
}
.tab_list li.active {
  border-bottom: 3px solid #000;
  cursor: auto;
}
.article{
  height: 91%;
  z-index: 1002;
}
.article ul{
  list-style: none;
  padding: 0;
  height: 91%;
  margin: 0;
  position: absolute;
  width: 100%;
}
.article ul li{
  border-bottom: 1px solid #ddd;
  height: 9%;
  position: relative;
}

.article ul li p{
  margin:  0 2rem;
}
.loader-space{
  width: 100%;
  height: 20vh;
  position: absolute;
  top: 4rem;
  margin: 0 47%;
}
@media(max-width: 1000px){
  .search{
    min-width: 100%;
    width:100%;
    margin:0;
    top:2rem;
  }
  .box{

  }
  .search input{
    height: 51px;
    font-size: 16px;
    transform: scale(1.0);
    width: 73%;
  }
  .cancelBtn{
    display: inline-block;
    width: 20%;
  }
  .search i{
    top: 1rem;
  }
  .searchBtn{
    display: inline;
    position: absolute;
    font-size: 1rem;
    top: -53px;
    left: 7.9rem;
  }
  .flugSearch{
    display: none;
  }
  .list{
    overflow-y: auto;
    height: 34rem;
  }
}
</style>