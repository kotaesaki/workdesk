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
    <div v-show="result">
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
            <li />
          </ul>
        </div>
        <div
          v-show="isActive === '2'"
          class="userSearch class">
          <ul>
            <li />
          </ul>
        </div>
      </div>
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
.tab_list {
    overflow: hidden;
    list-style: none;
}
.tab_list li {
    float: left;
    padding: 10px 20px;
    cursor: pointer;
    transition: .3s;
}
.tab_list li:not(:first-child) {
    border-left: none;
}
.tab_list li.active {
    border-bottom: 3px solid #000;
    cursor: auto;
}
</style>