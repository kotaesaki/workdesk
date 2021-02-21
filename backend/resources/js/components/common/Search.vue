<template>
  <div class="search">
    <div class="box">
      <i class="fas fa-search" />
      <input
        id="search"
        v-model="word"
        type="search"
        class="searchBox"
        placeholder="キーワードを入力..."
        @keydown.enter="trigger">
    </div>
    <div
      v-show="result"
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
              :key="tag.tag_id">
              <p>{{ tag.tag_name }}</p>
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
              :key="user.id">
              <p>{{ user.name }}</p>
              <p>@{{ user.login_id }}</p>
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
      <div
        v-show="result"
        class="overlay"
        @click="closeSearch" />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      isActive: '1',
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
  height: 43rem;
  top: 20.7rem;
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
.list{
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  box-shadow: 1px 1px 11px lightgrey;
  background: #fff;
  z-index: 1002;
}
.tab_list {
  overflow: hidden;
  list-style: none;
  padding: 0;
  width: 100%;
  height: 8%;
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
</style>