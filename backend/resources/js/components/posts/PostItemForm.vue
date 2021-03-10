<template>
  <div class="form-group">
    <div class="contents">
      <div class="explain">
        <p class="title">
          アイテムタグを追加する
        </p>
      </div>
      <div class="items itemUpload">
        <div class="selectBtnWrapper">
          <div
            class="searchBtn"
            @click="openModal(1)">
            <i class="fas fa-search" />
            <p>検索して<br>追加する</p>
          </div>
        </div>
        <div class="cartItems">
          <div
            v-show="cartItems"
            class="addItem">
            <ul>
              <li
                v-for="cartItem in cartItems"
                :key="cartItem.itemCode">
                <img
                  :src="`${cartItem.itemImageUrl}`"
                  alt="商品">
                <div
                  class="deleteItemBtn"
                  @click="deleteCartItem(cartItem.itemCode)">
                  <i class="fas fa-times deleteBatsu" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 以下モーダル -->
      <div
        v-show="showModal"
        class="overlay">
        <div class="modal1">
          <div
            class="batsu"
            @click="closeModal">
            <i class="fas fa-times batsuBtn" />
          </div>
          <p v-show="!loading && isActive === 1 || !loading && isActive === 2">
            アイテムを探す
          </p>
          <p v-show="!loading && isActive === 3 ">
            アイテムを配置する
          </p>
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
              <div
                class="backBtn"
                @click="backModal">
                戻る
              </div>
              <div
                class="addBtn"
                @click="addItem">
                商品を追加する
              </div>
            </div>
          </div>
          <div
            v-show="!loading && isActive === 3"
            class="onItem">
            <p>配置したい場所をクリックしてください。</p>
            <img
              v-show="cropImg"
              id="cropImg"
              :src="`${cropImg}`"
              alt="商品"
              @click="deployItem">
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
  props: {
    cropImg: String
  },
  data() {
    return {
      showModal: false,
      isActive: 1,
      individualItem: '',
      cartItems: [],
      itemCode: ''
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
    openModal(isActive) {
      this.isActive = isActive
      this.showModal = true
    },
    closeModal(){
      this.showModal = false
      this.individualItem = ''
      this.itemCode = ''
    },
    searchItem(){
      this.$store.dispatch('item/searchItem')
    },
    selectItem(item, isActive){
      this.individualItem = item
      this.isActive = isActive
    },
    backModal(){
      this.isActive = 1
    },
    addItem(){
      if (!this.cartItems.includes(this.individualItem)){
        this.openCrop(this.individualItem)
      } else {
        this.isActive = 1
        this.individualItem = ''
        this.closeModal()
      }
    },
    deleteCartItem(itemCode){
      this.cartItems = this.cartItems.filter(v => v.itemCode != itemCode)
      this.$emit('catchCartItems', this.cartItems)
    },
    openCrop(individualItem){
      this.isActive = 3
      this.showModal = true
      this.itemCode = individualItem.itemCode
    },
    deployItem(){
      document.getElementById('cropImg').addEventListener('click', (event)=>{
        this.individualItem.relationX = event.offsetX / 300 * 100
        this.individualItem.relationY = event.offsetY / 300 * 100  
        this.cartItems.push(this.individualItem)
        
        this.$emit('catchCartItems', this.cartItems)
        this.closeModal()
      })
    }
  },
}
</script>
<style scoped>
.searchBtn{
  width: 8rem;
  height: 8rem;
  display: inline-block;
  text-align: center;
  padding: 1.6rem 1rem;
  border: 3px solid #DEF2FF;
  border-radius: 7px;
  cursor: pointer;
}
.selectBtnWrapper{
  height: 100%;
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
.items{
  display: flex;
}
.addItem ul{
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  float: right;
  padding: 0;
}
.addItem ul li{
  position: relative;
  display: inline-block;
  height: 8rem;
  width: 8rem;
  padding: 0 0.5rem;
}
li img{
  width: 100%;
}
li .deleteItemBtn{
  position: absolute;
  top: -1rem;
  right: 0rem;
  width: 30px;
  height: 30px;
  border: 1px solid #443311;
  padding: 0.5rem;
  background-color: #443311;
  box-shadow: 0 2px 7px grey;
  cursor: pointer;
} 
li .deleteItemBtn i{
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
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
.onItem img{
  width: 300px;
  height: 300px;
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
.itemUpload{
  display: block;
  text-align: center;
}
.addItem{
  display: flex;
}
.addItem ul{
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 2rem;
}
.addItem ul li{
  width: 7rem;
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
.contentItem{
  width: 30%;
}
.individualItem{
  width: 100%;
  height: 100%;
  text-align: center;
}
.individualItem img{
  float: none;
}
.individualItem .individualName{
  padding: 0;
  font-size: 0.8rem;
}
.individualItem .individualPrice{
  padding: 0;
}
.individualItem a{
  padding: 0;
  word-wrap:break-word;
}
}
</style>