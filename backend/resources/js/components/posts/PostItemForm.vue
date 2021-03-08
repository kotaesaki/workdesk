<template>
  <div class="form-group">
    <div class="contents">
      <div class="explain">
        <p class="title">
          アイテムタグを追加する
        </p>
        <p class="required">
          ※必須
        </p>
      </div>
      <div class="items">
        <div
          class="searchBtn"
          @click="openModal">
          <i class="fas fa-search" />
          <p>検索して<br>追加する</p>
        </div>
      </div>
      <!-- 以下モーダル -->
      <div
        v-show="showModal"
        class="overlay">
        <div
          v-scroll-lock="!loading"
          class="modal1">
          <div
            class="batsu"
            @click="closeModal">
            <i class="fas fa-times batsuBtn" />
          </div>
          <p>アイテムを探す</p>
          <div
            v-show="!loading && isActive === 1"
            class="modalBtn">
            <input
              id="item"
              v-model="searchWords"
              type="text"
              class="itemArea"
              placeholder="検索ワードを入力してください。">                  
            <div
              class="completeBtn"
              @click="searchItem">
              検索する
            </div>
            <div class="resultItem">
              <div
                v-for="item in items"
                :key="item.itemCode"
                class="contentItem"
                @click="selectItem(item,2)">
                <img
                  :src="`${item.itemImageUrl}`"
                  alt="商品">
                <span class="contentDescription">{{ item.itemName }}</span>
                <span class="contentPrice">¥{{ item.itemPrice }}</span>
              </div>
            </div>
          </div>
          <div
            v-show="!loading && isActive === 2"
            class="individualItem">
            <img
              :src="`${individualItem.itemImageUrl}`"
              alt="商品">
            <p class="individualName">
              {{ individualItem.itemName }}
            </p>
            <p class="individualPrice">
              ¥{{ individualItem.itemPrice }}
            </p>
            <a
              :href="`${individualItem.itemUrl}`"
              target="_blank">{{ individualItem.itemUrl }}</a>
            <div class="btnWrapper">
              <div class="backBtn">
                戻る
              </div>
              <div class="addBtn">
                商品を追加する
              </div>
            </div>
          </div>
          <div
            v-show="loading"
            class="loader-space">
            <vue-loaders-ball-spin-fade-loader
              color="#0f0f0f"
              class="loader" />
          </div>
        </div>
      </div>
      <!-- ここまでモーダル -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      isActive: 1,
      individualItem: ''
    }
  },
  computed: {
    searchWords: {
      get(){
        return this.$store.getters['item/searchWords']
      },
      set(value){
        this.$store.commit('item/setSearchWords', value)
      }
    },
    items(){
      return this.$store.getters['item/items']
    },
    loading(){
      return this.$store.getters['item/loading']
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    closeModal(){
      this.showModal = false
    },
    searchItem(){
      this.$store.dispatch('item/searchItem')
    },
    selectItem(item, isActive){
      this.individualItem = item
      this.isActive = isActive
    }
  },
}
</script>
<style scoped>
.searchBtn{
  width: 20%;
  display: inline-block;
  text-align: center;
  padding: 1.6rem 1rem;
  border: 3px solid #DEF2FF;
  border-radius: 7px;
  cursor: pointer;
}
.searchBtn:hover{
  background: #DEF2FF;
}
.searchBtn i{
  display: block;
  font-size: 1.7rem;
}
.searchBtn p{
  display: inline-block;
  margin-bottom: 0;
}
.overlay{
    z-index:1;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal1{
    position:relative;
    z-index: 2000;
    width: 50%;
    max-height: 80vh;
    padding: 1em;
    background-color: #fff;
    text-align: center;
    border-radius: 7px;
    overflow: scroll;
}
.modal1 p{
    border-bottom: 2.3px solid slategrey;
    padding: 1% 0 2% 0;
}
.modalBtn{
    margin:3rem 0;
}
.completeBtn{
    display: inline-block;
    border: 2px solid #DC3E38;
    border-radius: 6px;
    padding: 2% 7%;
    background-color: #DC3E38;
    color: #fff;
    margin:2rem 0 0 0;
    cursor: pointer;
}
.completeBtn:hover{
    opacity: 0.3;
}
.batsu{
    font-size:2em;
    cursor: pointer;
    position: absolute;
    top: 0.6rem;
    right: 1rem;
    border-radius: 50%;
    border: 1px solid #fff;
    padding: 0.5rem;
    background-color: #fff;
    width: 2.4rem;
    height: 2.4rem;
    box-shadow: 0 2px 7px grey;
}
.batsuBtn{
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.6rem;
    right: 0.65rem;
    font-size: 1.3rem;
}
.itemArea{
  resize: none;
  border: 1px solid #cde;
  border-radius: 6px;
  width: 90%;
  height: 2.5rem;
}

.resultItem{
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.contentItem{
  width: 18%;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 20px;
  cursor: pointer;
}
.contentItem:hover{
  opacity: 0.6;
}
.contentItem img{
  width: 100%;
}
.contentDescription{
  display: block;
  position: relative;
  height: 4.4rem;
  font-size: 0.8rem;
  margin:0%;
  clear: both;
  overflow: hidden;
}
.contentPrice{
  display: block;
  text-align: start;
  font-weight: bold;
  color: dimgray;
  font-size: 0.8rem;
}
.individualItem{
  display: inline-block;
  text-align: center;
  margin-top: 1.5rem;
}
.individualItem img{
  float: left;
}
.individualItem .individualName{
  padding: 0.6rem 0 0 14rem;
  border: none;
  text-align: left;
  margin-bottom: 0;
}
.individualItem .individualPrice{
  padding: 0 0 0 14rem;
  border: none;
  text-align: left;
  margin-bottom: 0;
}
.individualItem a{
  padding: 0 0 0 14rem;
  display: block;
  text-align: left;
  color: blue;
}
.individualItem .btnWrapper{
  clear: both;
  margin: 2rem 0;
}
.individualItem .backBtn{
  display: inline-block;
  clear: both;
  padding: 1rem 2rem;
  border: 1px solid darkgrey;
  border-radius: 5px;
  margin-right: 0.5rem;
  cursor: pointer;
}
.backBtn:hover{
  background: darkgrey;
}
.individualItem .addBtn{
  display: inline-block;
  padding: 1rem 2rem;
  border: 1px solid #DEF2FF;
  border-radius: 5px;
  margin-left: 0.5rem;
  cursor: pointer;
}
.addBtn:hover{
  background: #DEF2FF;
}
.loader-space{
  width: 100%;
  height: 20vh;
  position: relative;
}
.loader{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
}
@media(max-width: 1000px){
.searchBtn {
  width: 50%;
}
.modal1{
  width: 93vw;
  height: 84vh;
}
.photoImage{
  width: 300px;
}
.deleteImg{
  top: -1rem;
  right: -1rem;
}
.commentArea{
  width: 100%;
  height: 2.5rem;
  font-size: 16px;
  transform: scale(1.0);
}
}
</style>